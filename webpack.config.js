'use strict';
var config = require('./config/config');

let configMapping = {
    '__DEV__': './webpack.dev.js',
    '__PROD__': './webpack.prod.js'
};

var webpackConfigPath = configMapping[config.env],
    webpackConfig = require(webpackConfigPath);

module.exports = webpackConfig;
