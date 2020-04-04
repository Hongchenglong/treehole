// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_disabled: false,
    phone: "",
    password: "",
  },

  signup: function () {
    wx.navigateTo({
      url: '/pages/enroll/enroll'
    })
  },

  login: function () {
    var that = this
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (that.data.phone == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入手机号！',
        success: function (res) { }
      })
    } else if (that.data.phone.length != 11) {
      wx.showModal({
        title: '提示！',
        content: '手机号长度有误，请重新输入！',
        showCancel: false,
        success(res) {}
      })
    } else if (!myreg.test(that.data.phone)) {
      wx.showModal({
        title: '提示！',
        content: '请输入正确的手机号码！',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.password == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入密码！',
        success: function (res) { }
      })
    } else {
      // wx.redirectTo({
      //   url: "/pages/square/square"
      // })
      wx.request({
        url: getApp().globalData.server + '/treehole/index.php/home/user/login',
        data: {
          phone: that.data.phone,
          password: that.data.password,
        },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.error_code == 1 || res.data.error_code == 2 || res.data.error_code == 3) {
            wx.showModal({
              title: '提示！',
              content: res.data.msg,
              showCancel: false,
              success(res) {}
            })
          } else if (res.data.error_code != 0) {
            wx.showModal({
              title: '哎呀～',
              content: '出错了呢！' + res.data.data.msg,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
          else if (res.data.error_code == 0) {
            getApp().globalData.user = res.data.data
            wx.showModal({
              title: '恭喜！',
              showCancel: false,
              content: '登录成功',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              },
              complete: function (res) {
                wx.reLaunch({
                  url: '/pages/square/square'
                })
              }
            })
          }
        },
        fail: function (res) {
          wx.showModal({
            title: '哎呀～',
            content: '网络不在状态呢！',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
    }
  },
  phoneInput: function (e) {
    this.data.phone = e.detail.value
  },

  passwordInput: function (e) {
    this.data.password = e.detail.value
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})