// pages/searchResult/searchResult.js
import AppService from '../../services/AppService.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      recommandList: []
  },
  watchMapEvent: function (e) {
    var value = e.currentTarget.dataset.item;
    if (value) {
        wx.navigateTo({
            url: '/pages/watchMap/watchMap?value='+value,
        })
    }
  },
  setDesEvent: function (e) {
      var value = e.currentTarget.dataset.item;
      if(value){
          wx.navigateTo({
              url: '/pages/des/des?value='+value,
          })
      }
  },
  reLaunch: function(){
      wx.reLaunch({
          url: '/pages/chat/chat',
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      var _this = this;
      let value = '北京'
      wx.setNavigationBarTitle({
          title: options.des
      });

      wx.getLocation({
          type: 'wgs84',
          success: function (res) {
              var latitude = res.latitude
              var longitude = res.longitude
              var speed = res.speed
              var accuracy = res.accuracy
              //根据封装的服务，得到一个数据列表。
              var location = longitude + ',' + latitude
              AppService.searchSuggest(value, latitude, longitude).then((res) => {
                  console.log('服务封装', res);
                  var list = res.data.pois;
                  var newList = list.map((item, index) => {
                      return item.name
                  });
                  var recomArray = _this.dealItemString(newList, value);
                  _this.setData({
                      recommandList: recomArray
                  })
              })
          }
      })
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