// cordova 对于插件的使用, 需要先进行安装
// 1. 安装插件  cordova plugin add cordova-plugin-battery-status
// 2. 该插件可以用于监视设备电池的变化
//    全局提供了三个事件
//      (1) batterystatus     表示电池状态发生改变 (至少1%电量变化)  或者  充电状态改变  触发
//      (2) batterycritical   表示电池电量进入临界值, 快关机了
//      (3) batterylow        表示电池电量比较低, 触发
//    注意点: 插件的事件监听以及插件方法的调用, 一定要在 deviceready 准备完成后调用
//    所有的事件, 都会返回一个 status 对象, 这个对象有两个属性
//      (1) status.level  表示设备电池电量的百分比  (0-100) number 
//      (2) status.isPlugged  表示设备是否正在充电  boolean值  true 在充电, false 不在充电

// 等待 cordova 设备api的加载
document.addEventListener("deviceready", function() {
  // cordova 设备api的加载完成, 可以添加事件监听
  window.addEventListener("batterystatus", onBatterystatus);
})

function onBatterystatus( status ) {
  log( "当前电量: " + status.level + "是否充电中: " + status.isPlugged )
}


// 输出日志内容到屏幕body中
function log( msg ) {
  var p = document.createElement("p");
  p.style.fontSize = "14px";
  p.innerHTML = msg;
  // 输出到 body 中
  document.body.appendChild( p );
}
