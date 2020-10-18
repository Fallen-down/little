package qianfeng.cn.hybrid_lesson1;

import android.content.Context;
import android.graphics.Bitmap;
import android.net.http.SslError;
import android.webkit.SslErrorHandler;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MWebViewClient extends WebViewClient {
    private WebView webView;
    private Context context;

    public MWebViewClient(WebView webView) {
        super();
        this.webView = webView;
    }

    public MWebViewClient(WebView webView, Context context) {
        super();
        this.webView = webView;
        this.context = context;
    }


    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        webView.loadUrl(url);
        return true;
    }

    @Override
    public void onPageStarted(WebView view, String url, Bitmap favicon) {
        super.onPageStarted(view, url, favicon);
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        super.onPageFinished(view, url);
    }


    @Override
    public void onLoadResource(WebView view, String url) {
        super.onLoadResource(view, url);
    }

    @Override
    public void onReceivedSslError(WebView view,
                                   SslErrorHandler handler, SslError error) {
        super.onReceivedSslError(view, handler, error);
    }
}