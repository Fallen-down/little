package qianfeng.cn.hybridapplesson;

import android.content.Context;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private Button btn1; // var btn1
    private WebView wv;
    private View.OnClickListener btnonClickHandler = new View.OnClickListener() {

        @Override
        public void onClick(View v) {
            // 业务逻辑 可消失的提示框 Toast
            Toast.makeText(MainActivity.this, "测试android的Toast功能", Toast.LENGTH_SHORT).show();
            wv.loadUrl("javascript:getData('我是一个android传递过来的值')");
        }
    };
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initView();
    }

    private void initView() {
        // btn1 = document.getElementById('btn1')
        btn1 = (Button) findViewById(R.id.btn1);
        // btn1.addEventLinstener('click', function (){}, false)
        btn1.setOnClickListener(btnonClickHandler);

        wv = (WebView) findViewById(R.id.wv);
        /**
         * wv.loadUrl();
         *      webView.loadUrl("http://www.google.com/"); 远程页面
         *      webView.loadUrl("file:///android_asset/test.html"); // 本地页面-- 随着app打包
         *      webView.loadUrl("content://com.android.htmlfileprovider/sdcard/test.html"); // 手机本地的页面---sd卡中的页面
         * wv.loadData(); // 加载一段HTML代码
         *
         */
        // 默认的Webview是需要进行配置才能达到我们想要的一些浏览器的特性
        wvSetting();
        // webview会打开默认的手机浏览器去执行超链接等，而希望在本webview中打开 <a href="" target="_black"></a>
        //默认情况下，点击webview中的链接，会使用Android系统自带的浏览器打开这个链接。
        //如果希望点击链接继续在我们自己的Browser中响应，必须覆盖 webview的WebViewClient对象：
        //新建两个对象MWebViewClient 和 MWebChromeClient，他们分别继承自WebViewClient和WebChromeClient
        /*  Android WebView 做为承载网页的载体控件，他在网页显示的过程中会产生一些事件，
            并回调给我们的应用程序，以便我们在网页加载过程中做应用程序想处理的事情。
            比如说客户端需要显示网页加载的进度、网页加载发生错误等等事件。
            WebView提供两个事件回调类给应用层，分别为WebViewClient,WebChromeClient开发者可以继承这两个类，接手相应事件处理。
            WebViewClient 主要提供网页加载各个阶段的通知，比如网页开始加载onPageStarted，网页结束加载onPageFinished等；
            WebChromeClient主要提供网页加载过程中提供的数据内容，比如返回网页的title,favicon等。*/
        wvClientSetting();
        // 加载远程页面
        // 初次加载显示无网络，需要到项目配置文件添加网络的权限
        // <uses-permission android:name="android.permission.INTERNET"/>
//        wv.loadUrl("https://m.jd.com");
        // 加载本地页面
        wv.loadUrl("file:///android_asset/index.html");

        // 添加JS调用Android(Java)的方法接口
        wv.addJavascriptInterface(new MJavascriptInterface(getApplicationContext()), "ToastFunc");
        wv.addJavascriptInterface(new PhotoJavascriptInterface(getApplicationContext()), "PhotoFunc");
    }

    class PhotoJavascriptInterface {
        private Context context;

        public PhotoJavascriptInterface(Context context) {
            this.context = context;
        }

        // andorid版本升级时必须加上@JavascriptInterface
        @JavascriptInterface
        public void takePhoto() { // 拍照
            Toast.makeText(MainActivity.this, "拍照", Toast.LENGTH_SHORT).show();
            // 拍照流程
        }

        @JavascriptInterface
        public void getPhoto() { // 相册选取
            Toast.makeText(MainActivity.this, "相册选取", Toast.LENGTH_SHORT).show();
            // 相册选取流程
        }
    }

    class MJavascriptInterface {
        private Context context;

        public MJavascriptInterface(Context context) {
            this.context = context;
        }

        // andorid版本升级时必须加上@JavascriptInterface
        @JavascriptInterface
        public void showToast() { // 可以由前端调用 window.ToastFunc.showToast()
            Toast.makeText(MainActivity.this, "js调起了android的Toast功能", Toast.LENGTH_SHORT).show();
        }

        @JavascriptInterface
        public void showToastParams(String str) { // 可以由前端调用 window.ToastFunc.showToast()
            Toast.makeText(MainActivity.this, "js调起了android的Toast功能" + str, Toast.LENGTH_SHORT).show();
        }
    }

    private void wvClientSetting() {
        //处理页面加载各个阶段
        MWebViewClient mWebViewClient = new MWebViewClient(wv, getApplicationContext());
        wv.setWebViewClient(mWebViewClient);
        //提供网页加载过程中提供的数据内容
        MWebChromeClient mWebChromeClient = new MWebChromeClient( getApplicationContext());
        wv.setWebChromeClient(mWebChromeClient);
    }

    private void wvSetting() {
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
