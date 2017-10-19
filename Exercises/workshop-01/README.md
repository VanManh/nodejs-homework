# workshop-01
## Bài tập số 1
Bạn hãy sửa đoạn code phía dưới in ra kết quả đúng
```javascript
var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (var i = 0; i < list.length; i++) {
    var number = list[i];
    getTypeOfNumber(number, function(type) {
        console.log("The number "+ number +" is " + type);
    });
}

function getTypeOfNumber(number, callback) {
    setTimeout(function() {
        var type = (number % 2) ? "even" : "odd";
        callback(type);
    }, 100);
}
```

---
## Bài tập số 2
Đoạn Code phía dưới đang gặp vấn đề
- folder images không tồn tại, hãy tạo folder bằng code
- "throw er; // Unhandled 'error' event"
- Bị lỗi bất đồng bộ khi ghi log
- Ðang bị tình trạng callback hell
Vui lòng xử lý chúng

```javascript
var http = require('http');
var fs = require('fs');
 
var urls = [
    'http://www.planwallpaper.com/static/cache/bf/7c/bf7c742e96dd0452aa42677ecb1c90d6.jpg',
    'http://www.planwallpaper.com/static/cache/ad/14/ad14b19481081657f6028fbeb7566bfa.jpg',
    'http://www.planwallpaper.com/static/cache/7c/8b/7c8bcdf118ef10e348acb5c11bced5fa.jpg'
];

console.log('Download started');

for (var i = 0; i < urls.length; i++) {
    var url = urls[i];
    var file_name = "./images/" + url.substr(url.lastIndexOf('/') + 1);
    var file = fs.createWriteStream(file_name);
    http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(function() {
                console.log("Download success : ", url);
            });
        });
    });
}

console.log('Download finished');
```

---
## Bài tập số 3
Đoạn Code phía dưới đang gặp vấn đề
- folder new_images không tồn tại, hãy tạo folder bằng code
- Ðang bị tình trạng callback hell
- Hãy dùng Promise để xử lý bất đồng bộ và callback hell
Vui lòng xử lý chúng

```javascript
var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});

var source = "./images/";
var dest = "./new_images/";

var widths = [100, 300, 400];

fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function (err, values) {
        if (err) {
          console.log('Error identifying file size: ' + err)
        } else {
          console.log(filename + ' : ' + values)
          var aspect = (values.width / values.height)
          widths.forEach(function (width, widthIndex) {
            var height = Math.round(width / aspect)
            console.log('resizing ' + filename + 'to ' + height + 'x' + height)
            this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})
```
