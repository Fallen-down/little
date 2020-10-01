const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isMode = process.env.NODE_ENV;

const config = {
  // target: 'web', // <=== 默认是 'web'，可省略
  mode: isMode,
  entry: {
    main: path.join(__dirname, "src/main.js"), // entry: "./src/main.js"
  },
  output: {
    filename: "[name][hash:8].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    // 设置别名
    alias: {
      "@": path.resolve("src"), // 这样配置后 @ 可以指向 src 目录
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          hotReload: false, // disables Hot Reload
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          "vue-style-loader",
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: true,
              import: true,
              modules: {
                localIdentName: "[local]_[hash:base64:8]",
                auto: true,
              },
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "[name][hash:8].[ext]",
              esModule: false,
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              disable: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // make sure to include the plugin for the magic
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Vue + Webpack 打造 todo 应用",
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: path.resolve(__dirname, "public", "favicon.ico"),
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};

if (isMode == "development") {
  config.devtool = "inline-source-map";
  config.devServer = {
    allowedHosts: [
      // 允许访问开发服务器的服务列入白名单
      "host.com",
      "subdomain.host.com",
      "subdomain2.host.com",
      "host2.com",
    ],
    historyApiFallback: true,
    host: "0.0.0.0",
    hot: true,
    port: 9000,
    overlay: {
      errors: true,
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" },
        secure: false,
      },
    },
    watchContentBase: true,
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
}

module.exports = config;
