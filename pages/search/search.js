// pages/search/search.js
Page({
  data: {
    historyList:[],
    inputValue: '',
    recommandList: []
  },
  clearHistory: function(){
      this.setData({
          historyList: []
      });
      wx.removeStorageSync('history')
  },
  inputEvent: function(e){
    var _this = this;
    var value = e.detail.value;
    this.setData({
        inputValue: value
    });
    wx.getLocation({
        type: 'wgs84',
        success: function (res) {
            var latitude = res.latitude
            var longitude = res.longitude
            var speed = res.speed
            var accuracy = res.accuracy

            wx.request({
                url: 'https://w.mapbar.com/search2015/search/suggest',
                data: {
                    keywords: value,
                    city: '110000',
                    location: latitude + ',' + longitude
                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    console.log('搜索结果', res.data);
                    var list = res.data.pois;
                    var newList = list.map((item,index) => {
                        return item.name
                    });
                    var recomArray = _this.dealItemString(newList, value);
                    _this.setData({
                        recommandList: recomArray
                    })
                }
            })
        }
    })
  },
  dealItemString: function(list,important){
    var left,mid,right;
    var myList = list.map((item,index) => {
        var obj = new Object();
        var strIndex = item.indexOf(important);
        obj.left = item.substring(0, strIndex);
        obj.mid = important;
        obj.right = item.substring(strIndex+important.length,item.length)
        return obj;
    });
    return myList;
  },
  searchEvent: function(){
    var input = this.data.inputValue;//获取input框的值。
    var arr = wx.getStorageSync('history');//得到已经存储在缓存中的数组
    !arr && (arr = []);//如果数组不存在，就给一个新的[]

    var tag = true;
    for(var i = 0; i < arr.length; i++){
        if(arr[i] == input){
            tag = false
        }
    }

    //  || —— 满足前面的条件，不会管后面的条件
    //  && —— 满足前面的条件，继续查看后面的条件。
    input && tag && arr.push(input) && dealArray(arr);//在input不为空的情况下，并且input没有在数组中重复出现，进行push操作。

    wx.setStorageSync('history', arr);
    function dealArray(arr){
        if(arr.length > 10) {
            arr.shift()
        }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var list = wx.getStorageSync('history');
      console.log('list',list);
      !list && (list = [])

    //   var arr = [];
    //   for (var i = list.length - 1; i >= 0; i--){
    //       arr.push(list[i]);
    //   }

    //   var arr = [];
    //   for(var i = 0; i < list.length; i++){
    //       arr.unshift(list[i]);
    //   }
      this.setData({
          historyList: list.reverse()
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