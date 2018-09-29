var util = require('../../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var movieId = options.id;
    var detailUrl = app.globalData.g_doubanBase + 'v2/movie/subject/' + movieId;
    util.http(detailUrl, this.processDoubanData);
  },

  processDoubanData: function(data) {
    console.log(data);
    var director = {
      avatar: '',
      name: '',
      id: '',
    }
    if (data.directors.length != 0) {
      director.avatar = data.directors[0].avatars.large,
      director.name = data.directors[0].name,
      director.id = data.directors[0].id
    }

    var movie = {
      director: director,
      country: data.countries[0],
      movieImg: data.images ? data.images.large : '',
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      genres: data.genres.join('、'),
      stars: util.convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      summary: data.summary,
      cast: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
    }

    console.log(movie);
    this.setData({
      movie: movie,
    })
  },
})