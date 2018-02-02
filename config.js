'use strict';

const dotenv = require('dotenv').config();

module.exports = {
  'port': `${process.env.PORT}` || 4000,
  'dbURL': `mongodb://${process.env.DB_HOST}@ds113098.mlab.com:13098/todo-list`
}
