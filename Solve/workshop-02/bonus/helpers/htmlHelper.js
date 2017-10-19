var cheerio = require('cheerio');
var request = require('request');
var async = require('async');
var url = require('url');

var HtmlHelper = function() {
  var self = this;
    
  self.loadHTML = function(url, callback) {
    request.get(url, function(err, response, body) {
      if (err) {
        return callback(err, null);
      }
           
      callback(null, body);
    });
  };
    
  self.getImageUrl = function(requestURL, callback) {
    var hostname = url.parse(requestURL).hostname;
    async.waterfall([
      function(callback) {
        self.loadHTML(requestURL, function(err, html) {
          if (err) {
            return callback(err, null);
          }
                    
          var htmlObject = cheerio.load(html);
          callback(null, htmlObject);
        });    
      },
      function($, callback) {
        var images = $('img');
        var getImageSrc = function(image, callback) {
          var img = $(image);
          self.getImageSrc(img, function(src) {
            callback(null, src);
          });
        };
        async.map(images, async.reflect(getImageSrc), function(err, results) {
          console.log(results);
          callback(err, results);
        });
      },
      function(list, callback) {
        var urls = [];
        for (var i in list) {
          var item = list[i];
          var isURL = url.parse(item.value).hostname;
          if (!isURL) {
            item.value = 'http://' + hostname + item.value;
          }
                    
          urls.push(item.value);
        }
                
        callback(null, urls);
      }
    ], function(err, result) {
      callback(err, result);
    });
  };
    
  self.getImageSrc = function(img, callback) {
    var src = img.attr('src');
    callback(src);
  };
};

module.exports = new HtmlHelper();