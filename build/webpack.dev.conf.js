/* 注意！！！
 *
 * 早期的vue-cli下面有dev-server.js和dev-client.js兩文件，請求本地數據在dev-server.js里配置中，
 * 而因為webpack更新，所以在最新的vue-webpack-template 中已經去掉了dev-server.js和dev-client.js 改用webpack.dev.conf.js代替，
 * 所以 配置本地訪問在webpack.dev.conf.js里配置即可。
 * */

"use strict";
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const portfinder = require("portfinder");

// 導入express
const express = require("express");
// 創建express實例
const app = express();
// 1、讀取json數據
var goods = require("../data/01-商品頁(點菜).json");
var ratings = require("../data/02-商品頁(評價).json");
var seller = require("../data/03-商品頁(商家).json");

// 2、路由
//var routes = express.Router();

// 4、中間件
//app.use('/api',routes);

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: "warning",
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    },
    // 3、編寫接口
    before(app) {
      app.get("/api/goods", (req, res) => {
        // 返回數據給客戶端，返回json數據
        res.json(goods);
      }),
        app.get("/api/ratings", (req, res) => {
          // 返回數據給客戶端，返回json數據
          res.json(ratings);
        }),
        app.get("/api/seller", (req, res) => {
          // 返回數據給客戶端，返回json數據
          res.json(seller);
        });
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true
    })
  ]
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`
            ]
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined
        })
      );

      resolve(devWebpackConfig);
    }
  });
});
