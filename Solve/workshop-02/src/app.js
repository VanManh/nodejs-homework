var downloadHelper = require('./helpers/downloadHelper');
var imageHelper = require('./helpers/imageHelper');

var urls = [
  'http://www.planwallpaper.com/static/cache/bf/7c/bf7c742e96dd0452aa42677ecb1c90d6.jpg',
  'http://www.planwallpaper.com/static/cache/ad/14/ad14b19481081657f6028fbeb7566bfa.jpg',
  'http://www.planwallpaper.com/static/cache/7c/8b/7c8bcdf118ef10e348acb5c11bced5fa.jpg'
];

var source = './images/';
var dest = './new_images/';

var widths = [100, 300, 400];

console.log('Download started');

downloadHelper.createDir(source)
  .then(function() {
    return downloadHelper.createDir(dest);
  })
  .then(function() {
    var promises = [];
    
    for (var i = 0; i < urls.length; i++) {
      var url = urls[i];
      var promise = downloadHelper.downloadImage(source, url);
      promises.push(promise);
    }
    
    return Promise.all(promises);

  }).then(function(results) {
    imageHelper.widths = widths;
    imageHelper.dest = dest;
    
    var files = [];
    for (var i in results) {
      var result = results[i];
      if (result.success) {
        files.push(result.url);
      }
        
    }
    
    var promises = [];
    for (var i in files) {
      var file = files[i];
        
      var pathFile = file;
      var fileName = file.replace('./images/', '');
      var promise = imageHelper.handleResizeImage(fileName, pathFile, dest);
      promises.push(promise);
    }
      
    return Promise.all(promises);

  }).then(function(results) {
    for (var i in results) {
      var result = results[i];
      console.log('Resize file:', result.original);
      console.log('------------------------------------------------------------------------------------------------------');
      for (var j in result.new_files) {
        var new_file = result.new_files[j];
        if (new_file.success) {
          console.log('Resized to', new_file.width, 'x', new_file.height, ':', new_file.path);
        } else {
          console.log('Can not resize to', new_file.width, 'x', new_file.height, ':', new_file.path);
        }
          
      }
      console.log('------------------------------------------------------------------------------------------------------\n');
    }

    console.log('Finished resize');
  }).catch(function(error) {
    console.error('Catch error: ', error);
  });
