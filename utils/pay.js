var requestUrl = require('../config.js')

function wxpay(app, money, orderId, redirectUrl) {
  let remark = "在线充值";
  let nextAction = {};
  if (orderId != 0) {
    remark = "支付订单：" + orderId;
    nextAction = { type: 0, id: orderId };
  }
  wx.request({
    url: requestUrl.getPayData,
    data: {
      token: wx.getStorageSync('token'),
      money:money,
      remark: remark,
      payName:"在线支付",
      nextAction: nextAction
    },
    //method:'POST',
    success: function(res){
      if(res.data.code == 0){
        // 发起支付
        wx.requestPayment({
          timeStamp:res.data.data.timeStamp,
          nonceStr:res.data.data.nonceStr,
          package:res.data.data.prepayId,
          signType:'MD5',
          paySign:res.data.data.sign,
          fail:function (res) {
            console.info(res);
            wx.showToast({title: '支付失败'})
          },
          success:function () {
            wx.showToast({title: '支付成功'}),
            wx.request({
              url: requestUrl.successOrder,
              data: {
                orderCode: orderId
              }
            });
          }
        })
      } else {
        wx.showToast({ title: '服务器忙' + res.data.code + res.data.msg})
      }
    }
  })
}

module.exports = {
  wxpay: wxpay
}
