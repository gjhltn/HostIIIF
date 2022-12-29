import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import fg from 'fast-glob'

// https://github.com/rollup/rollup/issues/408
// https://github.com/d3/d3-interpolate/issues/58
const D3_WARNING = /Circular dependency.*d3-selection}/

export default {
	input: 'src/main.js',
	output: {
		file: 'build/HostIIIF.js',
		format: 'iife',
		sourcemap: true
	},
	onwarn: (warning, next) => {
		if (D3_WARNING.test(warning)) {
			return
		}
		if (warning.code === 'CIRCULAR_DEPENDENCY') {
			return
		}
		next(warning)
	},
	plugins: [
		{
			name: 'watch-external',
			async buildStart() {
				const files = await fg('../../packages/**/src**/*')
				for (let file of files) {
					this.addWatchFile(file)
				}
			}
		},

		commonjs({
			include: ['../../../node_modules/**'],
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
		})
	]
}
