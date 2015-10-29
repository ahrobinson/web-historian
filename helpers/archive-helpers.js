var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
exports.readFile = function(path,res) {
  return fs.readFile(path, function (err, data) {
      if (err) throw err;
      var chunk = '';
      chunk += data;
       res.end(chunk);
    });
};


exports.readListOfUrls = function(cb){

  fs.readFile(this.paths.list, function(err, data){
    var chunk = '';
    chunk += data;
    cb(chunk.split('\n'));
  });
};

exports.isUrlInList = function(url, cb){
  this.readListOfUrls(cb);

};

exports.addUrlToList = function(url, callback){
  if(!this.isUrlInList(url,callback)){
    fs.appendFile(this.paths.list, url);
  }
};

exports.isUrlArchived = function(url, callback){
  fs.readdir(this.paths.archivedSites, function(err, files){
    callback(files);
  });
};

exports.downloadUrls = function(){
};
