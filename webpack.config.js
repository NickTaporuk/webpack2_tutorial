const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production'; // true or false
const cssDev = ExtractTextPlugin.extract([
    'style-loader',
    'css-loader',
    'sass-loader'
]);

const cssProd = ExtractTextPlugin.extract({
        fallback : 'style-loader',
        use: ['css-loader','sass-loader'],
        publicPath:'./dist'
    });

const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    entry : {
        app: "./src/app.js",
        contacts: './src/contacts.js'
    },
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : "[name].bundle.js"
    },
    module : {
        rules : [
            {
                test : /\.scss$/,
                use : cssConfig
            },
            {
                test: /\.js$/,
                exclude:/node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.pug$/,
                loaders: ['html-loader', 'pug-html-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title : 'Project',
            template : './src/index.pug',
            // minify : {
            //     collapseWhitespace : true
            // },
            excludeChunks:[
                'contacts'
            ],
            hash: true
        }),
        new HtmlWebpackPlugin({
            title : 'Contact Page',
            filename: 'contacts.html',
            template : './src/contacts.html',
            chunks : ['contacts'],
            hash: true
        }),
        new ExtractTextPlugin({
            filename:'app.css',
            disable : !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    devServer: {
        contentBase: path.join("dist"),
        compress: true,
        port:9999,
        overlay: {
            warnings: true,
            errors: true
        },
        stats: "errors-only",
        open: true,
        hot: true

    }
};