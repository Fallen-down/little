// cordova中提供了, 可以调用摄像头设备的 api, 需要安装对应的插件
// 1. 添加插件 cordova plugin add cordova-plugin-camera
// 2. 这个插件提供了一个全局对象 navigator.camera 提供了一系列的api
//    这些api, 可以帮助我们拍照, 或者从相册中读取图片
//    注意: 需要在 deviceready 完成后, 才能获取 navigator.camera 对象

//    在 navigator.camera 对象中, 提供了一个方法, getPicture( success, error, options );
//    getPicture 可以用于拍照 或者 从相册中读取图片
//    options参数:
//    (1) quality: 表示图片质量
//    (2) destinationType: 表示返回的图片格式  (路径/还是base64格式的字符串)
//        默认值: FILE_URI  返回文件路径
//    (3) sourceType: 设置使用摄像头, 还是从相册读取
//        默认值 CAMERA  使用摄像头


/* 
  需求:
  1. 点击按钮, 拍摄照片, 显示在页面中
  2. 点击按钮, 从相册中, 找到图片, 显示在页面中
*/

// 找对象
var btn1 = document.getElementById("btn1");  // 拍照
var btn2 = document.getElementById("btn2");  // 拍照-返回base64格式
var btn3 = document.getElementById("btn3");  // 从相册中选图片

var img = document.querySelector("img"); // 获取图片dom对象

document.addEventListener("deviceready", function() {
  // 等待设备 api 的加载
  // console.log( navigator.camera );
  btn1.addEventListener("click", takePic);
  btn2.addEventListener("click", takePicBase64);
  btn3.addEventListener("click", getPic);
})

function takePic() {
  // 调用 getPicture 方法, 可以拍照
  // navigator.camera.getPicture( success, error, options );
  navigator.camera.getPicture( success, error, {
    quality: 50,   // 表示图片的质量, 默认值 50   范围 0-100
    destinationType: Camera.DestinationType.FILE_URI,  // 表示显示时, 返回图片url
    sourceType: Camera.PictureSourceType.CAMERA,   // 默认值 CAMERA 表示通过相机进行拍照
    targetWidth: 100,   // 保持原有比例, 进行压缩显示
    targetHeight: 100
  });

  function success( fileurl ) {
    console.log( "拍照成功" )
    // 默认 success 返回的是 文件路径
    img.src = fileurl;
  }
  function error() {
    console.log( "拍照失败" )
  }
}


function takePicBase64() {
  // 调用 getPicture( success, error, options );
  navigator.camera.getPicture( success, error, {
    quality: 50,   // 表示图片的质量
    destinationType: Camera.DestinationType.DATA_URL,  // 返回base64编码的字符串
    sourceType: Camera.PictureSourceType.CAMERA   // 默认值 CAMERA 表示通过相机进行拍照
  });

  function success( base64str ) {
    console.log( base64str );
    console.log( "拍照成功" );
    // 默认读取的base64编码后的图片, 是没有前面的格式说明的
    img.src = 'data:image/jpeg;base64,' + base64str;
  }
  function error() {
    console.log( "拍照失败" );
  }
}


function getPic() {
  navigator.camera.getPicture( success, error, {
    quality: 50,   // 表示图片的质量
    destinationType: Camera.DestinationType.FILE_URI,  // 返回的是图片路径
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY   // 配置图片源 为相册
  })

  function success ( fileurl ) {
    img.src = fileurl;
    console.log( "从相册中读取图片成功" )
  }
  function error () {
    console.log( "从相册中读取图片失败" );
  }
}
