const path = require('path')
const webpack = require('webpack')

//针对第三方库进行打包处理
module.exports = {
    mode:'development',
    entry:{
        vendor:['jquery','react','lodash']
    },
    output:{
        path:path.join(__dirname,'dll'),   //当前路径下的dll文件下
        filename:'[name].dll.js',
        library: '[name]_library'  
    },
    plugins:[
        new webpack.DllPlugin({    //生成一个json，打包的时候通知这个地方处理了不需要在处理了
            path:path.join(__dirname,'dll/[name]-manifest.json'),
            name:'[name]_library',
            context:path.join(__dirname,'..')

        })
    ],
    performance:{
        hints:false
    }
}