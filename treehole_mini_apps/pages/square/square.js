// pages/square/square.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firco: "#000000",
    secco: "#979797",
    list: []
  },

  first_select: function() {
    // wx.redirectTo({
    //   url: '../square/square'
    // })
  },

  second_select: function() {
    wx.navigateTo({
      url: '../commit/commit'
    })
  },

  third_select: function() {
    wx.redirectTo({
      url: '/pages/mine/mine'
    })
  },

  like: function(e) {
    var that = this
    var list = that.data.list
    console.log("id of like", e.target.id)
    // 前端只能保证用户在当前页面点一次赞，刷新后就不能保证了
    for (var i = 0; i < list.length; i++) {
      if (list[i].id == e.target.id) {
        if (list[i].islike == 1) {
          wx.showModal({
            title: '提示！',
            content: '已经点过赞了哦，不能更赞了~',
            showCancel: false,
            success: function (res) { },
          })
       } else {
      // 与服务器交互
      wx.request({
        url: getApp().globalData.server + '/treehole/index.php/home/message/do_like',
        data: {
          message_id: e.target.id,
          user_id: getApp().globalData.user.user_id,
        },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.error_code != 0) {
            wx.showModal({
              title: '哎呀～',
              content: '出错了呢！' + res.data.msg,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else if (res.data.error_code == 0) {
            var list = that.data.list
            for (var i = 0; i < list.length; i++) {
              if (list[i].id == e.target.id) {
                list[i].islike = 1
                list[i].total_likes++
                that.setData({
                  list: list
                })
              }
            }
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
        },
        complete: function() {
          wx.hideLoading()  // 取消加载框
        }
      })
    }}}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    // wx.showLoading({
    //   title: '加载中',
    // })

    wx.request({
      url: getApp().globalData.server + '/treehole/index.php/home/message/get_all_messages',
      data: {},
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.error_code != 0) {
          wx.showModal({
            title: '哎呀～',
            content: '出错了呢！' + res.data.msg,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else if (res.data.error_code == 0) {
          that.setData({
            list: res.data.data
          })
          // that.data.list = res.data.data // 不会触发刷新
          console.log(that.data.list)
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
      },
      complete: function() {
      }
    })

    setTimeout(function () {
      wx.hideLoading()  // 加载框
    }, 2000)
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