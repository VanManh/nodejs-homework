var ImageHelper    = require('./imageHelper');
var DownLoadHelper = require('./downloadHelper');


var urls        = [
  'http://www.planwallpaper.com/static/cache/bf/7c/bf7c742e96dd0452aa42677ecb1c90d6.jpg',
  'http://www.planwallpaper.com/static/cache/ad/14/ad14b19481081657f6028fbeb7566bfa.jpg',
  'http://www.planwallpaper.com/static/cache/7c/8b/7c8bcdf118ef10e348acb5c11bced5fa.jpg'
];

var source      = './images/';
var dest        = './new_images/';
var widths      = [100, 300, 400];

var Download    = new DownLoadHelper();
var Image = new ImageHelper();

var download = Download.downloadImageProcess(urls,source);

download.then(function() {
  Image.resizeImageProcess(source, dest, widths);
});
