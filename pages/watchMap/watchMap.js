// pages/watchMap/watchMap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      interval: 2000,
      autoplay: true,
      imgUrls: [
          'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1144405335,2029061999&fm=27&gp=0.jpg',
          'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=676957035,2381803956&fm=27&gp=0.jpg',
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1254544685,441686333&fm=27&gp=0.jpg'
      ],
      latitude: '',
      longitude: '',
      markers: [{
          id: 0,
          latitude: '39.54245',
          longitude: '116.23456',
          iconPath: '/resouces/myicon/poi_1.png',
          width: 25,
          height: 25
      }, {
          id: 2,
          latitude: '39.54',
          longitude: '116',
          iconPath: '/resouces/myicon/poi_2.png',
          width: 25,
          height: 25
      }],
      scale: 10,
      poiList: []
  },
  markersEvent: function(e){
      console.log(e.markerId);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _this = this;
      wx.getLocation({
          type: 'wgs84',
          success: function (res) {
              var latitude = res.latitude
              var longitude = res.longitude
              var speed = res.speed
              var accuracy = res.accuracy
              _this.setData({
                  latitude,
                  longitude
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