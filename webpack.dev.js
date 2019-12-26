//开发模式的配置
const webpack = require('webpack')

module.exports={
    mode:"development",   //webpack4 进行压缩和tree-shaking   webpack3:必须每个都需要new一下 Ugli
    devtool:'cheap-module-source-map',
    devServer:{
        port:9001,
        // inline:false, //服务的开启模式
        hot:true,
        hotOnly:false,
        historyApiFallback:{    //路径的重写
            rewrites:[
                {
                    from:/^\/([ -~]+)/,    //接收路径
                    to:function(context){   //转发到哪
                        console.log('context',context)
                        // return "./404.html"
                        return "./"+ context.match[1]+".html"
                    }
                }
            ]
        },
        //转发到哪，根目录为一个target
        proxy:{
            "/webapp":{
                target:"https://m.ctrip.com",
                changeOrigin:true,
                pathRewrite:{
                    "/ctrip/":"/vacations/idiytour/newindex",
                }
                
            }
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),//是跟热更新相关
        new webpack.NamedModulesPlugin(),//跟打包名字相关
    ]
}