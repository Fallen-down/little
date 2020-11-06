// 1. 安装插件 cordova plugin add cordova-plugin-vibration
// 2. 使用振动的 api
//    有一个全局的方法 navigator.vibrate 可以完成振动
//    注意点: 振动api, 需要在 deviceready 之后, 调用

//    navigator.vibrate 两种调用方式
//    1. navigator.vibrate( 3000 );   振动一次, 振动3秒, 最长只能 5s
//    2. navigator.vibrate( [ 3000, 1000, 3000, 1000 ] ); // 表示振动3秒, 停顿1秒, 再振动3秒, 再停1秒

//    让振动停止, 给方法, 传 0即可
//    navigator.vibrate( 0 );
//    navigator.vibrate( [] );

var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var stop = document.getElementById("stop");


document.addEventListener("deviceready", function() {

  // 设备 api 准备就绪, 可以调用 设备相关 api 了
  btn1.addEventListener("click", function() {
    navigator.vibrate( 5000 );
  })

  btn2.addEventListener("click", function() {
    navigator.vibrate( [ 3000, 1000, 3000, 1000 ] );
  })

  stop.addEventListener("click", function() {
    navigator.vibrate( 0 );
  })

})
