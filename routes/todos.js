'use strict';

const mongoose = require('mongoose');
const Todo = require('../models/todo');

const getTodos = (req, res) => {
    const query = Todo.find({});
    query.exec((err, result) => {
        if (err) {
            res.send(err);
        }
        res.render('index', { title: 'Docker', todos: result });
    });
}

const postTodo = (req, res) => {
    let todo = new Todo();
    todo.myTodo = req.body.myTodo;
    console.log('todo', todo);
    todo.save((err, todo) => {
        if (err) {
            res.send(err);
        } else { 
            res.status(200).redirect('/');
        }
    });
}

const getTodo = (req, res) => {
    Todo.findById(req.params.id, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.render('todo', { todo: result });
    });     
}

const deleteTodo = (req, res) => {
    Todo.findByIdAndRemove({_id : req.params.id})
        .then((todo) => {
            res.status(200).redirect('/');
        })
        .catch((err) => {
            res.send(err);
        })
}

const getTodoForEdition = (req, res) => {
    Todo.findById(req.params.id, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.render('edit-todo', {todoId: req.params.id});
    });     
}

const updateTodo = (req, res) => {
    Todo.findByIdAndUpdate({_id: req.params.id}, { $set: { 'myTodo': req.body.myTodo } },
        async (err, result) => {
            try {
                res.status(200).redirect('/');
            } catch (err) {
                console.error('err', err);
            }
    });
}

module.exports = { getTodos, postTodo, getTodo, deleteTodo, getTodoForEdition, updateTodo };