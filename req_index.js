var url    = require('url');
var fs     = require('fs');
var cookie = require('./app_cookie');

var loginScreen,
    titleScreen,
    appConfig = {
      mongoPort: process.env.MONGO_PORT
    };

exports.init = function(cb) {
  fs.readFile('pages/index.html', 'utf8', function(err, file) {
    if (err) throw err;
    var indexPage = file.replace("CONFIG", JSON.stringify(appConfig));
    loginScreen = indexPage.replace('SCREEN', 'index/login-0.html');
    titleScreen = indexPage.replace('SCREEN', 'index/title-0.html');
    cb();
  });
};

// Use the following error function to report errors that
// may be generated in the request handler function.
function error(req, res, err) {
  console.log(err.message);
  res.statusCode = 500;
  res.end(err.message);
}

exports.handle = function(req, res) {
  var body, 
      creds = cookie.creds(req),
      model = { date: new Date() };
  if (creds) {
    model.creds = creds;
    body = new Buffer(titleScreen.replace("MODEL", JSON.stringify(model)), 'utf8');
  } else {
    body = new Buffer(loginScreen.replace("MODEL", JSON.stringify(model)), 'utf8');
  }
  res.writeHead(200, {
    'Content-Type'   : 'text/html',
    'Content-Length' : body.length,
    'Pragma'         : 'no-cache',
    'Cache-Control'  : 'no-cache, no-store'
  });
  res.end(body);
};

