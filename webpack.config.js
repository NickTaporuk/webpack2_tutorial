const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
    entry : "./src/app.js",
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : "app.bundle.js"
    },
    module : {
        rules : [
            {
                test : /\.scss$/,
                // use : ExtractTextPlugin.extract([
                //     'style-loader',
                //     'css-loader',
                //     'sass-loader'
                // ])
                use : ExtractTextPlugin.extract({
                    fallback : 'style-loader',
                    use: ['css-loader','sass-loader'],
                    publicPath:'/dist'
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title : 'Project',
            template : './src/index.html',
            // minify : {
            //     collapseWhitespace : true
            // },
            hash: true
        }),
        new ExtractTextPlugin({
            filename:'app.css',
            allChunks: true
        })
    ]
};