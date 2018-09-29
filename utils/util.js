function convertToStarsArray(stars) {
  var num = stars.substring(0,1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}

function http(url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'Content-Type': 'application/xml'
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (res) {
      console.log(res);
    }
  })
}

function convertToCastString(casts) {
  var castStr = '';
  for (var idx in casts) {
    castStr = castStr + casts[idx].name + " / ";
  }
  return castStr.substring(0, castStr.length - 2);
}

function convertToCastInfos(casts) {
  var castArray = [];
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : '',
      name: casts[idx].name,
    }
    castArray.push(cast);
  }
  return castArray;
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos,
}