var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');


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
  if( req.method === "GET" && req.url === '/') {
    fs.readFile(archive.paths.siteAssets + '/index.html', function (err, data) {
      if (err) throw err;
      var chunk = '';
      chunk += data;
      // console.log("chunk");
       res.end(chunk);
    });
  }

  if (req.method === "GET" && req.url.indexOf('www') !== -1) {
        fs.readFile(archive.paths.archivedSites + '/' + req.url, function(err, data) {
          if(err) throw err;
          var chunk = '';
          chunk += data;

          res.end(chunk);
        });
  }



};
