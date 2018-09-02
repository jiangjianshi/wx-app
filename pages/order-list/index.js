var wxpay = require('../../utils/pay.js')
var requestUrl = require('../../config.js')

var app = getApp()
Page({
  data:{
    statusType: ["待付款", "待发货", "待收货", "待评价", "已完成"],
    currentType:0,
    tabClass: ["", "", "", "", ""]
  },
  statusTap:function(e){
     var curType =  e.currentTarget.dataset.index;
     this.data.currentType = curType
     this.setData({
       currentType:curType
     });
     this.onShow();
  },
  orderDetail : function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/order-details/index?id=" + orderId
    })
  },
  cancelOrderTap:function(e){
    var that = this;
    var orderId = e.currentTarget.dataset.id;
     wx.showModal({
      title: '确定要取消该订单吗？',
      content: '',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading();
          wx.request({
            url: requestUrl.closeOrder,
            data: {
              uid: wx.getStorageSync('uid'),
              orderId: orderId
            },
            success: (res) => {
              wx.hideLoading();
              if (res.data.code == 0) {
                that.onShow();
              }
            }
          })
        }
      }
    })
  },
  toPayTap:function(e){
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    var money = e.currentTarget.dataset.money;
    var needScore = e.currentTarget.dataset.score;
    console.log("orderId:" + orderId + ",money:" + money + ",needScore:" + needScore);
    wx.request({
      url: requestUrl.getUserScore,
      data: {
        uid: wx.getStorageSync('uid')
      },
      success: function (res) {
        if (res.data.code == 0) {
          // res.data.data.balance
          // money = money - res.data.data;
          // if (res.data.data < needScore) {
          //   wx.showModal({
          //     title: '错误',
          //     content: '您的积分不足，无法支付',
          //     showCancel: false
          //   })
          //   return;
          // }
          // if (money <= 0) {
          //   // 直接使用余额支付
          //   wx.request({
          //     url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/pay',
          //     method:'POST',
          //     header: {
          //       'content-type': 'application/x-www-form-urlencoded'
          //     },
          //     data: {
          //       token: wx.getStorageSync('token'),
          //       orderId: orderId
          //     },
          //     success: function (res2) {
          //       that.onShow();
          //     }
          //   })
          // } else {
          //   wxpay.wxpay(app, money, orderId, "/pages/order-list/index");
          // }
          //次处直接使用微信支付
          wxpay.wxpay(app, money, orderId, "/pages/order-list/index");
        } else {
          wx.showModal({
            title: '错误',
            content: '无法获取用户资金信息',
            showCancel: false
          })
        }
      }
    })    
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
   
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
 
  },
  getOrderStatistics : function () {
    var that = this;
    wx.request({
      url: requestUrl.statistics,
      data: { uid: wx.getStorageSync('uid') },
      success: (res) => {
        wx.hideLoading();
        if (res.data.code == 0) {
          var tabClass = that.data.tabClass;
          if (res.data.data.noPay > 0) {
            tabClass[0] = "red-dot"
          } else {
            tabClass[0] = ""
          }
          if (res.data.data.noSend > 0) {
            tabClass[1] = "red-dot"
          } else {
            tabClass[1] = ""
          }
          if (res.data.data.noReceive > 0) {
            tabClass[2] = "red-dot"
          } else {
            tabClass[2] = ""
          }
          if (res.data.data.noComment > 0) {
            tabClass[3] = "red-dot"
          } else {
            tabClass[3] = ""
          }
          if (res.data.data.done > 0) {
            //tabClass[4] = "red-dot"
          } else {
            //tabClass[4] = ""
          }

          that.setData({
            tabClass: tabClass,
          });
        }
      }
    })
  },
  onShow:function(){
    // 获取订单列表
    wx.showLoading();
    var that = this;
    var postData = {
      uid: wx.getStorageSync('uid')
    };
    postData.status = that.data.currentType;
    this.getOrderStatistics();
    wx.request({
      url: requestUrl.listOrders,
      data: postData,
      success: (res) => {
        wx.hideLoading();
        if (res.data.code == 0) {
          that.setData({
            orderList: res.data.data.orders,
            // logisticsMap : res.data.data.logisticsMap,
            goodsMap : res.data.data.goodsMap
          });
        } else {
          this.setData({
            orderList: null,
            // logisticsMap: {},
            goodsMap: {}
          });
        }
      }
    })
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
 
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
 
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
   
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  
  }
})
