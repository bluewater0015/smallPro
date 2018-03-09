import Promise from '../vendor/bluebird.min.js';

function login(){
    return new Promise((resolve,reject) => {
        wx.login({
            success: function(res){
                resolve(res);
            },
            fail: function(err){
                reject(err)
            }
        })
    })
}
function getUserInfo(){
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err)
            }
        })
    })
}

module.exports = {
    login,
    getUserInfo
} 