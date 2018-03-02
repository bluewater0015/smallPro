// pages/search/search.js
Page({
  data: {
    historyList:[],
    inputValue: '',
  },
  clearHistory: function(){
      this.setData({
          historyList: []
      });
      wx.removeStorageSync('history')
  },
  inputEvent: function(e){
    var value = e.detail.value;
    this.setData({
        inputValue: value
    })
  },
  searchEvent: function(){
    var input = this.data.inputValue;//获取input框的值。
    var arr = wx.getStorageSync('history');//得到已经存储在缓存中的数组
    !arr && (arr = []);//如果数组不存在，就给一个新的[]
    input && arr.push(input);//在input不为空的情况下，进行push操作。

    wx.setStorageSync('history', arr);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var list = wx.getStorageSync('history');
      console.log('list',list);
      this.setData({
          historyList: list
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