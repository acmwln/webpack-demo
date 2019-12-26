const extracss = require('extract-text-webpack-plugin') //提取css  webpack4版本:要安装extract-text-webpack-plugin@next  3:extract-text-webpack-plugin
const minicss = require('mini-css-extract-plugin')   //提取css 有hash
const htmlwebpackplugin = require('html-webpack-plugin')   //提取html
const webpackSpriteSmith = require('webpack-spritesmith')//生成雪碧图
const path = require('path')
module.exports = {
    mode:'development',
    entry:{
        app: ["./app.js","babel-polyfill"],
        app2: "./app2.js"
    },//['./app.js','./app2.js'],
    output:{
        filename:'./[name].js', 
        // publicPath:"0000"     //所有的路径都可以通过publicPath去解决,但是要和js,css路径相匹配
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:"babel-loader",
                    options:{
                        //.babelrc里的配置
                    }
                }
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
                        loader:minicss.loader //用minicss的loader代替extractcss fallback的style-loader
                    },
                    {
                        loader:"css-loader",
                        options:{
                            // modules: true, //webpack4之前是modules:true
                            // localIdentName:'[local]' 
                            modules:{
                                localIdentName:'[local]'    //webpack3之后是modules:{} 
                            },  //模块化写css
                            
                        }
                    },
                    {
                        loader:"postcss-loader",  //可以提供一系列的插件实现css的功能，eg 1.自动加前缀 2.postcss-cssnext(下一代css) 3.雪碧图
                        options:{
                            ident:'postcss',
                            plugins:[
                                require('autoprefixer')(),
                                require('postcss-cssnext')(),
                                require('postcss-sprites')()   //利用postcss插件生成雪碧图
                                // 小技巧:把postcss的前缀插件和babel编译的target一致可以放到package.json里一起生效 
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
                                // modules: true, //webpack4之前是modules:true
                                // localIdentName:'[local]' 
                                modules:{
                                    localIdentName:'[local]'    //webpack3之后是modules:{} 
                                },  //模块化写css
                                
                            }
                        },
                        {
                            loader:"postcss-loader",  //可以提供一系列的插件实现css的功能，eg 1.自动加前缀 2.postcss-cssnext(下一代css) 3.雪碧图
                            options:{
                                ident:'postcss',    //指名给postcss用的
                                plugins:[
                                    require('autoprefixer')(),
                                    require('postcss-cssnext')(),
                                    // 小技巧:把postcss的前缀和babel编译的target一致可以放到package.json里一起生效 
                                ]
                            }
                        }
                    ]
                },
                
                ) */ 
            }
            
        ]
    },
    plugins:[   //所有的插件都要new一下
        // new extracss({
        //     filename:'[name].min.css'  //只有name没有hash
        // })
        new minicss({
            filename:'[name].min.css'  //有name有hash
        }),
        //多页面就new多个htmlwebpackplugin模板,chunks对应打包进入相应的js
        new htmlwebpackplugin({
            template:"index.html",  //模板
            filename:"index.html",   //打包后的html文件
            chunks:['app']   //每个模板对应的js

        }),
        new htmlwebpackplugin({
            template:"index.html",  //模板
            filename:"index2.html",   //打包后的html文件
            chunks:['app2']
        }),
        //雪碧图
        new webpackSpriteSmith({
            src:{
                //图片来源文件夹
                cwd:path.join(__dirname,'./images'),
                glob:"*.jpg"//处理images下jpg类型的图片

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