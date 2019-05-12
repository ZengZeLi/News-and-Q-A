// pages/publishQuestion/publishQuestion.js
const app = getApp()
let qtitle,qdetail;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    psuccess:true,
    qtitle:qtitle,
    qdetail:qdetail
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  onClose() {
    this.setData({ show: false });
  },
  getTitle:function(e){
    this.setData({
      qtitle:e.detail
    })
  },
  getQDetail:function(e){
    this.setData({
      qdetail:e.detail
    })
  },
  publishQuestion: function(e){
    if(!this.data.qtitle){
      this.setData({
        show:true
      })
      return;
    }
    // console.log(app.globalData.userInfo)
    var info = JSON.parse(JSON.stringify(app.globalData.userInfo));
    var data = info;

    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;  
    var time = y+'-'+m+'-'+d;

    data.nickName = info.nickName;
    data.gender = info.gender;
    data.questionTitle = this.data.qtitle;
    data.questionContent = this.data.qdetail;
    data.views = 0;
    data.time = time;
    wx.request({
      url:'http://localhost:8090/publishQuestion',
      method:'post',
      data:data,
      success:res=>{
        this.setData({
          psuccess:false
        });
        setTimeout(function(){
          // wx.navigateBack({
            
          // })
          wx.switchTab({
            url:'../forum/forum'
          })
        },1000)
        
      }
    })
   
    setTimeout(function () {
      wx.switchTab({
        url: '../forum/forum',
        success:function(e){
          getCurrentPages().pop().onLoad();
        }
      })
    }, 1000)
  }
})