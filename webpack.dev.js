'use strict';

const webpack = require('webpack'),
      path = require('path'),
      OpenBrowserPlugin = require('open-browser-webpack-plugin');

var config = require('./config/config'),
    nodeModulesPath = path.join(__dirname, 'node_modules'),
    parentNodeModulePath = path.join(path.dirname(__dirname), 'node_modules');

module.exports = {
    devServer: {
        historyApiFallback: true,
        hot: true,  //自动刷新
        inline: true,
        progress: true,
        contentBase: './app',   //静态资源的目录 相对路径,相对于当前路径 默认为当前config所在的目录
        port: 8080,
        proxy: {
            '/api/*': {
                target: 'http://localhost:3001',
                secure: false
            }
        }
    },
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'app/page/main.js')
    ],
    output: {
        path: path.join(config.path.dist),
        publicPath: '/',        // 用于调试或者CDN之类的域名，publicPath: "assets", 通过localhost:8080/assets/bundle.js来访问
        filename: './bundle.js'
    },
    module: {
        loaders:[
            { 
                test: /\.(js|jsx)$/,
                loader: 'babel',
                query: {
                    cacheDirectory: false,//'/webpack_cache/',
                    // plugins: ['transform-decorators-legacy'],
                    presets: [
                        'es2015-loose', 
                        'react',
                    ]
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                include: path.resolve(config.path.src)
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader",
                include: [parentNodeModulePath, nodeModulesPath, path.resolve(config.path.src)]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    "url-loader?limit=1000&name=img/[name]" + config.hash + ".[ext]",
                ],
                include: path.resolve(config.path.src)
            },
            { 
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,  
                loader: 'url-loader?importLoaders=1&limit=10000&name=fonts/[name]' + config.hash + '.[ext]' 
            }
        ],
        noParse: [
            
        ]
    },
    resolve: {
        // moduledirectories:['node_modules', config.path.src],
        extensions: ["", ".js", ".jsx", ".es6", "css", "scss", "png", "jpg", "jpeg", "ico"],
        // reduce searching time
        alias: {
            'redux': 'redux/dist/redux.min',
            'react-redux': 'react-redux/dist/react-redux',
            'react-router': 'react-router/umd/ReactRouter',
            'react-router-redux': 'react-router-redux/dist/ReactRouterRedux'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
         //允许错误不打断程序
        new webpack.NoErrorsPlugin()
    ],
    watch: true, //  watch mode
    // devtool: "#inline-source-map",
};
