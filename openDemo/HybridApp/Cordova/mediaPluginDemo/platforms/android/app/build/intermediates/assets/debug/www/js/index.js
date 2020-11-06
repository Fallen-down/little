// 1. 安装插件 cordova plugin add cordova-plugin-media
// 2. 调用 api 方法, 插件定义了全局的构造函数 Media
//    注意点: 要在 deviceready 完成后

var btn1 = document.getElementById("btn1");   // 播放   play
var btn2 = document.getElementById("btn2");   // 暂停   pause
var btn3 = document.getElementById("btn3");   // 停止   stop
var btn4 = document.getElementById("btn4");   // 提高音量
var btn5 = document.getElementById("btn5");   // 降低音量


var myMedia = null;
var volume = 0.5; // 当前音量值

document.addEventListener("deviceready", function() {

  // 设备api准备就绪
  console.log( Media );

  // 播放  play
  btn1.addEventListener("click", function() {
    // 音频路径
    var src = "/android_asset/www/video/bg.mp3";
    // 播放音频
    if ( myMedia === null ) {
      myMedia = new Media( src, success, error );

      function success() {
        console.log( "初始化音频成功" );
      }
      function error() {
        console.log( "初始化音频失败" );
      }
    }
    // 播放音频
    myMedia.play();
  })

  // 暂停  pause
  btn2.addEventListener("click", function() {
    if ( myMedia ) {
      myMedia.pause();   // 暂停音频
    }
  })


  // 停止  stop
  btn3.addEventListener("click", function() {
    if ( myMedia ) {
      myMedia.stop();    // 停止音频
    }
  });


  // 设置音频
  // myMedia.setVolume( volume );  值范围 0-1
  btn4.addEventListener("click", function() {
    // 增大音量
    if ( myMedia && volume < 1 ) {
      volume += 0.1;
      myMedia.setVolume( volume );
    }
  })
  btn5.addEventListener("click", function() {
    // 减少音量
    if ( myMedia && volume > 0 ) {
      volume -= 0.1;
      myMedia.setVolume( volume );
    }
  })

})