var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var nodeModulesPath = path.join(__dirname, 'node_modules');

module.exports = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: './app',
        port: 8080
    },
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'app/main.jsx')
    ],
    output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: './bundle.js'
    },
    module: {
        loaders:[
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'app'),
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.js[x]?$/,
                include: path.resolve(__dirname, 'app'),
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
        // alias: {
        //     'react': path.join(nodeModulesPath, 'react/react.js')
        // }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ]
};
