//index.js
const app = getApp()
import WxService from '../../services/wxService.js';
import AppService from '../../services/AppService.js';

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
  onLoad: function () {
      WxService.login().then((res) => {
        console.log('服务封装的wx',res);
        return WxService.getUserInfo().then(data => {
            data.code = res.code;
            return data;
        })
      }).then(userInfo => {
          console.log('服务封装的wx',userInfo);
            var code = userInfo.code;
            var userimg = userInfo.userInfo.avatarUrl;
            var username = userInfo.userInfo.nickName;
            console.log(code);
            return AppService.login(code, userimg, username)

      }).then(res => {
          console.log('1112',res);

      }).catch(err => {
          console.log(err);
      }) 
  },
  onShareAppMessage: function(){
      return {
          title: '图吧同行',
          path: '/pages/index/index'
      }
  }
})
