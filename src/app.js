const express = require("express");
const path = require("path");
const server = express();

//webpack 미들웨어 사용
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const compiler = webpack(webpackConfig);

server.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
}))

//포트번호 3000
server.set("port", 3000);

//bundle된 index.html '/' 주소로 요청
server.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/view`, "index.html"));
});

server.listen(server.get("port"), () => {
  // console.log("http://localhost:" + server.get("port"));
  
});