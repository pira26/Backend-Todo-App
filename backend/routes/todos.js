'use strict';

module.exports = (app) => {
    const 
        todo = require('../controllers/todo-controller'),
	    userHandlers = require('../controllers/user-controller');

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
};