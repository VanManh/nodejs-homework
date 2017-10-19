var http = require('http');
var fs = require('fs');
var async = require('async');
var utils = require('../libs/utils');

var DownloadHelper = function() {
  var self = this;
    
  self.multiDownload = function(urls, path, callback) {
    var download = function(url, callback) {
      self.download(url, path, function(err, result) {
        callback(err, result);
      });
    };
        
    async.map(urls, async.reflect(download), function(err, results) {
      callback(err, results);
    });
  };
    
  self.download = function(url, path, callback) {
    var pathFile = path + url.substr(url.lastIndexOf('/') + 1);
        
    async.waterfall([
      function(callback) {
        utils.createDir(path, function(error) {
          if (error) {
            return callback(error, null);
          }
                    
          callback(null, path);
        });
      },
      function(path, callback) {
        http.get(url, function(response) {
          if (response.statusCode == 200) {
            callback(null, response);
          } else {
            var error = new Error('Can not load this url: ' + url);
            callback(error, null);
          }
        });
      },
      function(data, callback) {
        var file = fs.createWriteStream(pathFile);
        self.saveFile(file, data, function(error) {
          if (error) {
            return callback(error, null);
          }
                   
          callback(null, pathFile);
        });
      }
    ], function(error, result) {
      callback(error, result);
    });
  };
    
  this.saveFile = function(file, data, callback) {
    data.pipe(file);
                        
    file.on('finish', function() {
      file.close(callback);
    });
        
    file.on('error', callback);
  };
};

module.exports = new DownloadHelper();