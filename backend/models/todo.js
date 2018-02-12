'use strict';

const 
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const TodoSchema = new Schema(
    {
        myTodo: { type: String, required: true }
    }
);
  
module.exports = mongoose.model('Todo', TodoSchema);