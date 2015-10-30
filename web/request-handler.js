var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var request = require("request");


var defaultCorsHeaders = {
 "access-control-allow-origin": "*",
 "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
 "access-control-allow-head ers": "content-type, accept",
 "access-control-max-age": 10,
 "Content-Type": "text/html"
};





exports.handleRequest = function (req, res) {
  var statusCode = 200;
  res.writeHead(statusCode, defaultCorsHeaders);

  if(req.method === "GET") {
   if(req.url === '/') {
      archive.readFile(archive.paths.siteAssets + '/index.html',res);
    }

    else if (req.url.indexOf('www') !== -1) {
      archive.readFile(archive.paths.archivedSites + '/' + req.url,res);
    }

    else if(req.url.indexOf('www') === -1) {
      res.writeHead(404, defaultCorsHeaders);
      res.end();
    }
  }

  if(req.method === "POST") {
    var chunk = '';
    res.writeHead(302, defaultCorsHeaders);
    req.on('data', function(data) {
      chunk += data;
      console.log("chunk: " + chunk);
      var url = chunk.split('=')[1];
      archive.isUrlInList(url, function(exist){
        if(!exist) {
          archive.addUrlToList(url, function(){
            archive.downloadUrls(url);
          });

        }

      });
    });
    req.on('end', function() {
      res.end();
    });
  }

//{Location: archive.paths.siteAssets + '/loading.html'}

};
