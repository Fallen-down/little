package qianfeng.cn.hybrid_lesson1;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.ContentResolver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.Toast;

import com.blankj.utilcode.util.AppUtils;
import com.blankj.utilcode.util.LogUtils;
import com.blankj.utilcode.util.PermissionUtils;
import com.blankj.utilcode.util.ToastUtils;
import com.blankj.utilcode.util.UriUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    // 如果在js中，则为 let btn: Button
    private Button btn;
    private Button takephoto;
    private WebView wv;
    private static final int TAKE_PICTURE = 0;
    private static final int CHOOSE_PICTURE = 1;
    private static final int SCALE = 5;// 照片缩小比例
    private String imageName;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // 将逻辑代码于布局文件结合起来，相当于前端中的Html文件中的script的作用
        setContentView(R.layout.activity_main);
        // 找DOM节点，相当于前端中的 document.getElementById('')
        initView();
    }
    private View.OnClickListener btnonClickHandler = new View.OnClickListener() {

        @Override
        public void onClick(View v) {
            Toast.makeText(MainActivity.this, "hello Toast", Toast.LENGTH_SHORT).show();
        }
    };
    private View.OnClickListener takephotoonClickHandler = new View.OnClickListener() {

        @Override
        public void onClick(View v) {
            Toast.makeText(MainActivity.this, "拍照", Toast.LENGTH_SHORT).show();
            imageName=String.valueOf(System.currentTimeMillis());
            showPicturePicker();
        }
    };

    class MJavascriptInterface {
        private Context context;

        public MJavascriptInterface(Context context) {
            this.context = context;
        }

        /**
         * JS调用Android(Java)无参数的方法
         */
        @JavascriptInterface
        public void jsCallWebView() {
//            Toast.makeText(context, "JS Call Java!", Toast.LENGTH_SHORT).show();
            // 调用照相机
            imageName = String.valueOf(System.currentTimeMillis());
            showPicturePicker();
        }

        /**
         * JS调用Android(Java)含参数的方法
         *
         * @param param
         */
        @JavascriptInterface
        public void jsCallWebView(String param) {
            Toast.makeText(MainActivity.this, "JS Call Java!" + param, Toast.LENGTH_SHORT).show();
        }

        @JavascriptInterface
        public void jsCallWebView(Uri param) {
            Toast.makeText(MainActivity.this, "JS Call Java!" + param, Toast.LENGTH_SHORT).show();
        }
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK) {
            switch (requestCode) {
                case TAKE_PICTURE:
                    // 将保存在本地的图片取出并缩小后显示在界面上
                    String imagePath = Environment.getExternalStorageDirectory() + "/" + imageName + ".jpg";
                    Bitmap bitmap = BitmapFactory.decodeFile(imagePath);
                    Bitmap newBitmap = ImageTools.zoomBitmap(bitmap, bitmap.getWidth() / SCALE, bitmap.getHeight() / SCALE);
                    // 由于Bitmap内存占用较大，这里需要回收内存，否则会报out of memory异常
                    bitmap.recycle();

                    Log.i("tag", "--TAKE_PICTURE----imagePath--" + imagePath);
                    wv.loadUrl("javascript:javacalljsparam(" + "'" + imagePath + "'" + ")"); // 无参数调用
                    ImageTools.savePhotoToSDCard(newBitmap, Environment.getExternalStorageDirectory().getAbsolutePath(), String.valueOf(System.currentTimeMillis()));
                    break;

                case CHOOSE_PICTURE:
                    ContentResolver resolver = getContentResolver();
                    // 照片的原始资源地址
                    Uri originalUri = data.getData();
                    File file = UriUtils.uri2File(originalUri);
                    if(file!=null){
                        String path = file.getPath();
                        Log.i("tag", "path---:" + path);
                        wv.loadUrl("javascript:javacalljsparam(" + "'" + path + "'" + ")"); // 无参数调用
                    }

                    break;
                default:
                    break;
            }
        }
    }

    public void showPicturePicker() {
        AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
        builder.setTitle("图片来源");
        builder.setNegativeButton("取消", null);
        builder.setItems(new String[]{"拍照", "相册"},
                new DialogInterface.OnClickListener() {
                    // 类型码
                    int REQUEST_CODE;

                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        switch (which) {
                            case TAKE_PICTURE:
                                Uri imageUri = null;
                                String fileName = null;
                                Intent openCameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                                REQUEST_CODE = TAKE_PICTURE;
                                fileName = imageName + ".jpg";
//								imageUri = Uri.fromFile(new File(Environment.getExternalStorageDirectory(), fileName));
                                imageUri = UriUtils.file2Uri(new File(Environment.getExternalStorageDirectory(), fileName));
                                // 指定照片保存路径（SD卡），image.jpg为一个临时文件，每次拍照后这个图片都会被替换
                                openCameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, imageUri);
                                startActivityForResult(openCameraIntent, REQUEST_CODE);
                                break;

                            case CHOOSE_PICTURE:
                                Intent openAlbumIntent = new Intent(Intent.ACTION_GET_CONTENT);
                                REQUEST_CODE = CHOOSE_PICTURE;
                                openAlbumIntent.setDataAndType(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, "image/*");
                                startActivityForResult(openAlbumIntent, REQUEST_CODE);
                                break;

                            default:
                                break;
                        }
                    }
                });
        builder.create().show();
    }


    private void initView() {
        btn = (Button) findViewById(R.id.btn);
        takephoto = (Button) findViewById(R.id.takephoto);
        wv = (WebView) findViewById(R.id.wv);
        // webview控件的基本设置 --- 支持js、自适应屏幕、缩放、缓存、字符编码等
        wvSetting();
        // 按钮点击事件
        btn.setOnClickListener(btnonClickHandler);
        takephoto.setOnClickListener(takephotoonClickHandler);
        // 加载远程页面
//        loadOriginPage();

        // 加载本地页面
        wv.loadUrl("file:///android_asset/index.html");
        checkPermission();
        // 添加JS调用Android(Java)的方法接口
        wv.addJavascriptInterface(new MJavascriptInterface(getApplicationContext()), "WebViewFunc");
//        wv.addJavascriptInterface(new MJavascriptInterface1(getApplicationContext()), "加速度对象");
//        wv.addJavascriptInterface(new MJavascriptInterface2(getApplicationContext()), "通讯对象");
//        wv.addJavascriptInterface(new MJavascriptInterface3(getApplicationContext()), "....");
        /**
         * plus.Carems.takephoto()
         */
    }
    private void checkPermission() {
        LogUtils.e("mlr VZyStartActivity 检查权限 没有同意权限 进行权限申请");
        PermissionUtils.permission(Manifest.permission_group.CAMERA, Manifest.permission_group.STORAGE, Manifest.permission.READ_PHONE_STATE)
                .theme(new PermissionUtils.ThemeCallback() {
                    @Override
                    public void onActivityCreate(Activity activity) {
//                        activity.setTheme(R.style.Theme_AppCompat);
                    }
                })
                .callback(new PermissionUtils.FullCallback() {
                    @Override
                    public void onGranted(List<String> permissionsGranted) {
                    }

                    @Override
                    public void onDenied(List<String> permissionsDeniedForever, List<String> permissionsDenied) {
                        if (permissionsDeniedForever != null && permissionsDeniedForever.size() > 0) {
                            ToastUtils.showLong("没有权限，请求权限");
                        } else if (permissionsDenied != null && permissionsDenied.size() > 0) {
                            //方式二：返回手机的主屏幕
                            Intent intent = new Intent(Intent.ACTION_MAIN);
                            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                            intent.addCategory(Intent.CATEGORY_HOME);
                            startActivity(intent);

                            AppUtils.exitApp();
                        } else {
                        }
                    }
                }).request();
    }
    private void loadOriginPage() {
        wv.loadUrl("https://www.baidu.com");
        //默认情况下，点击webview中的链接，会使用Android系统自带的浏览器打开这个链接。
        //如果希望点击链接继续在我们自己的Browser中响应，必须覆盖 webview的WebViewClient对象：
        //新建两个对象MWebViewClient 和 MWebChromeClient，他们分别继承自WebViewClient和WebChromeClient
        /*  Android WebView 做为承载网页的载体控件，他在网页显示的过程中会产生一些事件，
            并回调给我们的应用程序，以便我们在网页加载过程中做应用程序想处理的事情。
            比如说客户端需要显示网页加载的进度、网页加载发生错误等等事件。
            WebView提供两个事件回调类给应用层，分别为WebViewClient,WebChromeClient开发者可以继承这两个类，接手相应事件处理。
            WebViewClient 主要提供网页加载各个阶段的通知，比如网页开始加载onPageStarted，网页结束加载onPageFinished等；
            WebChromeClient主要提供网页加载过程中提供的数据内容，比如返回网页的title,favicon等。*/
        //处理页面加载各个阶段
        MWebViewClient mWebViewClient = new MWebViewClient(wv, getApplicationContext());
        wv.setWebViewClient(mWebViewClient);
        //提供网页加载过程中提供的数据内容
        MWebChromeClient mWebChromeClient = new MWebChromeClient( getApplicationContext());
        wv.setWebChromeClient(mWebChromeClient);
    }

    /**
     * WebView是一个基于webkit引擎、展现web页面的控件。
     * 显示和渲染Web页面
     * 直接使用html文件（网络上或本地assets中）作布局
     * 可和JavaScript交互调用
     * WebView控件功能强大，除了具有一般View的属性和设置外，还可以对url请求、页面加载、渲染、页面交互进行强大的处理。
     *
     * 前提条件：添加网络权限
     *  <uses-permission android:name="android.permission.INTERNET"/>
     //方式1. 加载一个网页：
     webView.loadUrl("http://www.google.com/");
     //方式2：加载apk包中的html页面
     webView.loadUrl("file:///android_asset/test.html");
     //方式3：加载手机本地的html页面
     webView.loadUrl("content://com.android.htmlfileprovider/sdcard/test.html");
     // 方式4： 加载 HTML 页面的一小段内容
     WebView.loadData(String data, String mimeType, String encoding)
     // 参数说明：
     // 参数1：需要截取展示的内容
     // 内容里不能出现 ’#’, ‘%’, ‘\’ , ‘?’ 这四个字符，若出现了需用 %23, %25, %27, %3f 对应来替代，否则会出现异常
     // 参数2：展示内容的类型
     // 参数3：字节码
     */
    private void wvSetting () {
        //声明WebSettings子类
        WebSettings webSettings = wv.getSettings();
        //如果访问的页面中要与Javascript交互，则webview必须设置支持Javascript
        webSettings.setJavaScriptEnabled(true);
        // 若加载的 html 里有JS 在执行动画等操作，会造成资源浪费（CPU、电量）
        // 在 onStop 和 onResume 里分别把 setJavaScriptEnabled() 给设置成 false 和 true 即可
        //设置自适应屏幕，两者合用
        webSettings.setUseWideViewPort(true); //将图片调整到适合webview的大小
        webSettings.setLoadWithOverviewMode(true); // 缩放至屏幕的大小
        //缩放操作
        webSettings.setSupportZoom(true); //支持缩放，默认为true。是下面那个的前提。
        webSettings.setBuiltInZoomControls(true); //设置内置的缩放控件。若为false，则该WebView不可缩放
        webSettings.setDisplayZoomControls(false); //隐藏原生的缩放控件
        //其他细节操作
        webSettings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK); //关闭webview中缓存
        webSettings.setAllowFileAccess(true); //设置可以访问文件
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true); //支持通过JS打开新窗口
        webSettings.setLoadsImagesAutomatically(true); //支持自动加载图片
        webSettings.setDefaultTextEncodingName("utf-8");//设置编码格式
    }

    //点击返回上一页面而不是退出浏览器
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && wv.canGoBack()) {
            wv.goBack();

            return true;
        }

        return super.onKeyDown(keyCode, event);
    }

}
