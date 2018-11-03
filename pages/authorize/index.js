// pages/authorize/index.js

var requestUrl = require('../../config.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
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
  
  },
  bindGetUserInfo: function (e) {
    if (!e.detail.userInfo){
      return;
    }
    wx.setStorageSync('userInfo', e.detail.userInfo)
    this.login();
  },
  
  login: function () {
    let that = this;
    let token = wx.getStorageSync('token');
    let uid = wx.getStorageSync('uid');
    if (uid) {
      wx.request({
        url: requestUrl.checkToken,
        data: {
          token: token,
          uid: uid
        },
        success: function (res) {
          if (res.data.code != 0) {
            wx.removeStorageSync('uid')
            that.login();
          } else {
            // 回到起始页面
            wx.navigateTo({
              url: "/pages/start/start"
            })
          }
        }
      })
      return;
    }
    this.registerUser();
  },
  registerUser: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        var userinfo =  wx.getStorageSync('userInfo')
        wx.request({
          url: requestUrl.registerUser,
          method:'POST',
          header: {
            // 'content-type': 'application/json'
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            code:code,
            userinfo: JSON.stringify(userinfo),
            inviterUid: wx.getStorageSync('inviter_uid')
          },
          success: function (res) {
            if (res.data.code != 0) {
              wx.removeStorageSync('token')
              // 登录错误
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '无法登录，请重试',
                showCancel: false
              })
              return;
              // that.login();
            } else {
              // 回到原来的地方放
              wx.setStorageSync('token', res.data.data.token)
              wx.setStorageSync('uid', res.data.data.uid)
              app.globalData.token = res.data.data.token
              app.globalData.uid = res.data.data.uid
              wx.navigateTo({
                url: "/pages/start/start"
              })
            }
          }
        })
      }
    })
  }
})