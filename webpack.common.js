const extracss = require('extract-text-webpack-plugin') //提取css  webpack4版本:要安装extract-text-webpack-plugin@next  3:extract-text-webpack-plugin
const minicss = require('mini-css-extract-plugin')   //提取css 有hash
const htmlwebpackplugin = require('html-webpack-plugin')   //提取html
const dev = require('./webpack.dev')
const prod = require('./webpack.prod')
const merge = require('webpack-merge')
//express + webpack-dev-middleware+webpack-hot-middleware  express+中间件模拟webpack-dev-server热更新服务  
//暴漏出一个方法接受一个环境变量
module.exports=env=>{
    //配置对象
    //webpack-merge合并规则:如果没有则加上，如果有则顶掉
    function getcssoptions(env){
        if(env==='production'){
            //生产模式loader的配置
            return {
                test:/\.css$/,
                use:[
                    {
                        loader:minicss.loader,   //生产模式需要提取为一个单独的css文件
                    },
                    {
                        loader:'css-loader'
                    }
                ],
            }
        }else{
            //开发模式如果你把css提取为一个单独的文件，那么会使得css无法live-reload和热更新
            return {
                test:/\.css$/,
                use:[
                    {
                        loader:'style-loader',
                    },
                    {
                        loader:'css-loader',
                    }
                ]
            }
        }
    }
    var common = {
        entry:{
            index:'./src/index.js'
        },
        output:{
            filename:'[name].bundle.js'
        },
        module:{
            rules:[
                //js处理
                {
                    test:/\.js$/,
                    use:{
                        loader:'babel-loader'
                    }
                },
                //处理图片
                {
                    test:/\.(png|jpg|jpeg|gif)$/,
                    use:[
                        //为了节省网络请求一般把图片压缩64编码
                        {
                            loader:'url-loader',//file-loader   //并不局限图片，mp3,mp4等各种文件的处理都可以用file-loader处理
                            options:{
                                name:"[name].[hash:4].[ext]",   //[hash:4]:hash 截取4位   [ext]:后缀
                                outputPath:"assets/images", //打包后的路径
                                publicPath:"assets/images",     //统一把路径做个更换,不用担心路径弄错的问题
                                limit:5000   //小于5000(5kb)的图片大小都会变成base64(url-loader独有)
                            }
                        },
                        {
                            loader:'img-loader' , //图片压缩   只是插件起作用
                            options:{
                                plugins:[
                                    require('imagemin-pngquant')({
                                        speed:2   //1-11,压缩体积,数字越大压缩越低,质量越好
                                    }),
                                    // require('imagemin-mozjpeg')({
                                    //     quality:10   //1-100
                                    // }),
                                    // require('imagemin-gifsicle')({
                                    //     optimizationLevel:3  //1-3
                                    // }),
                                ]
                            }
                        }
                    ]
                },
                //css处理
                getcssoptions(env)
            ]
        },
        plugins:[
            //提取额外css
            new minicss({
                filename:'[name].min.css'
            }),
            new htmlwebpackplugin({
                filename:'index.html',
                template:'index.html',
                minify:{
                    collapseWhitespace:true    //压缩空格
                },
                inject:true     

            })
        ]   
    }
    
    return merge(env==='production'?prod:dev,common);
}