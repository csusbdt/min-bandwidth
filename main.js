var http      = require('http');
var router    = require('./router');
var req_index = require('./req_index');
var req_file  = require('./req_file');
var db        = require('./model/db');

// TODO: minify js and css as part of deployment process.
// IDEA: minify at startup rather than as a build step.

// TODO: Check concepts against the following article.
// https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers

// Check for required environmental variables.
if (process.env.PORT       === undefined) throw new Error('PORT not defined');
if (process.env.MONGO_PORT === undefined) throw new Error('MONGO_PORT not defined');
if (process.env.MONGO_HOST === undefined) throw new Error('MONGO_HOST not defined');

// Trim for foreman.
process.env.PORT       = process.env.PORT.replace(' ', '');
process.env.MONGO_PORT = process.env.MONGO_PORT.replace(' ', '');
process.env.MONGO_HOST = process.env.MONGO_HOST.replace(' ', '');

var n = 3;
function onEnd() {
  if (--n === 0) router.start();
}
req_index.init(onEnd);
req_file.init(onEnd);
db.init(onEnd);

