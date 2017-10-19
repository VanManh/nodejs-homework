var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});

var ImageHelper = function() {
  var self = this;
    
  var createDir = function(dir) {
    return new Promise(function(resolve, reject) {
      try {
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
        resolve();
      } catch (error) {
        reject(error);
      }
          
    });
  };
  
  var getAllFiles = function(dir) {
    return new Promise(function(resolve, reject) {
      fs.readdir(dir, function(error, files) {
        if (error) {
          reject(error);
        } else {
          resolve(files);
        }
      });
    });
  };

  var handleResizeImage = function(fileName, pathFile, destFile, widths) {
    return new Promise(function(resolve, reject) {
      gm(pathFile).size(function (err, values) {
        if (err) {
          reject('Error identifying file size:' + err);
        } else {
          var aspect = (values.width / values.height);
          var promises = [];
          for (var i in widths) {
            var width = widths[i];
            var height = Math.round(width / aspect);
            var newPathFile = destFile + 'w' + width + '_' + fileName;
            var promise = resizeImage(this, width, height, newPathFile);
            promises.push(promise);
          }
  
          
          Promise.all(promises)
            .then(function(results) {
              var data = {
                original: pathFile,
                new_files: results
              };
              resolve(data);
            }).catch(reject);
        }
      });
    });
  };
  
  var resizeImage = function(file, width, height, pathFile) {
    return new Promise(function(resolve) {
      file.resize(width, height).write(pathFile, function(err) {
        var data = {success: true, error: null, width: width, height: height, path: pathFile};
        if (err) {
          data.success = false;
          data.error = err;
          resolve(data);
        } else {
          resolve(data);
        }
      });
    });
  };
  self.resizeImageProcess = function(source, dest, widths) {
    //console.log('Starting resize images');

    createDir(source)
      .then(function() {
        return createDir(dest);
      })
      .then(function() {
        return getAllFiles(source);
      })
      .then(function(files) {
        var promises = [];
        for (var i in files) {
          var file = files[i];
          var pathFile = source + file;
          var promise = handleResizeImage(file, pathFile, dest,widths);
          promises.push(promise);
        }
      
        return Promise.all(promises);
      })
      .then(function(results) {
        for (var i in results) {
          var result = results[i];
          //console.log('Resize file:', result.original);
          for (var j in result.new_files) {
            var new_file = result.new_files[j];
            if (new_file.success) {
              //console.log('Resized to', new_file.width, 'x', new_file.height, ':', new_file.path);
            } else {
              //console.log('Can not resize to', new_file.width, 'x', new_file.height, ':', new_file.path);
            }
              
          }
        }
    
        //console.log('Finished resize');
      })
      .catch(function(error) {
        return error;
      });

  };
};

module.exports = ImageHelper;
