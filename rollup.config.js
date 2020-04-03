import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/mercury.js',
  plugins: [
    resolve(['.ts', '.js']),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      include: ['src/**/*'],
      extensions: ['.ts', '.js'],
    }),
  ],
  treeshake: true,
  output: {
    file: process.env.MERCURY_TEST_BUILD ? 'dist/mercury_test.js' : pkg.main,
    format: 'cjs',
    sourcemap: true,
  },
  external: Object.keys(pkg.dependencies).concat('url'),
};
