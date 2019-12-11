const parseArgs = require('minimist');
const webpack = require('webpack');
const { join } = require('path');
const pkg = require('./package.json');

const cwd = process.cwd();

// 连接符转驼峰
function stringToCamelCase(str) {
  var re = /-(\w)/g;
  return str.replace(re, function ($0, $1) {
    return $1.toUpperCase();
  });
}

// 命令行参数
const cmdArgs = parseArgs(process.argv.slice(2));

// 标识生产环境
const isProd = cmdArgs.mode === 'production';

// umd全局变量名
const libraryGlobalName = stringToCamelCase(pkg.name);

// 输出文件名
// 开发模式输出带sourcemap的无压缩混淆版
// 生产模式输出压缩版
const outputFilename = isProd ? `${pkg.name}.min.js` : `${pkg.name}.js`;

const devtool = isProd ? undefined : 'cheap-module-source-map';

module.exports = {
  entry: './src/index.js',
  output: {
    library: libraryGlobalName,
    libraryTarget: 'umd',
    path: join(cwd, 'dist'),
    filename: outputFilename,
    umdNamedDefine: true
  },
  target: 'web',
  devtool,
  // plugins: [
  //   new webpack.DefinePlugin({
  //     BROWSER_ENV: JSON.stringify(true)
  //   })
  // ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: join(cwd, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: pkg.babel
        }
      }
    ]
  }
}