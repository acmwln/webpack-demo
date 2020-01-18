const extracss = require('extract-text-webpack-plugin') //提取css  webpack4版本:要安装extract-text-webpack-plugin@next  3:extract-text-webpack-plugin
const minicss = require('mini-css-extract-plugin')   //提取css 有hash
const htmlwebpackplugin = require('html-webpack-plugin')   //提取html
const dev = require('./webpack.dev')
const prod = require('./webpack.prod')
const merge = require('webpack-merge')
const utils =require('./utils')

module.exports=env=>{

    function getcssoptions(env){
        if(env==='production'){
            return {
                test:/\.css$/,
                use:[
                    {
                        loader:minicss.loader,  
                    },
                    {
                        loader:'css-loader'
                    }
                ],
            }
        }else{
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
        entry:utils.entries(),//自定义一个方法实现多入口配置eg:{index1:'./src/index1.js',index2:'./src/index2.js'},
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
                                name:"[name].[hash:4].[ext]",   
                                outputPath:"assets/images", 
                                publicPath:"assets/images",     
                                limit:5000   //小于5000(5kb)的图片大小都会变成base64(url-loader独有)
                            }
                        },
                        {
                            loader:'img-loader' , //图片压缩   只是插件起作用
                            options:{
                                plugins:[
                                    require('imagemin-pngquant')({
                                        speed:2   //1-11
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