//生产模式的配置
var webpack = require('webpack');
module.exports = {
    optimization:{
        minimize:false,  //压缩
        splitChunks:{   //代码分割
            chunks:"initial",   //指定打包范围
            // minSize:0,//默认30kb
            //如果没有cacheGroups则按照默认规则打包:vendor(第三方包) app(业务代码) manifest(运行时代码) 公共模块
            // cacheGroups:{     //用到这个的场景:有特殊的需求,比如vendor里拿出lodash,jquery,react
            //     vendor:{
            //         test:/[\\/]node_modules[\\/]/,   //打包node_modules下面的第三方包
            //         name:'vendor',
            //         priority:-10  //优先级高先打包
            //     }
            // },
            // minChunks:2, //公共的包需要出现2次(被引用2次)才可以打包
            automaticNameDelimiter:"."  //分隔符
        },
        runtimeChunk:{
            name:'runtime'     //webpack第三方运行文件打包出来
        },

    }
}