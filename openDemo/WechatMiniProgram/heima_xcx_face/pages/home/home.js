// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wh: 0,
    position: 'back',
    src: '',
    token: '',
    faceinfo: {},
    // 中英文映射对象
    map: {
      gender: {
        male: '男',
        female: '女'
      },
      expression: {
        none: '不笑', smile: '微笑', laugh: '大笑'
      },
      glasses: {
        none: '无眼镜', common: '普通眼镜', sun: '墨镜'
      },
      emotion: {
        angry: '愤怒', disgust: '厌恶', fear: '恐惧', happy: '高兴', sad: '伤心', surprise: '惊讶', neutral: '无表情', pouty: '撅嘴', grimace: '鬼脸'
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取设备的信息
    const sysinfo = wx.getSystemInfoSync()
    this.setData({
      wh: sysinfo.screenHeight
    })
  },

  // 切换摄像头
  reverse() {
    this.setData({
      position: this.data.position === 'back' ? 'front' : 'back'
    })
  },

  // 点击拍照
  takePhoto() {
    // 创建拍照的上下文对象
    const ctx = wx.createCameraContext()
    // 调用 takePhoto 函数拍照
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        }, () => {
          // 获取颜值数据
          this.getFaceInfo()
        })
      }
    })
  },

  // 选择照片
  choosePhoto() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: (res) => {
        if (res.errMsg === 'chooseImage:ok' && res.tempFilePaths.length !== 0) {
          this.setData({
            src: res.tempFilePaths[0]
          }, () => {
            // 获取颜值数据
            this.getFaceInfo()
          })
        }
      }
    })
  },

  // 重新拍照
  reChoose() {
    this.setData({
      src: '',
      faceinfo: '',
      token: ''
    })
  },

  // 获取颜值数据
  getFaceInfo() {
    // 1. 拿 token
    wx.request({
      method: 'POST',
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=ogVkDXPHZXWg8lVstC54PEV1&client_secret=9sQgF5a5x8tZdUMEgwmr3fWLUHbqRxwP',
      success: (res) => {
        // 为 token 赋值
        this.setData({
          token: res.data.access_token
        }, () => {
          // 2. 处理需要的参数
          this.processParams()
        })
      }
    })
    // 2. 组织参数
    // 3. 发请求，获取颜值数据
  },

  // 2. 处理参数
  processParams() {
    const params = {
      // 图片
      image: '',
      // 发送到服务器的图片格式，是 BASE64 这种图片格式
      image_type: 'BASE64',
      // 希望颜值检测完毕后，服务器返回哪些颜值数据
      face_field: 'age,gender,beauty,expression,glasses,emotion'
    }

    // 根据图片路径，把图片转为 base64 格式，然后，赋值给 params.image
    const fileManager = wx.getFileSystemManager()
    fileManager.readFile({
      // 要读取哪个文件
      filePath: this.data.src,
      // 以什么格式来读取指定的文件
      encoding: 'base64',
      success: (res) => {
        params.image = res.data

        // 3. 发送请求，检测颜值数据
        this.testFace(params)
      }
    })
  },

  // 3. 发起请求，检测颜值数据
  testFace(params) {
    wx.showLoading({
      title: '颜值检测中...',
    })
    wx.request({
      // 请求的类型
      method: 'POST',
      // 请求的地址
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=' + this.data.token,
      // 请求头
      header: {
        'Content-Type': 'application/json'
      },
      // 请求体
      data: params,
      // 成功的回调函数
      success: (res) => {
        if (res.errMsg === 'request:ok' && res.data.result !== null && res.data.result.face_num !== 0) {
          this.setData({
            faceinfo: res.data.result.face_list[0]
          })
        }
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  }

})