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
        pub: path.resolve(__basename, "pub")
    }
}

module.exports = config;
