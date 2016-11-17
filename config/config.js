'use strict';

const path = require('path'),
      __basename = path.dirname(__dirname),
      isProduction = process.env.NODE_ENV === '__PROD__';

/**
 * [config basic configuration]
 * @type {Object}
 */
var config = {
    env: process.env.NODE_ENV,
    path: {
        src: path.resolve(__basename, "app"),
        dist: path.resolve(__basename, "dist"),
        pub: path.resolve(__basename, "pub")
    },
    chunkhash: (isProduction) ? "-[chunkhash:6]" : "",
    hash: (isProduction) ? "-[hash:6]" : "",
    defaultPath: "//localhost:9001/",
    cdn: "//localhost:8000/",
    serverPort: 9001,        // port for local server
    hostDirectory: "/news/"  // http://host/hostDirectory/
}

if (!isProduction) {
    const utils = require('./utils');
    config.html = utils.getHtmlFile(config.path.src);
}

module.exports = config;
