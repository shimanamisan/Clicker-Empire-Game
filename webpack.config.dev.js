const { merge } = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.config.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dist = path.resolve(__dirname, 'dist');

module.exports = merge(commonConfig, {
  mode: 'development',
  watch: true,
  // ソースマップの品質を指定する
  // devtool: 'cheap-module-eval-source-map',
  devtool: false,
  devServer: {
    open: true,
    port: 9000,
    static: {
      directory: dist,
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // app.jsとapp.cssファイルに分割するためのプラグイン
          MiniCssExtractPlugin.loader,
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップを有効にする
              sourceMap: true,
            },
          },
          {
            // Sassをバンドルするための機能
            loader: 'sass-loader',
            options: {
              // ソースマップの利用有無
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // jsファイルとcssファイルを分割するためのプラグイン
    new MiniCssExtractPlugin({
      // ファイルの出力先（相対パスを指定しないとエラーになる）
      // エントリーポイントのjsディレクトリが基準となるので出力先には注意
      // "./src/index.js"を起点に出力先を指定する
      filename: `./css/style.css`,
    }),
  ],
});
