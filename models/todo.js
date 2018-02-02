'use strict';

const mongoose = require('mongoose');
// const ObjectId = require('mongodb').ObjectID;
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
    {
        myTodo: { type: String, required: true }
    }
);
  
module.exports = mongoose.model('Todo', TodoSchema);