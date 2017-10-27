const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    context: path.resolve(__dirname, './src'),
    entry: {
        bundle: ['./main.js'],
        vendor: [
            'es5-shim',
            'es5-shim/es5-sham',
            'es6-promise',
            'babel-polyfill',
            'fetch-detector',
            'fetch-ie8',
            'fetch-jsonp',
            'react',
            'react-dom',
            'react-router',
        ],
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename:"[name].js"
    },
    // The list of plugins for Webpack compiler
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),  // webpack为每个模块指定唯一的id，通过该插件，webpack会分析和为模块按优先级排序，为最经常使用的分配一个最小的ID
        new webpack.optimize.CommonsChunkPlugin({   // 提取公共代码到一个文件中，并压缩
            name: 'vendor',
            minChunks: Infinity,
        }),
        new webpack.optimize.DedupePlugin(),  //去重
        new webpack.optimize.AggressiveMergingPlugin(),  //来改善chunk传输
        new webpack.optimize.UglifyJsPlugin({   //压缩并弄成IE8可兼容
            compress: {screw_ie8: false },
            mangle: { screw_ie8: false },
            output: { screw_ie8: false },
        }),
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
            },
            hash: true,
        })
    ],
    // Options affecting the normal modules
    module: {
        loaders: [
            {
                test: /\.js(x)?$/,
                include: [   //指定要 Loader 目录，如果制定根目录会报错
                    path.resolve(__dirname, './src'),
                ],
                loader: 'babel-loader',
                query: {
                    plugins: [
                        'transform-react-remove-prop-types',
                        'transform-react-constant-elements',
                        'transform-react-inline-elements',
                        'transform-es3-modules-literals',
                        'transform-es3-member-expression-literals',
                        'transform-es3-property-literals'
                    ],
                },
            }
        ],
    },

};

module.exports = config;
