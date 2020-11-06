// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opts: {},
    page: 1,
    pageSize: 10,
    // 商铺列表数据，默认为空
    shopList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      opts: options
    })

    // 获取商铺列表数据
    this.getShopList()
  },

  // 获取数据的函数
  getShopList: function() {
    // 在发起请求之前，展示 loading 效果
    wx.showLoading({
      title: '数据加载中...'
    })

    // 发起请求
    wx.request({
      url: 'https://www.liulongbin.top:8081/categories/'+this.data.opts.id+'/shops?_page='+ this.data.page +'&_limit=' + this.data.pageSize,
      success: (res) => {
        // console.log(res.data)
        this.setData({
          // 赋值的操作【覆盖的操作】
          // ES6 展开运算符
          shopList: [...this.data.shopList, ...res.data]
        })
      },
      // 只要触发了 complete 就说明，这次请求完成了
      complete: () => {
        // 只要完成请求，就立即关闭下拉刷新的效果
        wx.stopPullDownRefresh()
        // 隐藏loading效果
        wx.hideLoading()
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // 1. 重置关键数据
    this.setData({
      page: 1,
      shopList: []
    })
    // 2. 重新从第一页发起数据请求
    this.getShopList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // console.log('需要加载下一页数据了！')
    // 1. 先让页码值 +1
    this.setData({
      page: this.data.page + 1
    })
    // 2. 调用刚才的 getShopList 函数，获取下一页数据
    this.getShopList()
  },
})