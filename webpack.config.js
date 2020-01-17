const extracss = require('extract-text-webpack-plugin') //提取css  webpack4版本:要安装extract-text-webpack-plugin@next  3:extract-text-webpack-plugin
const minicss = require('mini-css-extract-plugin')   //提取css 有hash
const htmlwebpackplugin = require('html-webpack-plugin')   //提取html
const webpackSpriteSmith = require('webpack-spritesmith')//生成雪碧图
const webpackbuild = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path')
const webpack = require('webpack');

const HappyPack = require('happypack')
const os = require("os")   
const happyThreadPool = HappyPack.ThreadPool({size:os.cpus().length})    //线程池

module.exports = {
    mode:'development',
    entry:{
        app: ["./app.js","babel-polyfill"],
        app2: "./app2.js"
    },//['./app.js','./app2.js'],
    output:{
        filename:'./[name].js', 
        // publicPath:"0000"    
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'happypack/loader?id=happybabel',//"babel-loader",
                    // options:{    
                    //     //.babelrc里的配置
                    // }
                },
                exclude: /node_modules/
            },
            {
                test:/\.tsx?$/,
                loader:'ts-loader'
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
                            limit:5000   //小于5000(5kb)的图片大小都会变成base64(url-loader独有的特性)
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
            {
                test:/\.html$/,
                use:{
                    loader:'html-loader',
                }  
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader:minicss.loader 
                    },
                    {
                        loader:"css-loader",
                        options:{
                            // modules: true, 
                            // localIdentName:'[local]' 
                            modules:{
                                localIdentName:'[local]'    
                            },  //模块化写css
                            
                        }
                    },
                    {
                        loader:"postcss-loader",  
                        options:{
                            ident:'postcss',
                            plugins:[
                                require('autoprefixer')(),
                                require('postcss-cssnext')(),
                                require('postcss-sprites')()   
                                
                            ]
                        }
                    }
                ]
                /*use:extracss.extract({    //利用插件提取css
                    fallback:{
                        loader:'style-loader',   
                    },
                    use:[
                        {
                            loader:"css-loader",
                            options:{
                                // modules: true, 
                                // localIdentName:'[local]' 
                                modules:{
                                    localIdentName:'[local]'   
                                },  //模块化写css
                                
                            }
                        },
                        {
                            loader:"postcss-loader", 
                            options:{
                                ident:'postcss',   
                                plugins:[
                                    require('autoprefixer')(),
                                    require('postcss-cssnext')(),
                                   
                                ]
                            }
                        }
                    ]
                },
                
                ) */ 
            }
            
        ]
    },
    plugins:[   
        // new extracss({
        //     filename:'[name].min.css'  //只有name没有hash
        // })
        new webpackbuild(),
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader?cacheDirectory=true'],  
            threadPool: happyThreadPool    //共享进程池
        }),
        new webpack.DllReferencePlugin({
            context:path.join(__dirname,'..'),
            manifest:require('./dll/vendor-manifest.json')
        }),
        new minicss({
            filename:'[name].min.css'  //有name有hash
        }),
        
        new htmlwebpackplugin({
            template:"index.html",  
            filename:"index.html",   
            chunks:['app']   

        }),
        new htmlwebpackplugin({
            template:"index.html",  
            filename:"index2.html",  
            chunks:['app2']
        }),
        //雪碧图
        new webpackSpriteSmith({
            src:{
                //图片来源文件夹
                cwd:path.join(__dirname,'./images'),
                glob:"*.jpg"

            },
            target:{
                //打包到哪
                image:path.join(__dirname,'dist/sprites/sprite.png'),
                css:path.join(__dirname,'dist/sprites/sprite.css')
            },
            //调用
            apiOptions:{
                cssImageRef:"./sprites/sprite.png"
            }
        }) 
        
    ]
}

