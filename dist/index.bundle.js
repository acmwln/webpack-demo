(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_test_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _css_test_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_test_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_test2_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _css_test2_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_test2_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _module_modulea_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _module_modulea_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_module_modulea_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _module_moduleb_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _module_moduleb_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_module_moduleb_js__WEBPACK_IMPORTED_MODULE_4__);




 //异步加载
// import("./index2.js").then(function(res){
//     console.log(res)
// })
// require.ensure([],function(){
//     var index2 = require("./index2.js")
// })

jquery__WEBPACK_IMPORTED_MODULE_2___default.a.ajax({
  url: "/ctrip/",
  type: 'get',
  success: function success(res) {
    console.log(res);
  }
});
var i = 0;
console.log('入口文件', 123);
var i = 0;
setInterval(function () {
  i++;
  document.getElementById('mydiv').innerHTML = i + "a";
}, 2000);

if (false) {}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {



/***/ }),
/* 5 */
/***/ (function(module, exports) {



/***/ })
],[[1,1,2]]]);