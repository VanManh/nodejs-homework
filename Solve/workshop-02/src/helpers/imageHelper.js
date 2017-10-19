var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});

var ImageHelper = function() {
    var self = this;
    
    self.widths = [];
    self.dest = '';
    
    self.createDir = function(dir) {
        return new Promise(function(resolve, reject) {
            try {
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
                resolve();
            } catch (error) {
                reject(error);
            }
            
        })
    }
    
    self.getAllFiles = function(dir) {
      return new Promise(function(resolve, reject) {
        fs.readdir(dir, function(error, files) {
          if (error) {
            reject(error);
          } else {
            resolve(files);
          }
        })
      });
    }
    
    this.handleResizeImage = function(fileName, pathFile, destFile) {
      return new Promise(function(resolve, reject) {
        gm(pathFile).size(function (err, values) {
            if (err) {
              reject('Error identifying file size:' + err)
            } else {
              var aspect = (values.width / values.height)
              var promises = [];
              for (var i in self.widths) {
                var width = self.widths[i];
                var height = Math.round(width / aspect);
                var newPathFile = self.dest + 'w' + width + '_' + fileName;
                var promise = self.resizeImage(this, width, height, newPathFile);
                promises.push(promise);
              }
    
              
              Promise.all(promises)
              .then(function(results) {
                var data = {
                  original: pathFile,
                  new_files: results
                }
                resolve(data);
              }).catch(reject);
            }
          })
      });
    }
    
    this.resizeImage = function(file, width, height, pathFile) {
      return new Promise(function(resolve, reject) {
        file.resize(width, height).write(pathFile, function(err) {
          var data = {success: true, error: null, width: width, height: height, path: pathFile}
          if (err) {
            data.success = false;
            data.error = err;
            resolve(data)
          } else {
            resolve(data);
          }
        })
      })
    }

}

module.exports = new ImageHelper();