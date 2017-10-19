var http = require('http');
var fs   = require('fs');
    
let self;

class DownloadHelper{

  constructor() {
    self = this;
  }
    
  createDirectory(dir) {
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
  }

  downloadImage(url, dir) {
    var file_name = dir + url.substr(url.lastIndexOf('/') + 1);
    var file = fs.createWriteStream(file_name);
        
    return new Promise(function(resolve, reject) {
      var data = { success: true, url: '' };
      http.get(url, function(response) {
        if (response.statusCode == 200) {
          response.pipe(file);
          file.on('finish', function() {
            file.close(function() {
              data.success = true;
              data.url = url;
              resolve(data);
            });
          });
                    
          file.on('error', reject);
        } else {
          data.success = false;
          data.url = url;
          resolve(data);
        }
      });
    });
  }
    
  downloadImageProcess(urls, dir) {
    //console.log('Download started');
        
    return self.createDirectory(dir).then(function() {
      var promises = [];
      for (var i = 0; i < urls.length; i++) {
        var url = urls[i];
        var promise = self.downloadImage(url, dir);
        promises.push(promise);
      }
            
      return Promise.all(promises);
        
    }).then(function(results) {
      for (var i in results) {
        var result = results[i];
        if (result.success) {
          //console.log('Download success : ', result.url);
        } else {
          //console.log('Download unsuccess : ', result.url);
        }
                
      } 
      //console.log('Download finished');
    }).catch(function(error) {
      return error;
    });
  }
	
}

module.exports = DownloadHelper;
