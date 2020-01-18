const path = require('path');
//glob是webpack安装时依赖的一个第三方模块,该模块允许你使用*等符号,例如lib/*.js就是获取lib文件夹下的所有js文件
const glob = require('glob');



//取得相应的页面路径,因为之前的配置,所以是src文件夹下的pages文件夹
const PAGE_PATH=[
    path.resolve(__dirname,"./src"),
  ];
  
  //多入口配置
  //通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在，那么就作为入口处理
exports.entries = ()=>{
    let entryFiles = PAGE_PATH.reduce((pre,path)=>[...pre,...glob.sync(path+'/*.js')],[]);
    let map={};
    entryFiles.forEach((filePath) => {
      let filename = generateFileName(filePath);
      map[filename] = filePath
    });
    return map;
  }
  //提取出文件名
  function generateFileName(filePath){
    let filename = filePath.substring(filePath.lastIndexOf('\/')+1,filePath.lastIndexOf('.'))
    return filename
  }