const os = require('os');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const threadPoolCount = os.cpus().length;
const happyThreadPool = HappyPack.ThreadPool({ size: threadPoolCount });

const destination = path.join(__dirname, '../dist/');
const VendorDllReference = new webpack.DllReferencePlugin({
    context: __dirname,  // PROJECT ROOT WHERE NODE_MODULES ARE RELATIVELY RESOLVED!
    manifest: path.resolve(destination, 'dll/vendor.manifest.json'),
});

const ExtractCSS = new ExtractTextPlugin({ filename: 'index.styles.css', allChunks: true, });

module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    entry: [
        path.join(__dirname, '../src/')
    ],
    devServer: {
        contentBase: path.join(__dirname, './'),
        port: 1100,
        host: "localhost",
        compress: true,
        hot: true,
        inline: true,
        progress: true,
        historyApiFallback: true,
    },
    output: {
        filename: 'index.bundle.js',
        path: path.join(__dirname, '../dist/'),
        publicPath: '/',
    },
    resolve: {
        extensions: [".js", ".jsx", ".css"]
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
    plugins: [
        new HtmlWebpackPlugin({
            'template': path.join(__dirname, '../public/index.html'),
            'inject': 'body',
            'filename': 'index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HappyPack({
            'id': 'js',
            'threadPool': happyThreadPool,
            'loaders': [
                {
                    'loader': 'babel-loader'
                }
            ]
        }),
        new webpack.DefinePlugin({
            'process.title': 'koo',
          }),
          new webpack.EnvironmentPlugin({
            NODE_ENV: 'production', // use 'development' unless process.env.NODE_ENV is defined
            }),
        VendorDllReference,
        ExtractCSS
        
    ]
}