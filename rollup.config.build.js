import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import terser from '@rollup/plugin-terser';

export default {
	input: 'src/main.js',
	output: {
		sourcemap: false,
		file: 'build/HostIIIF.js',
		format: 'iife'
	},
	plugins: [
		commonjs({
			include: ['./node_modules/**'],
			requireReturnsDefault: 'auto'
		}),
		nodePolyfills(),
		nodeResolve({
			extensions: ['.js'],
			browser: true,
			preferBuiltins: true
		}),
		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		babel({
			babelHelpers: 'bundled',
			presets: ['@babel/preset-env', '@babel/preset-react'],
			compact: false
		}),
		terser()
	]
}
