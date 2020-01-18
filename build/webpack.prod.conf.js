'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[name].[chunkhash].js')
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new BundleAnalyzerPlugin({
        analyzerPort: 8889,
    }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     // compress: {
    //     //   warnings: false
    //     // }
    //     warnings: false
    //   },
    //   sourceMap: config.build.productionSourceMap,
    //   parallel: true
    // }),
    // extract css into its own file
    // new ExtractTextPlugin({
    //   filename: utils.assetsPath('css/[name].[md5:contenthash].css'),
    //   // Setting the following option to `false` will not extract CSS from codesplit chunks.
    //   // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
    //   // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
    //   // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
    //   allChunks: true,
    // }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: utils.assetsPath('css/[name]--[contenthash].css'),
      chunkFilename: utils.assetsPath('css/[id].[name]--[contenthash].css'),
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks (module) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, '../node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
    // // extract webpack runtime and module manifest to its own file in order to
    // // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChunks: Infinity
    // }),
    // // This instance extracts shared chunks from code splitted chunks and bundles them
    // // in a separate chunk, similar to the vendor chunk
    // // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'app',
    //   async: 'vendor-async',
    //   children: true,
    //   minChunks: 3
    // }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ],
  // 公共模块依赖独立打包：例如vue.js
  optimization: {
    splitChunks: {
      cacheGroups: {
        vue: {
          // test: /[\\/]node_modules[\\/](vue|vue-router|axios|qs|vant)[\\/]/,
          test: /[\\/]node_modules[\\/](vue|vue-router)[\\/]/,
          name: 'vue',
          chunks: 'initial',
          priority: 10,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
          priority: 8,
        },
        common: { // 打包其余的的公共代码
          minChunks: 2, // 引入两次及以上被打包
          name: 'common', // 分离包的名字
          chunks: 'all',
          priority: 5
        },
      }
    },
    // splitChunks: {
    //   chunks: 'all', // initial、async和all
    //   minSize: 30000, // 形成一个新代码块最小的体积
    //   maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
    //   maxInitialRequests: 3, // 最大初始化请求数
    //   automaticNameDelimiter: '~', // 打包分割符
    //   name: true,
      // cacheGroups: {
      //   vendors: { // 打包两个页面的公共代码
      //     minChunks: 2, // 引入两次及以上被打包
      //     name: 'vendors', // 分离包的名字
      //     chunks: 'all'
      //   },
      // }
      runtimeChunk: {
          name: 'manifest'
      },
    // },
    minimizer: [new UglifyJsPlugin({
        uglifyOptions: {
          // compress: {
          //   warnings: false
          // }
          warnings: false
        },
        sourceMap: config.build.productionSourceMap,
        parallel: true
      })],
  }
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
