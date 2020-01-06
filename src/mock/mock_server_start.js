// https://babeljs.io/docs/en/babel-register
// import是es6的语法，nodeJs无法使用,使用babel-register进行转换
require('@babel/register')({
  plugins: ["@babel/plugin-syntax-dynamic-import"],
  presets: ["@babel/preset-env"],
  ignore: [],
  extensions: [".es6", ".es", ".jsx", ".js", ".mjs"],
  cache: true,
});

module.exports = require("./mock_server.js");
