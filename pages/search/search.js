// pages/search/search.js
import AppService from '../../services/AppService.js';
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
    //获取当前位置经纬度
    wx.getLocation({
        type: 'wgs84',
        success: function (res) {
            var latitude = res.latitude
            var longitude = res.longitude
            var speed = res.speed
            var accuracy = res.accuracy
            //根据封装的服务，得到一个数据列表。
            AppService.searchSuggest(value, latitude, longitude).then((res) => {
                console.log('服务封装',res);
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
   * 函数：dealItemString(list, important)——list需要处理的列表，import匹配关键字
   * 作用：返回一个处理后的数组，把字符串数组转化为对象数组。
   */
  dealItemString: function(list,important){

    //使用map方法，返回一个处理后的数组myList。
    var myList = list.map((item,index) => {
        var obj = new Object();
        var strIndex = item.indexOf(important);//获取匹配字符串的索引值。
        obj.left = item.substring(0, strIndex);//截取一个居左位置的字符串
        obj.mid = important;//中间字符串，就是当前匹配关键字
        obj.right = item.substring(strIndex+important.length,item.length);
        //截取右边字符串。
        return obj;
    });
    
    return myList;//把得到的处理后的list当做函数的返回值！！！
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


    if(input){
        wx.navigateTo({
            url: `/pages/searchResult/searchResult?des=${input}`
        })
    } else{
        wx.showModal({
            title: '提示',
            content: '请输入搜索内容',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
  },
  listEvent: function(e){
    console.log('事件对象',e);
    var value = e.currentTarget.dataset.value;
    if(value){
        wx.navigateTo({
            url: `/pages/searchResult/searchResult?des=${value}`
        })
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