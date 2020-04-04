// pages/enroll/enroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    phonenumber: "",
    password: "",
    passwordack: "",
  },

  signin: function(e) {
    wx.navigateBack({
      delta: 1
    })
  },

  regist: function(e) {
    // 暂存this
    var that = this
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (that.data.username == '') {
      wx.showModal({
        title: '提示！',
        content: '请输入用户名！',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.phonenumber == '') {
      wx.showModal({
        title: '提示！',
        content: '请输入手机号！',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.phonenumber.length != 11) {
      wx.showModal({
        title: '提示！',
        content: '手机号长度有误，请重新输入！',
        showCancel: false,
        success(res) {}
      })
    } else if (!myreg.test(that.data.phonenumber)) {
      wx.showModal({
        title: '提示！',
        content: '请输入正确的手机号码！',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.password == '') {
      wx.showModal({
        title: '提示！',
        content: '请输入密码！',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.passwordack == '') {
      wx.showModal({
        title: '提示！',
        content: '请输入确认密码！',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.password!=that.data.passwordack ) {
      wx.showModal({
        title: '提示！',
        content: '两次输入密码不一致！',
        showCancel: false,
        success(res) {}
      })
    } else {
      console.log('success')
      // 接口
      wx.request({
        url: getApp().globalData.server + '/treehole/index.php/home/user/sign', 
        data: {
          username: that.data.username,
          phone: that.data.phonenumber,
          password: that.data.password,
          password_again: that.data.passwordack,
          face_url: getApp().globalData.userInfo.avatarUrl,
        },
        method: 'POST', // 默认GET方法
        header: {
          'content-type': 'application/x-www-form-urlencoded' 
        },
        success (res) { // 回调函数
          console.log(res.data) // 服务器的返回数据
          if (res.data.error_code == 1 || res.data.error_code == 2 || res.data.error_code == 3) {
            wx.showModal({
              title: '提示！',
              content: res.data.msg,
              showCancel: false,
              success(res) {}
            })
          } else if (res.data.error_code != 0) {
            wx.showModal({
              title: '哎呀~',
              content: '出错了呢！' + res.data.msg,
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else if (res.data.error_code == 0) {
            getApp().globalData.user = res.data.data
            console.log(getApp().globalData.user)
            wx.showModal({
              title: '恭喜！',
              content: '注册成功！',
              showCancel: false,
              success(res) {},
              complete: function(res) { // 顺序执行
                wx.reLaunch({ // 关闭所有页面并跳转
                  url: '/pages/square/square'
                })
              }
            })
          }
        },
        fail:function(res) {
          wx.showModal({
            title: '哎呀~',
            content: '出网络不在状态呢！',
            success: function(res) {
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

  usernameInput: function(e) {
    this.data.username = e.detail.value
  },

  phonenumberInput: function(e) {
    this.data.phonenumber = e.detail.value
  },

  passwordInput: function(e) {
    this.data.password = e.detail.value
  },

  passwordInputAck: function(e) {
    this.data.passwordack = e.detail.value
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})