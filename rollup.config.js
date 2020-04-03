/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/mercury.js',
  plugins: [
    commonjs(),
    babel({
      exclude: 'node_modules/**',
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
