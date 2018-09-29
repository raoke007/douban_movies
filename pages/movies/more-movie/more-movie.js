var app = getApp();
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryTitle: '',
    movies: [],
    doubanUrl: '',
    totalCount: 0,
    isEmpty: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var category = options.category;
    this.data.categoryTitle = category;

    var dataUrl = '';
    switch (category) {
      case '正在热映':
        dataUrl = app.globalData.g_doubanBase + 'v2/movie/in_theaters';
        break;
      case '即将上映':
        dataUrl = app.globalData.g_doubanBase + 'v2/movie/coming_soon';
        break;
      case '豆瓣Top250':
        dataUrl = app.globalData.g_doubanBase + 'v2/movie/top250';
        break;
    }
    this.data.doubanUrl = dataUrl;
    util.http(dataUrl, this.pressDoubanData);
  },


  pressDoubanData: function(moviesDouban) {
    var movies = [];
    for (var index in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[index];
      var title = subject.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars),
      }
      movies.push(temp);
    }

    var totalMovies = {};
    if (this.data.isEmpty) {
      totalMovies = movies;
      this.data.isEmpty = false;
    } else {
      totalMovies = this.data.movies.concat(movies);
      this.data.totalCount += 20;
    }
    this.setData({
      movies: totalMovies
    });
    wx.hideNavigationBarLoading();
  },


  lower: function() {
    var nextUrl = this.data.doubanUrl + '?start=' + this.data.totalCount + '&count=20';
    util.http(nextUrl, this.pressDoubanData);
    wx.showNavigationBarLoading();
  },

  onPullDownRefresh: function() {
    var refreshUrl = this.data.doubanUrl + '?start=0&count=20';
    this.data.movies = {};
    this.data.isEmpty = true;
    util.http(refreshUrl, this.pressDoubanData);
    wx.showNavigationBarLoading();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.categoryTitle,
    })
  },
})