// pages/watchMap/watchMap.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        latitude: '',
        longitude: '',
        controls: [{
            id: 1,
            iconPath: '/resouces/myicon/allWatch.png',
            position: {
                left: 20,
                top: 400 - 50,
                width: 30,
                height: 30
            },
            clickable: true
        }],
        markers: [{
            id: 0,
            latitude: 39.54245,
            longitude: 116.23456,
            iconPath: '/resouces/myicon/poi_1.png',
            city: '北京',
            width: 25,
            height: 25
        }, {
            city: '天津',
            id: 1,
            latitude: 39.54,
            longitude: 116,
            iconPath: '/resouces/myicon/poi_2.png',
            width: 25,
            height: 25
        }, {
            city: '上海',
            id: 2,
            latitude: 38.54,
            longitude: 116,
            iconPath: '/resouces/myicon/poi_3.png',
            width: 25,
            height: 25
        }, {
            city: '广州',
            id: 3,
            latitude: '37.54',
            longitude: '116',
            iconPath: '/resouces/myicon/poi_4.png',
            width: 25,
            height: 25
        }, {
            city: '广州',
            id: 4,
            latitude: '37.54',
            longitude: '110',
            iconPath: '/resouces/myicon/poi_5.png',
            width: 25,
            height: 25
        }],
        currentIndex: 0,
        scale: 10,
        poiList: []
    },
    markersEvent: function (e) {
        var index = e.markerId;
        this.setData({
            currentIndex: index
        }, () => {
            this.dealMarkers();
        })
    },
    controlsEvent: function(e){
        console.log(e);
        var id = e.controlId;
        if(id == 1){
            this.setData({
                markers: this.data.markers
            })
        }
    },
    swiperEvent: function(e){
        var index = e.detail.current;
        this.setData({
            currentIndex: index
        },() => {
            this.dealMarkers();
        })
    },
    dealMarkers: function(){
        var markers = this.data.markers;
        var index = this.data.currentIndex;
        console.log(markers,index)
        var _this = this;
        var arr = markers.map((item,idx) => {
            item.latitude = Number(item.latitude);
            item.longitude = Number(item.longitude);

            if(idx != index){
                item.iconPath = '/resouces/myicon/poi_'+(idx+1)+'x.png'
            } else{
                item.iconPath = '/resouces/myicon/poi_' +(idx + 1)+ '.png';
                
            }
            return item
        });
        this.setData({
            markers: arr,
            latitude: arr[this.data.currentIndex].latitude,
            longitude: arr[this.data.currentIndex].longitude
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        this.dealMarkers();
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                console.log(res);
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