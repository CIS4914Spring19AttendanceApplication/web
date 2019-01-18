var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var http = require("http");

var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./dist/login'));
app.use('/*', express.static('dist/login/index.html'));


setInterval(function() {
    http.get("http://rollcall-webapp.herokuapp.com");
    var d = new Date();
    console.log("Keep-alive: " + d.getMonth() + "/" +d.getDate() + " | " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
}, 60000); 

app.use((req, res, next) => {
  res.header('Access-Allow-Control-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.all('/*', function(req, res, next) {
  res.sendFile('index.html', { root: __dirname });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;