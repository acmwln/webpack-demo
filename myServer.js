const express = require('express')  
const webpackDevMid = require('webpack-dev-middleware')   
const webpackHot = require('webpack-hot-middleware')  
const webpack = require('webpack')
const devConfig = require('./webpack.dev.js')
const commonConfig = require('./webpack.common.js')
const merge = require('webpack-merge')
const app = express();
const devcommon = commonConfig('development');
const config = merge(devcommon,devConfig)
const complier = webpack(config)  //最终的编译结果
app.use(webpackDevMid(complier))  //开启中间件服务,把编译结果给他
// app.use(webpackHot(complier){
//     "overlaystyles":true
// })
// Object.keys(config.entry).forEach((name)=>{
//     config.entry[name] = config.entry[name].concat["webpack-hot-middleware/client?noInfo=true&reload=true"]
// })
app.listen(2019)  //开启服务
// webpack(config)//webpack就是个方法,给个配置可以产出对应的结果