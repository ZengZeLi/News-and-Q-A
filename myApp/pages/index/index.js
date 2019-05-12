//index.js
const app = getApp();
// my appkey
const appKey = '58233335a6af5d536f074280fcbf6caa';
// const appKey = 'fc35d7872c25744ab4669c7d9dbcf15e';
 //用于访问新闻接口的appKey

let contentNewsList;
let newsType = 'top';
let indexIsHidden;
let topPic = [
  { url: '', ID: '1' ,newsurl:''},
  { url: '', ID: '2', newsurl: ''},
  { url: '', ID: '3', newsurl: ''},
  { url: '', ID: '4', newsurl: ''}
];

Page({
  data: {
    indicatorDots: true,
    indicatorColor:"white",
    autoplay: true,
    interval: 4000,
    duration: 1000,
    previousMargin:'50rpx',
    headerTitleName: [
      { name: '头条', nameID: '201701', newsType: 'top' },
      { name: '军事', nameID: '201702', newsType: 'junshi' },
      { name: '体育', nameID: '201703', newsType: 'tiyu' },
      { name: '科技', nameID: '201704', newsType: 'keji' },
      { name: '财经', nameID: '201705', newsType: 'caijing' },
      { name: '社会', nameID: '201706', newsType: 'shehui' },
      { name: '时尚', nameID: '201707', newsType: 'shishang' },
      { name: '娱乐', nameID: '201708', newsType: 'yule' },
      { name: '国内', nameID: '201709', newsType: 'guonei' },
      { name: '国际', nameID: '2017010', newsType: 'guoji' },
    ],
    topPic:topPic,
    tapID: 201701, 
    contentNewsList: contentNewsList,
    indexIsHidden: indexIsHidden
  },
  newsType:'top',
  changetab:function(e){
    let _this = this;
    let nameid;
    
    switch(e.detail.index){
      case 0:{
        newsType = 'top';
        nameid = '201701';
        break;
      }
      case 1:{
        newsType = 'junshi';
        nameid = '201702';
        break;
      }
      case 2:{
        newsType = 'tiyu';
        nameid = '201703';
        break;
      }
      case 3:{
        newsType = 'keji';
        nameid = '201704';
        break;
      }
      case 4: {
        newsType = 'caijing';
        nameid = '201705';
        break;
      }
      case 5: {
        newsType = 'shehui';
        nameid = '201706';
        break;
      }
      case 6: {
        newsType = 'shishang';
        nameid = '201707';
        break;
      }
      case 7: {
        newsType = 'yule';
        nameid = '201708';
        break;
      }
      case 8: {
        newsType = 'guonei';
        nameid = '201709';
        break;
      }
      case 9: {
        newsType = 'guoji';
        nameid = '2017010';
        break;
      }
    }
    _this.setData({
      tapID:nameid,
      indexIsHidden: false
    })
    wx.request({
      url: 'https://v.juhe.cn/toutiao/index?type=' + newsType + '&key=' + appKey,
      data:{},
      method:'GET',
      success: res => {
        let resultData = res.data.result.data;
        let editTimeArray = new Array();
        var editTime;
        for (let i = 0; i < resultData.length; i++) {
          let nowTime = new Date();
          let editDay = resultData[i].date.split(' ')[0].split('-')[2];
          let editHour = resultData[i].date.split(' ')[1].split(':')[0];
          let editMinute = resultData[i].date.split(' ')[1].split(':')[1];
          let nowDay = nowTime.getDate();
          if (nowDay < 10) nowDay = (Array(2).join(0) + nowDay).slice(-2);
          let nowHour = nowTime.getHours();
          let nowMinute = nowTime.getMinutes();
          let hourInterval = nowHour - editHour;
          let minteinterval = nowMinute - editMinute;

          if (editDay == nowDay) {
            if (hourInterval > 1) {
              editTime = hourInterval + '小时前';
            } else if (hourInterval = 1 && minteinterval < 0) {
              editTime = minteinterval + 60 + '分钟前';
            } else {
              editTime = minteinterval + '分钟前';
            }
          } else {
            nowHour += 24;
            hourInterval = nowHour - editHour;
            if (hourInterval > 1) {
              editTime = hourInterval + '小时前';
            } else if (hourInterval = 1 && minteinterval < 0) {
              editTime = minteinterval + 60 + '分钟前';
            } else {
              editTime = '1小时前';
            }
          }
          resultData[i].date = editTime;
        }

        //获取头部轮播图片
        for (let n = 0; n < 4; ++n) {
          let ranNum = Math.floor(Math.random() * 30);
          if (resultData[ranNum].thumbnail_pic_s03 == undefined) {
            topPic[n].url = resultData[ranNum].thumbnail_pic_s;
            topPic[n].newsurl = resultData[ranNum].url;
          } else {
            topPic[n].url = resultData[ranNum].thumbnail_pic_s03;
            topPic[n].newsurl = resultData[ranNum].url;
          }
        }

        _this.setData({
          contentNewsList: resultData,
          indexIsHidden: true,
          topPic: topPic
        })

      },
    })
  },
  swiperlink1:function(e){
    let newsUrl = topPic[0].newsurl;
    wx.navigateTo({
      url: '../newsDetail/newsDetail?newsUrl=' + newsUrl
    })
  },
  swiperlink2: function (e) {
    let newsUrl = topPic[1].newsurl;
    wx.navigateTo({
      url: '../newsDetail/newsDetail?newsUrl=' + newsUrl
    })
  },
  swiperlink3: function (e) {
    let newsUrl = topPic[2].newsurl;
    wx.navigateTo({
      url: '../newsDetail/newsDetail?newsUrl=' + newsUrl
    })
  },
  swiperlink4: function (e) {
    let newsUrl = topPic[3].newsurl;
    wx.navigateTo({
      url: '../newsDetail/newsDetail?newsUrl=' + newsUrl
    })
  },
  viewDetail:function(e){
    let newsUrl = e.currentTarget.dataset.newsurl;
    console.log(e.currentTarget.dataset.newsurl)
    wx.navigateTo({
      url:'../newsDetail/newsDetail?newsUrl='+newsUrl
    })
  },
  onLoad: function () {
    var _this = this;
    //请求头条数据
    wx.request({
      url: 'https://v.juhe.cn/toutiao/index?type=' + newsType + '&key=' + appKey,
      data: {},
      method: 'GET',
      success: res => {
        let resultData = res.data.result.data;
        let editTimeArray = new Array();
        var editTime;
        for (let i = 0; i < resultData.length; i++) {
          let nowTime = new Date();
          let editDay = resultData[i].date.split(' ')[0].split('-')[2];
          let editHour = resultData[i].date.split(' ')[1].split(':')[0];
          let editMinute = resultData[i].date.split(' ')[1].split(':')[1];
          let nowDay = nowTime.getDate();
          if (nowDay < 10) nowDay = (Array(2).join(0) + nowDay).slice(-2);
          let nowHour = nowTime.getHours();
          let nowMinute = nowTime.getMinutes();
          let hourInterval = nowHour - editHour;
          let minteinterval = nowMinute - editMinute;
          if (editDay == nowDay) {
            if (hourInterval > 1) {
              editTime = hourInterval + '小时前';
            } else if (hourInterval = 1 && minteinterval < 0) {
              editTime = minteinterval + 60 + '分钟前';
            } else {
              editTime = minteinterval + '分钟前';
            }
          } else {
            nowHour += 24;
            hourInterval = nowHour - editHour;
            if (hourInterval > 1) {
              editTime = hourInterval + '小时前';
            } else if (hourInterval = 1 && minteinterval < 0) {
              editTime = minteinterval + 60 + '分钟前';
            } else {
              editTime = '1小时前';
            }
          }
          resultData[i].date = editTime;
        }

        //获取头部轮播图片(未去重)，图片有可能重复
        for (let n = 0; n < 4; ++n) {
          let ranNum = Math.floor(Math.random() * 30);
          if (resultData[ranNum].thumbnail_pic_s03 == undefined) {
            topPic[n].url = resultData[ranNum].thumbnail_pic_s;
            topPic[n].newsurl = resultData[ranNum].url;
          } else {
            topPic[n].url = resultData[ranNum].thumbnail_pic_s03;
            topPic[n].newsurl = resultData[ranNum].url;
          }
        }
        _this.setData({
          contentNewsList: resultData,
          indexIsHidden: true,
          topPic: topPic
        })

      },
      fail: error => {

      },
      complete: () => {

      }
    })
  },
})