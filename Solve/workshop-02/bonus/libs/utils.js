var mkdirp = require('mkdirp');

module.exports = {
  randomString: function(number) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        
    for (var i = 0; i < number; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
        
    return text;
  },
  createDir: function(dir, callback) {
    mkdirp(dir, function (err) {
      if (err) {
        callback(err);
      } else {
        callback();
      }
    });
  }
};
