var async = require('async');
var downloadHelper =  require('./helpers/downloadHelper');
var imagehHelper =  require('./helpers/imageHelper');
var htmlHelper =  require('./helpers/htmlHelper');

var url = 'http://www.planwallpaper.com/cool-background';

var source = './images/';
var dest = './new_images/';
var widths = [100, 300, 400];

async.waterfall([
  function(callback) {
    htmlHelper.getImageUrl(url, function(err, urls) {
      callback(err, urls);
    });
  },
  function(urls, callback) {
    downloadHelper.multiDownload(urls, source, function(err, results) {
      console.log(results);
      callback(err, results);
    });
  },
  function(results, callback) {
    var files = [];
    for (var i in results) {
      var result = results[i];
            
      if (result.value) {
        files.push(result.value);
      }
    }
        
    var resize = function(width, callback) {
      imagehHelper.multiReize(files, dest, width,function(err, results) {
        callback(err, results);
      });
    };
        
    async.map(widths, async.reflect(resize), function(err, results) {
      callback(err, results);
    });

  }
], function(err, result) {
  if (err) {
    console.error(err);
  }
    
  console.log(result);
});
