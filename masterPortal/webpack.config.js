const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].fonts.css');
const extractSCSS = new ExtractTextPlugin('[name].styles.css');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const VIEWS_DIR = path.resolve(SRC_DIR, 'views');

console.log('BUILD_DIR', BUILD_DIR);
console.log('SRC_DIR', SRC_DIR);
console.log('NODE_MODULES', NODE_MODULES);
console.log('VIEWS_DIR', VIEWS_DIR);

var webpackConfig = {
    entry: {
      index: [SRC_DIR + '/index.js']
    },
    output: {
      path: BUILD_DIR,
      filename: '[name].bundle.js',
      publicPath: '/'
    },
    // watch: true,
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, './'),
      //   port: 9001,
      compress: true,
      hot: true,
      inline: true,
    progress: true,
    historyApiFallback: true,
    },
    resolve: {
      alias: {
        react: path.resolve(NODE_MODULES, 'react'),
      },
      symlinks: false,
      extensions: [".jsx", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: [
            path.resolve(NODE_MODULES),
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react"
              ],
              plugins: [
                "@babel/transform-runtime",
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-proposal-class-properties"
              ]
            }
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.(scss)$/,
          use: ['css-hot-loader'].concat(extractSCSS.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {alias: {'../img': '../public/img'}}
              },
              {
                loader: 'sass-loader'
              }
            ]
          }))
        },
        {
          test: /\.css$/,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: 'css-loader'
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
        }]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
      new webpack.NamedModulesPlugin(),
      extractCSS,
      extractSCSS,
      new HtmlWebpackPlugin(
        {
          inject: true,
          template: './public/index.html'
        }
      ),
      new CopyWebpackPlugin([
          {from: './public/img', to: 'img'},
          // {from: './public/kl.mp4', to: 'public'}
        ],
        {copyUnmodified: false}
      ),
      new webpack.DefinePlugin({
        'process.title': 'portal',
      })
      ,
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'NODENV_Development', // use 'development' unless process.env.NODE_ENV is defined
        })
    ]
};


module.exports = webpackConfig;
