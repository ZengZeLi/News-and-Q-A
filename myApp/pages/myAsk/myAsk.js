// pages/myAsk/myAsk.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    myAsk:'',
    show:false,
    myAskLength:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var arr = ['#f60','#89cff0'];
    
    this.setData({
      userInfo:JSON.parse(JSON.stringify(app.globalData.userInfo))
    });
    
    wx.request({
      url:"http://localhost:8090/loadMyAsk",
      method:'post',
      data:this.data.userInfo,
      success:res=>{
        this.setData({
          myAsk:res.data,
          show:true,
          myAskLength:res.data.length
        })
        console.log(this.data.myAsk)
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
  goDetail:function(e){
    let _id = e.currentTarget.dataset.id;
    console.log(e)
    let questionTitle = e.currentTarget.dataset.title;

    wx.navigateTo({
      // url: '../questionDetail/questionDetail?newsUrl=' + newsUrl
      // url: '../questionDetail/questionDetail?_id=' + _id +'&questionTitle='+questionTitle
      url: '../questionDetail/questionDetail?_id=' + _id
    })
  },
  toPublish:function(e){
    wx.navigateTo({
      url: '../publishQuestion/publishQuestion',
    })
  }
})