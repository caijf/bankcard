import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

// 字符串中的链接符转为驼峰
function toCamel(str) {
  return str.replace(/-(.{1})/g, (m, p1) => {
    return /[a-z]/.test(p1) ? p1.toUpperCase() : p1;
  });
}

const globalVarName = toCamel(pkg.name);

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'umd',
      file: `dist/${globalVarName}.js`,
      name: globalVarName,
      sourcemap: true
      // sourcemap: "inline"
    },
    {
      format: 'umd',
      file: `dist/${globalVarName}.min.js`,
      name: globalVarName,
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [resolve(), commonjs(), typescript({ compilerOptions: { target: 'es3' } })]
};
