var http = require('http');
var fs = require('fs');

class DownloadHelper {
    constructor() {
        
    }
    
    createDir(dir) {
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
    
    downloadImage(dir, url) {
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
                            data.url = file_name;
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

}

module.exports = new DownloadHelper();