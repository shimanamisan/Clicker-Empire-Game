const path = require('path');
const dist = path.resolve(__dirname, 'dist');
const src = path.resolve(__dirname, 'src');

// 別ファイルに出力したCSSファイルを圧縮するために必要
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 出力先をクリーンアップしてからファイルを出力するプラグイン
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// HTMLテンプレートからバンドルファイルを読み込んだHTMLファイルを出力するプラグイン
const HtmlWebpackPlugin = require('html-webpack-plugin');

// ビルド時にコメントとconsole.logを削除する
const TerserPlugin = require('terser-webpack-plugin');

// ESLintを使用するためのプラグイン
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  // エントリーポイントの設定：モジュールをバンドルするための対象物を設定している
  // babel-loader8 でasync/awaitを動作させるためには、@babel/polyfillが必要
  entry: ['@babel/polyfill', './src/js/index.js'],
  output: {
    // 絶対パスを指定
    path: `${dist}`,
    // 出力するファイル名を設定
    filename: './js/bundle.js',
  },
  module: {
    rules: [
      // *********************************
      // * JSファイルに対する設定（主にBabel）
      // *********************************
      {
        // ローダーの処理対象を指定
        test: /\.js$/,
        // ローダーの処理対象から除外するディレクトリを指定
        exclude: /node_modules/,
        loader: 'babel-loader',
        // ローダーに対する設定は babel.config.js というファイルに切り出して設定する
      },
      // ***********************
      // * 画像ファイルに関する設定
      // ***********************
      {
        // webpack 5からurl-loader/file-loader/raw-loaderが要らなくなった
        // 拡張子の大文字も許容するように最後尾に i を加える
        // jpegとjpgの様にeがあるかないかを許容するのに、jpe?gという形式にする
        test: /\.(jpe?g|png|svg|gif|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  // 各種プラグインを読み込む
  plugins: [
    // 指定した出力ディレクトリ内のファイルをクリーンアップ（削除）する
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!**.json'],
    }),
    // HTMLのテンプレートファイルからバンドルされたモジュールを読み込んだHTMLファイルを出力する
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
    }),
    // ESLintを使用するためのプラグイン
    new ESLintPlugin({
      fix: true, // 一部のエラーを自動で修正する
    }),
  ],
  // 最適化（webpack4から導入された）
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true, // console.log を出力するかどうか
          },
        },
      }),
      // CSSの冗長な記述を最適化して出力する
      new OptimizeCssAssetsPlugin({}),
    ],
  },
};
