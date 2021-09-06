// webpack.config.js
// `webpack` command will pick up this config setup by default
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'none',
  entry: ['@babel/polyfill', './src/js/index.js', './src/sass/main.scss'],
  output: {
    filename: 'javascripts/bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  plugins: [
    new HtmlWebpackPlugin(), // 웹팩으로 빌드한 결과물로 HTML 파일을 생성해주는 플러그인
    new webpack.ProgressPlugin(), // 웹팩의 빌드 진행율을 표시해주는 플러그인
    new MiniCssExtractPlugin({filename: 'stylesheets/style.css'})
    ],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader, // "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ]
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
    devtool: 'source-map',
    // https://webpack.js.org/concepts/mode/#mode-development
    mode: 'development'
};
