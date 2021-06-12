var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].fonts.css');
const extractSCSS = new ExtractTextPlugin('[name].styles.css');

module.exports = {
    mode: "development",
    entry: [
        path.join(__dirname, '../src')
    ],
    output: {
        path: path.join(__dirname, '../dist/'),
        filename: 'index.bundle.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            'template': path.join(__dirname, '../public/index.html'),
            'inject': 'body',
            'filename': 'index.html',
            'hash': true
        }),
        new ExtractTextPlugin('index.styles.css'),
        
        new webpack.HotModuleReplacementPlugin(),
         new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        extractCSS,
        extractSCSS,
    ],
    resolve: {
        extensions: [".js", ".jsx", ".css", ".ts", ".tsx"],
        alias: {
            'helpers': path.resolve(__dirname, "../src/helpers")
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                'test': /\.css$/,
                'use': ExtractTextPlugin.extract({
                    'fallback': "style-loader",
                    'use': {
                        'loader': 'css-loader'
                    }
                })
            },
            {
                'test': /\.scss$/,
                'use': ExtractTextPlugin.extract({
                    'fallback': 'style-loader',
                    'use': [{
                        'loader': 'css-loader',
                    }, {
                        'loader': 'sass-loader',
                        'options': {
                            'sourceMap': true
                        }
                    }],
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [
                    {
                        // loader: 'url-loader'
                        loader: 'file-loader',
                        options: {
                            name: './img/[name].[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[hash].[ext]'
                }
            }
        ],
    },
};