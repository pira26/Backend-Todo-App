'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(favicon(dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, PATCH, POST, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Make our db accessible to our router
app.use('/', routes);

/// catch 404 and forwarding to error handler
app.use(async(req, res, next) => {
  try {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  } catch (err) {
      console.error('err', err);
  }
});

//// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(async(err, req, res, next) => {
      try {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      } catch (err) {
        console.error('err', err);
      }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(async(err, req, res, next) => {
  try {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  } catch (err) {
    console.error('err', err);
  }
});

app.listen(3000);
console.log(`Running on port 3000`);

module.exports = app;