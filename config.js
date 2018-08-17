/**
 * 小程序配置文件,主要是网络请求地址配置,如有网络请求，请将url在这里配置,使用的时候在.js中引入
 * const requestUrl = require('../../../../config').getSession
 */

// var host = "http://try8023.com"  //线上
var host = "http://192.168.2.237:8080"  //开发

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
  statistics: `${host}/orders/statistics`,//statistics
  listCategory: `${host}/goods/listCategory`,//listCategory
  listBanner: `${host}/goods/listBanner`,//listBanner
  listGoods: `${host}/goods/listGoods`,//listGoods
  getGoodsDetail: `${host}/goods/getGoodsDetail`,//getGoodsDetail
  

}
module.exports = config