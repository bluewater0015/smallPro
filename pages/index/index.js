//index.js
const app = getApp()

Page({
  data: {
    showList:[
        {
            icon:'',
            text: '设置目的地，自动建群'
        },{
            icon: '',
            text: '分享给好友' 
        }, {
            icon: '',
            text: '好友加入群组'
        }, {
            icon: '',
            text: '查看群成员剩余距离'
        }, {
            icon: '',
            text: '查看群成员剩余时间'
        }, {
            icon: '',
            text: '群组语音聊天'
        }
    ],
    modalHidden: true
  },
  modalChange: function(){
      this.setData({
          modalHidden: true
      })
  },
  modelEvent: function(){
      this.setData({
          modalHidden: false
      })
  },
  modalCancel: function(){
      this.setData({
          modalHidden: true
      })
  },
  navEvent: function(){
      wx.navigateTo({
          url: '../search/search',
      });
  },
  //周期函数
  onLoad: function () {
    
  }
})
