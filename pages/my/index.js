const app = getApp()
var requestUrl = require('../../config.js');
Page({
	data: {
    balance:0,
    freeze:0,
    score:0,
    score_sign_continuous:0
  },
	onLoad() {
    
	},	
  onShow() {
    let that = this;
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    } else {
      that.setData({
        userInfo: userInfo,
        version: app.globalData.version
      })
    }
    this.getUserApiInfo();
    this.getUserAmount();
    // this.checkScoreSign();
  },
  getPhoneNumber: function(e) {
    console.info(e.detail);
    if (!e.detail.errMsg || e.detail.errMsg != "getPhoneNumber:ok") {
      wx.showModal({
        title: '提示',
        content: '无法获取手机号码',
        showCancel: false
      })
      return;
    }
    var that = this;
    wx.request({
      url: requestUrl.bindMobile,
      data: {
        token: wx.getStorageSync('token'),
        uid: wx.getStorageSync('uid'),
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '绑定成功',
            icon: 'success',
            duration: 2000
          })
          that.getUserApiInfo();
        } else {
          wx.showModal({
            title: '提示',
            content: '绑定失败',
            showCancel: false
          })
        }
      }
    })
  },
  getUserApiInfo: function () {
    var that = this;
    wx.request({
      url: requestUrl.getWxUserInfo,
      data: {
        uid: wx.getStorageSync('uid')
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            // apiUserInfoMap: res.data.data,
            userMobile: res.data.data.mobile
          });
        }
      }
    })

  },
  getUserAmount: function () {
    var that = this;
    wx.request({
      url: requestUrl.getUserScore,
      data: {
        uid: wx.getStorageSync('uid')
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            // balance: res.data.data.balance,
            // freeze: res.data.data.freeze,
            score: res.data.data
          });
        }
      }
    })

  },
  checkScoreSign: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/score/today-signed',
      data: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            score_sign_continuous: res.data.data.continuous
          });
        }
      }
    })
  },
  scoresign: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/score/sign',
      data: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.getUserAmount();
          that.checkScoreSign();
        } else {
          wx.showModal({
            title: '错误',
            content: res.data.msg,
            showCancel: false
          })
        }
      }
    })
  },
  relogin:function(){
    wx.navigateTo({
      url: "/pages/authorize/index"
    })
  },
  // recharge: function () {
  //   wx.navigateTo({
  //     url: "/pages/recharge/index"
  //   })
  // },
  // withdraw: function () {
  //   wx.navigateTo({
  //     url: "/pages/withdraw/index"
  //   })
  // }
})