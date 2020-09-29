# little

## 简介

项目小、少量的工具、做更多的事情。

## 技术栈

vue、vue-cli、vue-router、store 模式、mint-ui、axios、vuex、webpack……

## 任务列表

- [ ] Vue + Webpack 打造 todo 应用
- [ ] Vue-cli todo list
- [ ] Vue Router
- [ ] vuex
- [ ] realworld
- [ ] ...

## Vue + Webpack 打造 todo 应用

[webpack官网](https://webpack.js.org/)
[webpack Mode](https://webpack.js.org/configuration/mode/)
[Vue CLI 发展历程](https://cli.vuejs.org/guide/)
[Vue loader 手动设置](https://vue-loader.vuejs.org/zh/guide/#vue-cli)

### Webpack 基础概念

entry   入口
output  出口
loader  
plugins 插件
Mode    模式：例如生成模式、开发模式

### Vue loader 手动设置

vue-loader vue-template-compiler ：处理.vue文件
file-loader：处理静态文件的引入
url-loader：将文件为 base64
vue-style-loader、sass-loader、node-sass、：处理 Scss
postcss-loader：加浏览器前缀
babel-core、babel-loader：处理 js 文件编译为ES5
mini-css-extract-plugin：压缩css

### [视频]Vue + Webpack 打造 todo 应用

#### path

path 是 node 中处理路径的模块。
path.join([path1][, path2][, ...])：用于连接路径。
path.resolve([from ...], to)：将 to 参数解析为绝对路径，给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。
例如：

```json
path.resolve('/foo/bar', './baz');
// 返回: '/foo/bar/baz'
```

### 其他

目录 参考 vue cli 创建的项目

参考资料
[vue.js-todolist](https://github.com/carrieguo/vue.js-todolist)

#### 备忘录

css 分离压缩
MiniCssExtractPlugin
图片哈希值命名
browserslist
