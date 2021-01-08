const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();
const config = require('./webpack.config.js')();
const compiler = webpack(config);
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);


app.listen(3005, function () {
  console.log('Example app listening on port 3005!\n');
});
