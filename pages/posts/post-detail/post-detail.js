var postData = require('../../../data/posts-data.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPostId: '',
    isPlayingMusic: false,
  },

  /**
   * 🎵音乐播放
   */
  playMusicTap: function() {
    var g_isPlayingMusic = app.globalData.g_isPlayingMusic;
    if (g_isPlayingMusic) {
      wx.pauseBackgroundAudio();
    } else {
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46',
        title: '此时此刻',
        coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      });
    }
    //切换图标
    this.setData({
      isPlayingMusic: !g_isPlayingMusic,
    });
    app.globalData.g_isPlayingMusic = !g_isPlayingMusic;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var g_isPlayingMusic = app.globalData.g_isPlayingMusic;
    if (g_isPlayingMusic) {
      this.setData({
        isPlayingMusic: g_isPlayingMusic,
      })
    }

    // console.log(options.postId);
    var postId = options.postId;
    var postDetail = postData.postList[postId];
    this.setData({
      postDetail: postDetail,
      currentPostId: postId,
    });

    //把收藏事件判断标记放入到缓存中，模拟数据库操作
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      if (postCollected) {
        this.setData({
          collected: postCollected,
        });
      } else {
        postsCollected[postId] = false;
        wx.setStorageSync('posts_collected', postsCollected);
      }
    } else {
      postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
  },

  collectTap: function(event) {
    // wx.clearStorageSync();
    console.log(this.data.currentPostId);
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected,
    });

    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 1000,
    });
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