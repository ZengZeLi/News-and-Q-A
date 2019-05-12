// pages/forum/forum.js

let apiData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apiData:apiData,
    scrollTop:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   wx.request({
     url:'http://localhost:8090/loadQuestion',
     method:'get',
     success:res=>{
       this.setData({
         apiData:res.data
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

  },

  goDetail: function(e){
    let _id = e.currentTarget.dataset.id;
    let questionTitle = e.currentTarget.dataset.title;
    wx.navigateTo({
      // url: '../questionDetail/questionDetail?newsUrl=' + newsUrl
      // url: '../questionDetail/questionDetail?_id=' + _id +'&questionTitle='+questionTitle
      url:'../questionDetail/questionDetail?_id='+_id
    })
  },
  goAsk:function(e){
    wx.navigateTo({
      url:'../publishQuestion/publishQuestion'
    })
  }
})