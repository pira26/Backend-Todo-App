'use strict';

module.exports = (app) => {
    const todo = require('../controllers/todo-controller');

    app.route('/')
        .get(todo.getTodos)
        .post(todo.postTodo);
      
    app.route('/todos/:id')
        .get(todo.getTodo)
        .put(todo.updateTodo) 
        .delete(todo.deleteTodo); 
      
    app.route('/todos/:id/edit')
        .get(todo.getTodoForEdition)
        .post(todo.updateTodo);
      
    app.route('/todos/:id/delete')
        .post(todo.deleteTodo);     
};