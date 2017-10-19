var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});

var source = "./images/";
var dest = "./new_images/";

var widths = [100, 300, 400];

console.log("Starting resize images");
console.log("------------------------------------------------------------------------------------------------------\n");

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
    var pathFile = source + file
    var promise = handleResizeImage(file, pathFile, dest);
    promises.push(promise);
  }
  
  return Promise.all(promises);
})
.then(function(results) {
  for (var i in results) {
        var result = results[i];
        console.log("Resize file:", result.original);
        console.log("------------------------------------------------------------------------------------------------------");
        for (var j in result.new_files) {
          var new_file = result.new_files[j]
          if (new_file.success) {
            console.log("Resized to", new_file.width, 'x', new_file.height, ':', new_file.path);
          } else {
            console.log("Can not resize to", new_file.width, 'x', new_file.height, ':', new_file.path);
          }
          
        }
        console.log("------------------------------------------------------------------------------------------------------\n");
    }

    console.log('Finished resize');
})
.catch(function(error) {
  console.error(error);
});

function createDir(dir) {
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

function getAllFiles(dir) {
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

function handleResizeImage(fileName, pathFile, destFile) {
  return new Promise(function(resolve, reject) {
    gm(pathFile).size(function (err, values) {
        if (err) {
          reject('Error identifying file size:' + err)
        } else {
          var aspect = (values.width / values.height)
          var promises = [];
          for (var i in widths) {
            var width = widths[i];
            var height = Math.round(width / aspect);
            var newPathFile = dest + 'w' + width + '_' + fileName;
            var promise = resizeImage(this, width, height, newPathFile);
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

function resizeImage(file, width, height, pathFile) {
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