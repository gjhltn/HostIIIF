import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import nodePolyfills from "rollup-plugin-polyfill-node";
import terser from "@rollup/plugin-terser";
import serve from "rollup-plugin-serve";

export default {
  input: "src/main.js",
  output: {
    sourcemap: false,
    file: "build/HostIIIF.js",
    format: "iife",
  },
  preserveEntrySignatures: "strict",
  onwarn: function onwarn(warning, warn) {
    if (warning.id.indexOf(__dirname + "/node_modules/") === 0) return;
    warn(warning);
  },
  plugins: [
    commonjs({
      include: ["./node_modules/**"],
      requireReturnsDefault: "auto",
    }),
    nodePolyfills(),
    nodeResolve({
      extensions: [".js"],
      browser: true,
      preferBuiltins: true,
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    babel({
      babelHelpers: "bundled",
      presets: [
        "@babel/preset-env",
        ["@babel/preset-react", { runtime: "automatic" }],
      ],
      compact: false,
    }),
    terser(),
    process.env.NODE_ENV !== "production" &&
      serve({
        verbose: true,
        host: "192.168.1.74",
        contentBase: "build",
        port: 3000,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Expose-Headers": "*",
        },
      }),
  ],
};
