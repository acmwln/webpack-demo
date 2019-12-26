import "../css/test.css";
import "../css/test2.css";
import $ from 'jquery';
import ma from "./module/modulea.js";
import mb from "./module/moduleb.js"

//异步加载
// import("./index2.js").then(function(res){
//     console.log(res)
// })

// require.ensure([],function(){
//     var index2 = require("./index2.js")
// })

 
$.ajax({
	url:"/ctrip/",
	type:'get',
	success:function(res){
		console.log(res);
	}
});

var i=0;
 console.log('入口文件',123);
 var i=0;
 setInterval(function(){
 	i++;
  document.getElementById('mydiv').innerHTML=i+"a";	
},2000)

if(module.hot){
    module.hot.accept()
}