/**
 * 小程序配置文件,主要是网络请求地址配置,如有网络请求，请将url在这里配置,使用的时候在.js中引入
 * const requestUrl = require('../../../../config').getSession
 */
var host = "https://funi7.com"  //正式
// var host = "http://try8023.com"  //内测
// var host = "http://192.168.2.115:8081"  //开发

//这里用来配置所有请求地址
var config = {
  host,
  registerUser: `${host}/user/registerUser`,    //获取session
  checkToken: `${host}/user/checkToken`,    //检查token
  addAddress: `${host}/address/addAddress`,    //addAddress
  listAddress: `${host}/address/listAddress`,    //listAddress
  getAddressDetail: `${host}/address/getAddressDetail`,//getAddressDetail
  deleteAddress: `${host}/address/delete`,//deleteAddress
  setDefault: `${host}/address/setDefault`,//setDefault
  getDefaultAddress: `${host}/address/getDefaultAddress`,//getDefaultAddress
  listOrders: `${host}/orders/listOrders`,//listOrders
  closeOrder: `${host}/orders/closeOrder`,//closeOrder
  successOrder: `${host}/orders/successOrder`,//successOrder
  statistics: `${host}/orders/statistics`,//statistics
  listCategory: `${host}/goods/listCategory`,//listCategory
  listBanner: `${host}/goods/listBanner`,//listBanner
  listGoods: `${host}/goods/listGoods`,//listGoods
  getGoodsDetail: `${host}/goods/getGoodsDetail`,//getGoodsDetail
  calSelectedPrice: `${host}/goods/calSelectedPrice`,//calSelectedPrice
  createOrder: `${host}/orders/createOrder`,//createOrder
  orderDetail: `${host}/orders/orderDetail`,//orderDetail
  confirmOrder: `${host}/orders/confirmOrder`,//confirmOrder
  getUserScore: `${host}/user/getUserScore`,//getUserScore
  getPayData: `${host}/orders/getPayData`,//getPayData
  putTemplateMsg: `${host}/orders/putTemplateMsg`,//putTemplateMsg
  getWxUserInfo: `${host}/user/getWxUserInfo`,//getWxUserInfo
  bindMobile: `${host}/user/bindMobile`,//bindMobile
}
module.exports = config