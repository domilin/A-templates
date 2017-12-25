const {resolve} = require('path')
const fs = require('fs')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const config = require('./config.js')

const ROOT_PATH = resolve(process.cwd())
const SRC_PATH = resolve(ROOT_PATH, 'src')
const JS_PATH = resolve(SRC_PATH, 'js')
const DIST_PATH = resolve(ROOT_PATH, 'dist')

// 获取多页面的每个入口文件，用于配置中的entry
function getEntry () {
    let dirs = fs.readdirSync(JS_PATH)
    let matchs = []
    let files = {}
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/)
        if (matchs) {
            files[matchs[1]] = resolve(SRC_PATH, 'js', item)
        }
    })
    return files
}

let entryFiles = {}
if (config.vendors.length !== 0) {
    entryFiles = Object.assign(getEntry(), {
        vendors: config.vendors
    })
} else {
    entryFiles = getEntry()
}
module.exports = {
    devtool: 'source-map',
    entry: entryFiles,
    output: {
        path: DIST_PATH,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        publicPath: '../'
    },
    module: {
        rules: [
            {
                test: /\.(js)?$/,
                include: ROOT_PATH,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|svgz)?$/,
                include: ROOT_PATH,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'img/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    externals: {
        zepto: '$',
        jquery: '$'
    },
    plugins: [
        new UglifyJSPlugin({
            compress: {
                warnings: false,
                drop_console: false
            },
            beautify: false,
            comments: false,
            extractComments: false,
            sourceMap: false
        }),
        new webpack.ProvidePlugin({
            $: 'zepto' || 'jquery',
            zepto: 'zepto',
            jQuery: 'jquery',
            'window.zepto': 'zepto',
            'window.jQuery': 'jquery'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'BABEL_ENV': JSON.stringify('production')
            }
        }),

        // 打包单独不需要提取公共部分JS时注释掉此插件，如：jquery.lk.js
        new webpack.optimize.CommonsChunkPlugin({
            filename: 'js/[name].js',
            names: ['vendors']
        })
    ]
}
