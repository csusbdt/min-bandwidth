var url = require('url');
var fs  = require('fs');

var indexPage,
    appConfig = {
      mongoPort: process.env.MONGO_PORT,
      mongoHost: process.env.MONGO_HOST
    };

exports.init = function(cb) {
  fs.readFile('pages/index.html', 'utf8', function(err, file) {
    if (err) throw err;
    indexPage = file.replace("APP_CONFIG", JSON.stringify(appConfig));
    cb();
  });
};

// Use the following error function to report errors that may be 
// generated in the request handler function.
function error(req, res, err) {
  console.log(err.message);
  res.statusCode = 500;
  res.end(err.message);
}

exports.handle = function(req, res) {
  var appModel = {
    date: new Date()
  };
  var body = new Buffer(indexPage.replace("APP_MODEL", JSON.stringify(appModel)), 'utf8');
  res.writeHead(200, {
    'Content-Type'   : 'text/html',
    'Content-Length' : body.length,
    'Pragma'         : 'no-cache',
    'Cache-Control'  : 'no-cache, no-store'
  });
  res.end(body);
};

