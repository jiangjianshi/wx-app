//index.js
//获取应用实例
var app = getApp()
var requestUrl = require('../../config.js');
Page({
  data: {
    addressList:[]
  },

  selectTap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: requestUrl.setDefault,
      data: {
        uid: wx.getStorageSync('uid'),
        id:id,
        isDefault:1
      },
      success: (res) =>{
        wx.navigateBack({})
      }
    })
  },

  addAddess : function () {
    wx.navigateTo({
      url:"/pages/address-add/index"
    })
  },
  
  editAddess: function (e) {
    wx.navigateTo({
      url: "/pages/address-add/index?id=" + e.currentTarget.dataset.id
    })
  },
  
  onLoad: function () {
    console.log('onLoad')

   
  },
  onShow : function () {
    this.initShoppingAddress();
  },
  initShoppingAddress: function () {
    var that = this;
    wx.request({
      url: requestUrl.listAddress,
      data: {
        uid: wx.getStorageSync('uid')
      },
      success: (res) =>{
        if (res.data.code == 0) {
          that.setData({
            addressList:res.data.data
          });
        } else {
          that.setData({
            addressList: null
          });
        }
      }
    })
  }

})
