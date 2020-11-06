// 1. 点击起始页, 让游戏页面显示
// 2. 石头剪子布小游戏, 随机生成左边和右边, 设置图片,  判断胜负
//    随机生成左边 和 右边 出的拳
//    在1-3间生成一个随机数,  1 剪刀 2 石头 3 布

// document.addEventListener("deviceready", function() {});

$(document).on("deviceready", function() {

  // 准备媒体
  // 设备api已经准备就绪, 调用 Media 构造函数, 生成媒体对象
  var bgMedia = new Media("/android_asset/www/video/bg.mp3");
  var startBgMedia = new Media("/android_asset/www/video/startBg.mp3");
  // 成功
  var winMedia = new Media("/android_asset/www/video/papa.mp3");
  // 失败
  var failMedia = new Media("/android_asset/www/video/haha.mp3")

  var result = ""; // 将来用于计分, 记录每次的结果
  var score = 0;  // 总分数
  var lastTime = 10; // 剩余的时间
  var timer = null; // 全局的定时器 timer

  bgMedia.play(); // 默认播放背景音乐

  $('.page-start').click(function() {
    $(this).fadeOut();
    $('.container').fadeIn(500, function() {
        // 正式游戏开始, 停止默认的背景音乐, 让游戏的背景音乐出来
        bgMedia.stop();
        startBgMedia.play();

        // 默认启动一次
        play();
        timeStart() // 开启倒计时
    });
  })


  // 给所有按钮, 添加点击事件, 判断计分
  $('.btns > div').click(function() {
    if ( result !== "" ) {
      // 说明需要计分, 比较用户选择的answer 和 result
      var answer = $(this).data("answer");

      if ( answer === result ) {
        // 得分, 计分
        score++;
        $('.score').html( score );
        // 计分完成后, 应该清空
        result = "";
        // 继续游戏
        play();
      }
      else {
        startBgMedia.stop();  // 让游戏声音关掉
        failMedia.play(); // 提示失败的声音
        // 点错了失败
        $('.resultModal').show();
        $('.resultModal h3').html("点错啦!失败了");
        // 展示得分给用户
        $('.resultScore').html( score );

        // 失败要清除定时器
        clearInterval( timer ); 
      }
    }
  })

  // 再来一次
  $('.again').click(function() {
    // 重置所有参数
    result = ""; // 将来用于计分, 记录每次的结果
    score = 0;  // 总分数
    lastTime = 10; // 剩余的时间
    $('.score').html( score );
    $('.lastTime').html( lastTime );

    // 隐藏模态框
    $('.resultModal').hide();
    // 开启背景音乐
    startBgMedia.play();    
    // 重新执行 play, 开启倒计时即可
    play();
    timeStart();
  });


  // 调用方法, 显示动画, 根据随机生成的左右手, 设置 result
  function play() {
    // 一开始显示动画
    animateStart();
    // 动了一会, 关闭动画
    setTimeout(function() {
      // 动画结束时, 应该随机生成结果
      animateStop();
      // 设置结果
      result = getResult();
    }, 300);
  }
  // 随机生成左右手, 设置图片, 判断胜负, 返回 result
  function getResult() {
    // 随机生成左右手  在1-3间生成一个随机数
    var left = Math.floor( Math.random()*3 + 1 );   // 只会出现 1, 2, 3
    var right = Math.floor( Math.random()*3 + 1 );  // 只会出现 1, 2, 3

    // 根据 1 剪刀 2 石头 3 布, 显示图片, 设置 img 的 src
    $('.left_img').attr("src", getImgSrc("left", left) );
    $('.right_img').attr("src", getImgSrc("right", right) );

    // 得到最终的胜负结果
    var result = judgeResult( left, right );
    return result;

    // 根据 left 和 right 需要判断胜负
    // 结果: 通过三个字符串来标记, left 左胜, center 平局, right 右胜
    function judgeResult( left, right ) {
      var result = "";
      if ( left === right ) {
        result = "center";   // 平局
      }
      else {
        var m = left - right; // 求差值
        if ( m > 0 ) {   // 31 右胜  32左胜   21左胜
          result = m === 1 ? 'left' : 'right';
        }
        else {   // 13  12  23
          result = m === -1 ? 'right' : "left";
        }
      }
      return result;
    }

    // 封装一个方法, 专门用于获取图片路径
    // direct 标记左边还是右边, n标记哪个图片
    function getImgSrc( direct, n ) {
      var picName = "";
      if ( n === 1 ) {
        picName = direct + "_jd.png"; // 剪刀
      }
      else if ( n === 2 ) {
        picName = direct + "_st.png"; // 石头
      }
      else {
        picName = direct + '_bu.png'; // 布
      }
      return "./images/" + picName;
    }
  }
  // 准备两个方法, 显示动画, 结束动画
  function animateStart() {  // 给盒子添加上 current 类
    // 让左右手, 都显示成石头
    $('.left_img').attr("src", "./images/left_st.png");
    $('.right_img').attr("src", "./images/right_st.png");
    $('.h_left, .h_right').addClass("current");
  }
  // 结束动画
  function animateStop() {   // 给盒子移除 current 类
    $('.h_left, .h_right').removeClass("current");
  }
  // 封装一个方法, 用于倒计时
  function timeStart() {
    clearInterval( timer );
    timer = setInterval(function() {
      if ( lastTime <= 0 ) {
        clearInterval(timer);
        
        startBgMedia.stop(); // 游戏背景音乐停止
        winMedia.play(); // 成功了
        // 告诉用户时间停了, 游戏结束
        $('.resultModal h3').html("成功了");
        $('.resultModal').show();
        $('.resultScore').html(score);
        return;
      }
      lastTime--;
      $('.lastTime').html( lastTime );
    }, 1000);
  }

});
