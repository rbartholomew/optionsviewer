const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: [
        './app/index.js'
    ],
    output: {
        filename: "index_bundle.js",
        path: __dirname + '/dist'
    },
    module: {
        loaders: [
            {test: /\.js$/, include: __dirname + '/app', loader: "babel-loader"}
        ]
    },
    devServer: {
        proxy: { 
            "*": "http://localhost:5000"
        }
    },
    plugins: [HtmlWebpackPluginConfig]
};