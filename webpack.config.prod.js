const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

// JSのコメントをビルド時に削除する
const TerserPlugin = require('terser-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(commonConfig, {
  mode: 'production',
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
              sourceMap: false,
            },
          },
          {
            // Sassをバンドルするための機能
            loader: 'sass-loader',
            options: {
              // ソースマップの利用有無
              sourceMap: false,
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
