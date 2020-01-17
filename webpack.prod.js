//生产模式的配置
var webpack = require('webpack');
module.exports = {
    optimization:{
        minimize:false,  //压缩
        splitChunks:{   //代码分割
            chunks:"initial",   
            minSize:0,//默认30kb
            //如果没有cacheGroups则按照默认规则打包:vendor(第三方包) app(业务代码) manifest(运行时代码) 公共模块
            cacheGroups:{    
                vendor:{
                    test:/[\\/]node_modules[\\/]/,   //打包node_modules下面的第三方包
                    name:'vendor',
                    priority:10  
                }
            },
            minChunks:2, 
            automaticNameDelimiter:"." 
        },
        runtimeChunk:{
            name:'runtime'   
        },

    }
}

