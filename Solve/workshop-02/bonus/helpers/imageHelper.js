var gm = require('gm').subClass({imageMagick: true});
var async = require('async');
var utils = require('../libs/utils');

var ImageHelper = function() {
  var self = this;
    
  self.multiReize = function(files, path, width, callback) {
    var resize = function(file, callback) {
      self.resize(file, path, width, function(err, result) {
        callback(err, result);
      });
    };
        
    async.map(files, async.reflect(resize), function(err, results) {
      callback(err, results);
    });
  };
    
  self.resize = function(pathFile, dest, width, callback) {
    var fileName = pathFile.substr(pathFile.lastIndexOf('/') + 1);
    var newPath = dest + fileName.split('.')[0];
    var newPathFile = newPath  + '/w' + width + '_' + fileName;
                
    async.waterfall([
      function(callback) {
        utils.createDir(newPath, function() {
          callback(null);
        });
      },
      function(callback) {
        self.getSize(pathFile, function(error, file, size) {
          callback(error, file, size);
        });
      },
      function(file, size, callback) {
        var height = Math.round(width / size.aspect);
        file.resize(width, height).write(newPathFile, function(err) {
          if (err) {
            callback(err, null);
          } else {
            callback(err, newPathFile);
          }
        });
      }
    ], function(error, result) {
      callback(error, result);
    });
  };
    
  self.getSize = function(path, callback) {
    gm(path).size(function (err, values) {
      if (err) {
        return callback(err, null);
      }
      var file = this;
      var aspect = (values.width / values.height);
      var size = {
        aspect: aspect,
        width: values.width,
        height: values.height
      };
            
      callback(null, file, size);
    });
  };
    
  self.saveFile = function(file, path, callback) {
    file.write(path, function(err) {
      if (err) {
        callback(null);
      } else {
        callback(err);
      }
    });
  };
};

module.exports = new ImageHelper();