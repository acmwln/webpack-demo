import "./css/test.css"
import test from "./css/test.css"
// import "babel-polyfill";
import "./test.ts"
import img1 from "./images/header_bg.jpg"
var img = new Image();
console.log('img------',img)
img.src = img1;
document.getElementById("mydiv").appendChild(img)
document.getElementById("mydiv").setAttribute("class",test.div1)
console.log(1)

const a = 123;
async function b(){

}       
//编译方法或者对象用babel-polyfill(全局)和babel-transform-runtime(局部)
//babel-polyfill -生成全局垫片(垫片:对象实现了所有方法),在全局垫片里去实现es5不兼容的方法或者对象等,写项目推荐
//babel-transform-runtime-es6   -生产局部垫片,不会污染全局