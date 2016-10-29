var webpack = require('webpack');
var path = require('path');

var config = require('./config/config'),
    nodeModulesPath = path.join(__dirname, 'node_modules'),
    parentNodeModulePath = path.join(path.dirname(__dirname), 'node_modules');

var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    devtool: 'cheap-source-map',
    entry: [
        path.resolve(__dirname, 'app/main.jsx'),
    ],
    output: {
        publicPath: config.cdn,
        path: path.join(config.path.pub),
        filename: './bundle.js'
    },
    module: {
        loaders:[
            { 
                test: /\.(js|jsx)$/,
                loader: 'babel',
                query: {
                    cacheDirectory: '/webpack_cache/',
                    plugins: ['transform-decorators-legacy'],
                    presets: [
                        'es2015-loose', 
                        'react',
                    ]
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                // extract style and make it stand-alone css file
                // for dev environment, inline style can be hot reload
                loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
                include: path.resolve(config.path.src)
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader"),
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
                    // 压缩png图片
                    'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
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
        new WebpackMd5Hash(),
        new webpack.optimize.DedupePlugin(),
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([
            { from: './app/index.html', to: 'index.html' },
            { from: './app/main.css', to: 'main.css' }
        ]),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // make css file standalone
        new ExtractTextPlugin("./css/[name]" + config.chunkhash + ".css"),
        new webpack.NoErrorsPlugin(),
        new CleanWebpackPlugin(['pub'])
    ],
    // disable watch mode
    watch: false, //  watch mode
    devtool: "#inline-source-map"
};
