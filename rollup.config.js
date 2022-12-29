import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import terser from '@rollup/plugin-terser'
import serve from 'rollup-plugin-serve'
import fg from 'fast-glob'

export default {
	input: 'src/main.js',
	output: {
		sourcemap: false,
		file: 'build/HostIIIF.js',
		format: 'iife'
	},
	preserveEntrySignatures: 'strict',
	plugins: [		{
			name: 'watch-external',
			async buildStart() {
				const files = await fg('./src/**/*')
				for (let file of files) {
					this.addWatchFile(file)
				}
			}
		},
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
			presets: ['@babel/preset-env', ["@babel/preset-react", { runtime: "automatic" }]],
			compact: false
		}),
		process.env.NODE_ENV === 'production' && terser(),
		process.env.NODE_ENV !== 'production' && serve({
			verbose: true,
			host: '192.168.1.74',
			contentBase: 'build',
			port: 3000,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Expose-Headers': '*'
			}
		})
	]
}
