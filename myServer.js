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
const complier = webpack(config)  
app.use(webpackDevMid(complier)) 
app.use(webpackHot(complier,{
    "overlaystyles":true
}))
// Object.keys(config.entry).forEach((name)=>{
//     config.entry[name] = config.entry[name].concat["webpack-hot-middleware/client?noInfo=true&reload=true"]
// })
app.listen(2019)  
webpack(config)  



