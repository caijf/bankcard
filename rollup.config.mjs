import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' };

const globalVarName = pkg.name;

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'es',
      file: `dist/${globalVarName}.esm.js`
    },
    {
      format: 'cjs',
      file: `dist/${globalVarName}.cjs.js`
    },
    {
      format: 'umd',
      file: `dist/${globalVarName}.js`,
      name: globalVarName,
      sourcemap: true
    },
    {
      format: 'umd',
      file: `dist/${globalVarName}.min.js`,
      name: globalVarName,
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json'
    })
  ]
};
