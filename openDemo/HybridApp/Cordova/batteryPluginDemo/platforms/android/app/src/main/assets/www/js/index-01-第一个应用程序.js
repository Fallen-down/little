// 添加 deviceready 监听, 等待设备api的加载
document.addEventListener("deviceready", function() {

  console.log( "设备api准备就绪" );
  // 让 listening 隐藏
  // 让 received 显示
  setTimeout(function() {
    var listening = document.querySelector(".listening");
    var received = document.querySelector(".received");
  
    listening.style.display = "none";
    received.style.display = "block";
  }, 2000);
})