// pages/movies/movie.js
var app = getApp();
var util = require('../../utils/util.js'); // 只能相对路径

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // inTheaters: {},
    // comingSoon: {},
    // top250: {},
  },

  toMore: function(event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  },

  toDetailTap: function(event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inTheatersUrl = app.globalData.g_doubanBase + 'v2/movie/in_theaters?count=3&start=0';
    var comingSoonUrl = app.globalData.g_doubanBase + 'v2/movie/coming_soon?count=3&start=0';
    var top250Url = app.globalData.g_doubanBase + 'v2/movie/top250?count=3&start=0';

    this.getMovieListData(inTheatersUrl, '正在热映', 'inTheaters');
    this.getMovieListData(comingSoonUrl, '即将上映', 'comingSoon');
    this.getMovieListData(top250Url, '豆瓣Top250', 'top250');
  },

  getMovieListData: function(url, categoryTitle, settedKey) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': 'application/xml'
      },
      success: function(res) {
        console.log(res);
        that.pressDoubanData(res.data, categoryTitle, settedKey);
      },
      fail: function(res) {
        console.log(res);
      }
    })
  },

  pressDoubanData: function(moviesDouban, categoryTitle, settedKey) {
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

    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
  },
})