var http     = require('http');

var router   = require('./router');

var req_home = require('./req_home');
var req_file = require('./req_file');

// TODO minify js and css as part of deployment process

// Refer to following for caching
// https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers
// Maybe add ETags.  See the following:
//    http://en.wikipedia.org/wiki/HTTP_ETag
//    https://github.com/tomgco/gzippo/blob/master/lib/staticGzip.js

if (process.env.HOME_PAGE_VER === undefined) throw new Error('HOME_PAGE_VER not defined');
if (process.env.APP_DEBUG     === undefined) throw new Error('APP_DEBUG not defined');
if (process.env.PORT          === undefined) throw new Error('PORT not defined');

// Trim.
process.env.HOME_PAGE_VER = process.env.HOME_PAGE_VER .replace(' ', '');
process.env.APP_DEBUG     = process.env.APP_DEBUG     .replace(' ', '');
process.env.PORT          = process.env.PORT          .replace(' ', '');


// Run 2 initialization routines in parallel.
// Note: initialization routines throw exceptions,
// which are uncaught and terminate program.

var n = 2;
function onEnd() {
  if (--n === 0) router.start();
}
req_file.init(onEnd);
req_home.init(process.env.HOME_PAGE_VER, process.env.APP_DEBUG, onEnd);

