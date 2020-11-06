// cordova 对于设备 api 的封装, 都是以 插件 和 事件的方式体现的
// cordova中对于事件的监听方式, 都类似

/* 
  1. deviceready 设备api准备就绪时, 执行,  
     基于设备 api 的一些底层事件 或 方法, 都要在deviceready事件调用完成后, 执行
  2. pause    当应用挂起进入后台时, 调用执行
  3. resume   当应用回到最前面时, 调用执行
  4. backbutton 当返回键被点击时, 调用
*/

/* 
  deviceready 设备 api 准备就绪时, 调用
  参数1: 事件名
  参数2: 回调函数
  参数3: 是否在捕获阶段执行, 默认 false(冒泡阶段执行), 直接默认即可
*/
// 等待是底层 cordova 相关的一些设备代码的加载
document.addEventListener("deviceready", function() {
  log( "设备api准备就绪, 可以进行其他方法的调用 或者 事件的监听" );

  // 添加应用挂起监听
  document.addEventListener("pause", function() {
    log( "应用程序被挂起了" );
  })

  document.addEventListener("resume", function() {
    log( "应用程序回来了" );
  })

  document.addEventListener("backbutton", function() {
    log( "返回键被点击了" )
  })
});

// 输出日志内容到屏幕body中
function log( msg ) {
  var p = document.createElement("p");
  p.style.fontSize = "14px";
  p.innerHTML = msg;
  // 输出到 body 中
  document.body.appendChild( p );
}

/* 
  1. deviceready  设备 api 准备就绪执行
  2. pause   应用进入后台执行
  3. resume  应用从后台返回执行
  4. backbutton 返回键被点击时执行
  .....
*/