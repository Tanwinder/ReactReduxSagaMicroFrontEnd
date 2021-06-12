var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].fonts.css');
const extractSCSS = new ExtractTextPlugin('[name].styles.css');

module.exports = {
    mode: "production",
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
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new UglifyJSPlugin({
            sourceMap: false,
            // uglifyOptions: {
            //     compress: {
            //         inline: 1,
            //     }
            //     //  mangle: false, // Note `mangle.properties` is `false` by default.
            // },
        }),
        new webpack.DefinePlugin({
            'process.title': 'roc_optimization',
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production', // use 'development' unless process.env.NODE_ENV is defined
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