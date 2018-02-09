'use strict';

const mongoose = require('mongoose');
const Todo = require('../models/todo');

const getTodos = async (req, res) => {
    const query = Todo.find({});
    try {
            query.exec((err, result) => {
                if (err) {
                    res.send(err);
                }
                // res.render('index', { title: 'Docker', todos: result });
                res.json(result);
            });
    } catch (err) {
        console.error('err', err);
    }
}

const postTodo = async (req, res) => {
    let todo = new Todo();
    todo.myTodo = await req.body.myTodo;
    // console.log('todo', todo);
    try {
            todo.save((err, todo) => {
                if (err) {
                    res.send(err);
                } else { 
                    // res.status(200).redirect('/');
                    res.json(todo);
                }
            });
    } catch (err) {
        console.error('err', err);
    }
}

const getTodo = async (req, res) => {
    try {
            Todo.findById(req.params.id, (err, result) => {
            if (err) {
                res.send(err);
            }
            // res.render('todo', { todo: result });
            res.json(result);
        });
    } catch (err) {
        console.error('err', err);
    }   
}

const deleteTodo = async (req, res) => {
    try {
            Todo.findByIdAndRemove({_id : req.params.id})
                .then((result) => {
                    // res.status(200).redirect('/');
                    res.json(result);
                })
                .catch((err) => {
                    res.send(err);
                })
    } catch (err) {
        console.error('err', err);
    }
}

const getTodoForEdition = async (req, res) => {
    try {
            Todo.findById(req.params.id, (err, result) => {
                if (err) {
                    res.send(err);
                }
                // res.render('edit-todo', {todoId: req.params.id});
                res.json(result);
        });
    } catch (err) {
        console.error('err', err);
    }     
}

const updateTodo = (req, res) => {
    Todo.findByIdAndUpdate({_id: req.params.id}, { $set: { 'myTodo': req.body.myTodo } },
        async (err, result) => {
            try {
                // res.status(200).redirect('/');
                res.json(result);
            } catch (err) {
                console.error('err', err);
            }
    });
}

module.exports = { getTodos, postTodo, getTodo, deleteTodo, getTodoForEdition, updateTodo };