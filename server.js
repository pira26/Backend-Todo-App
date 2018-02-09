'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
// const routes = require('./routes/index-mongodb-native');
const todo = require('./backend/routes/todos');
const config = require('./config');
const app = express();

// compress responses
app.use(compression());

mongoose.connect(config.dbURL);
mongoose.set('debug', true);

mongoose.connection.on('connected', () => {  
  console.log(`Mongoose default connection is open to ${config.dbURL}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection has occured ${err} error`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection is disconnected due to application termination');
     process.exit(0);
    });
});

app.set('views', path.join(__dirname, 'backend/views'));
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/backend/public/favicon.ico'));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, PATCH, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.route('/')
  .get(todo.getTodos)
  .post(todo.postTodo);

app.route('/todos/:id')
  .get(todo.getTodo)
  .put(todo.updateTodo) // not working in front but working in postman
  .delete(todo.deleteTodo); // not working in front but working in postman

app.route('/todos/:id/edit')
  .get(todo.getTodoForEdition)
  .post(todo.updateTodo);

app.route('/todos/:id/delete')
  .post(todo.deleteTodo);  


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

app.listen(config.port);
console.log(`Running on port ${config.port}`);

module.exports = app;