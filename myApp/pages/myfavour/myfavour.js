// pages/myfavour/myfavour.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    myFavour:'',
    show:false,
    myFavourLength:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:JSON.parse(JSON.stringify(app.globalData.userInfo)),
    }),
    wx.request({
      url:'http://localhost:8090/loadMyFavour',
      method:'post',
      data:this.data.userInfo,
      success:res=>{
        this.setData({
          myFavour:res.data,
          show:true,
          myFavourLength:res.data.length
        })
        if(this.data.myFavour.length === 0){
          this.setData({
            show:false
          })
        }
        console.log(this.data.myFavour.length)
      }
    }),
    wx.request({
      
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
  goDetail: function (e) {
    let _id = e.currentTarget.dataset.id;
    let questionTitle = e.currentTarget.dataset.title;

    wx.navigateTo({
      // url: '../questionDetail/questionDetail?newsUrl=' + newsUrl
      // url: '../questionDetail/questionDetail?_id=' + _id +'&questionTitle='+questionTitle
      url: '../questionDetail/questionDetail?_id=' + _id
    })
  },
  toPublish: function (e) {
    wx.navigateTo({
      url: '../publishQuestion/publishQuestion',
    })
  }
})