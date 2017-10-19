var http = require('http');
var fs = require('fs');
 
var urls = [
    'http://www.planwallpaper.com/static/cache/bf/7c/bf7c742e96dd0452aa42677ecb1c90d6.jpg',
    'http://www.planwallpaper.com/static/cache/ad/14/ad14b19481081657f6028fbeb7566bfa.jpg',
    'http://www.planwallpaper.com/static/cache/7c/8b/7c8bcdf118ef10e348acb5c11bced5fa.jpg'
];

var dir = './images/';

console.log('Download started');

createDirectory(dir).then(function() {
    var promises = [];
    
    for (var i = 0; i < urls.length; i++) {
        var url = urls[i];
        var promise = downloadImage(dir, url);
        promises.push(promise);
    }
    
    return Promise.all(promises);

}).then(function(results) {
    for (var i in results) {
        var result = results[i];
        if (result.success) {
            console.log("Download success : ", result.url);
        } else {
            console.log("Download unsuccess : ", result.url);
        }
        
    }

    console.log('Download finished');
}).catch(function(error) {
    console.error("Catch error: ", error);
});

function createDirectory(dir) {
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

function downloadImage(dir, url) {
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