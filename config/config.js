'use strict';

const path = require('path'),
      __basename = path.dirname(__dirname);

/**
 * [config basic configuration]
 * @type {Object}
 */
var config = {
    env: process.env.NODE_ENV,
    path: {
        src: path.resolve(__basename, "app"),
        dist: path.resolve(__basename, "dist"),
        pub: path.resolve(__basename, "pub"),
        node: path.resolve(__basename, "node"),
    }
}

module.exports = config;
