// pages/questionDetail/questionDetail.js
const app = getApp();
let userInfo;
let _id;
let questionTitle;
let question;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id:_id,
    userInfo:{},
    question:question,
    nickname:'',
    picheadurl:'',
    title:'',
    time:'',
    views:'',
    content:'',
    comment:'',
    commentContent: '',
    placeholder1:'友善的评论是交流的起点',
    show:false,
    psuccess:true,
    options:'',
    noComment:true,
    color:'',
    shoucang:'左滑收藏',
    addorno:'收藏'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userInfo = JSON.parse(JSON.stringify(app.globalData.userInfo));
    _id = options._id;
    console.log(options)
    this.setData({
      _id: _id,
      userInfo: userInfo
      // questionTitle:questionTitle
    })
    var favour;
    // 对favour操作则改变app.globalData.userInfo
    favour = JSON.parse(JSON.stringify(this.data.userInfo));
    favour.questionId = _id;

    questionTitle = options.questionTitle;
   
    //获取问题信息
    wx.request({
      url:"http://localhost:8090/findQuestion",
      method:'post',
      data:_id,
      success:res=>{
        question = res.data;
        this.setData({
          question:question,
          nickname:question[0].nickName,
          picheadurl: question[0].avatarUrl,
          title:question[0].questionTitle,
          views:question[0].views,
          time:question[0].time.slice(0,10),
          content:question[0].questionContent
        })
      }
    });
    //获取问题评论
    wx.request({
      url:"http://localhost:8090/getComment",
      method:'post',
      data:_id,
      success:res=>{
        console.log(res.data)
        if(res.data[0]){
          this.setData({
            comment: res.data
          })
        }else{
          this.setData({
            noComment:false
          })
        }
      }
    });
    //浏览量增加
    wx.request({
      url:"http://localhost:8090/addViews",
      method:'post',
      data:_id,
      success:res=>{
        console.log(res.data)
      }
    });
    //获取收藏信息
    console.log(favour);
    wx.request({
      url:'http://localhost:8090/checkFavour',
      method:'post',
      data:favour,
      success:res=>{
        if(res.data === 'ok'){
          this.setData({
            shoucang:'已收藏',
            addorno:'取消收藏'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {

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
  show:function(){
    console.log(question)
  },
  focusInput:function(){
    this.setData({
      placeholder1:'限200字'
    })
  },
  blurInput:function(){
    this.setData({
      placeholder1:'友善的评论是交流的起点'
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  getComment:function(e){
    // console.log(e.detail)
    this.setData({
      commentContent:e.detail
    })
  },
  publishComment:function(e){
    let comment = this.data.comment;
    if(!this.data.commentContent){
      this.setData({
        show:true
      })
      return;
    }
    var time = new Date();
    var month = time.getMonth()+1;

    var commentTime = time.getFullYear()+'-'+month+'-'+time.getDate()+'  '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
    var info = app.globalData.userInfo;
    var data= info;
    data.light=0;
    data.questionId = this.data._id;
    data.commentContent = this.data.commentContent;
    data.commentTime = commentTime;
    wx.request({
      url:'http://localhost:8090/publishComment',
      method:'post',
      data:data,
      success:res=>{
        wx.showToast({
          title: '发表成功',
          icon: 'success',
          duration: 1000
        })
        comment = res.data;
        this.setData({
          comment:comment,
          commentContent:'',
          noComment: true
        })
        console.log(this.data.noComment)
      }
    })
  },
  light:function(e){
    let comment = this.data.comment;
    var commentId = e.currentTarget.dataset.id;
    wx.request({
      url:'http://localhost:8090/addLight',
      method:'post',
      data:commentId,
      success:res=>{
        console.log(res)
      }
    })
    for (var i = 0; i < comment.length; i++) {
      if (comment[i]._id === commentId) {
        comment[i].light = comment[i].light + 1;
      }
    }
    this.setData({
      comment: comment
    })
  },
  addMyFavour:function(){
    let data = this.data.userInfo;
    data.questionId = this.data._id;
    if(this.data.shoucang === '左滑收藏'){
      this.setData({
        shoucang:'已收藏',
        addorno:'取消收藏'
      })
      wx.request({
        url:'http://localhost:8090/addMyFavour',
        method:'post',
        data:data,
        success:res=>{
          console.log(res)
        }
      })
    }else if(this.data.shoucang === '已收藏'){
      this.setData({
        shoucang:'左滑收藏',
        addorno:'收藏'
      })
      wx.request({
        url:'http://localhost:8090/removeFavour',
        method:'post',
        data:data,
        success:res=>{
          console.log(res)
        }
      })
    }
   
    console.log(data)
  
  }
})