var url = require('url');
var fs = require('fs');

var homePage;

exports.init = function(version, debug, cb) {
  fs.readFile('pages/home.html', 'utf8', function(err, doc) {
    if (err) throw err;
    homePage = doc.replace("VERSION", version);
    homePage = homePage.replace("DEBUG", debug);
    cb();
  });
};

function error(req, res, err) {
  console.log(err.message);
  res.statusCode = 500;
  res.end(err.message);
}

exports.redirectHome = function(req, res) {
  res.writeHead(302, {
    'Location': '/home?' + Math.random()
  });
  res.end();
};

exports.handle = function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': homePage.length,
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache, no-store'
  });
  res.end(homePage);
};

