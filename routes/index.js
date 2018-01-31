'use strict';

const express = require('express');
const router = express.Router();
const assert = require('assert');
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

mongoClient.connect('mongodb://localhost:27017', (err, client) => {
    assert.equal(null, err);
    const db = client.db('test');
    
    router.route('/')
        .get((req, res) => {
            db.collection('todoCollection').find({}).toArray(async (err, result) => {
                try  {
                    await result;
                    res.render('index', { title: 'Docker', todos: result });
                } catch (err) {
                    console.error('err', err);
                }
            });
        })
        .post((req, res) => {
            const myTodo = req.body.myTodo;
            db.collection('todoCollection').insert({ 'todo': myTodo }, async (err, result) => {
                try  {
                    res.redirect('/');
                } catch (err) {
                    console.error('err', err);
                    res.redirect('/');
                }
            });
        });
        
    router.route('/todos/:id')
        .get((req, res) => {
            db.collection('todoCollection').find({'_id': ObjectId(`${req.params.id}`)}).toArray(async (err, result) => {
                try  {
                    assert.equal(err, null);
                    await result;
                    res.render('todo', { todoList: result });
                } catch (err) {
                    console.error('err', err);
                }
            })
        });
        // .delete((req, res) => {
        //     db.collection('todoCollection').deleteOne({'_id': ObjectId(`${req.params.id}`)}, async (err, result) => {
        //         try {
        //             assert.equal(err, null);
        //             assert.equal(1, result.result.n);
        //             res.status(200).redirect('/')
        //         } catch (err) {
        //             console.error('err', err);
        //         }
        //     })
        // });

    router.post('/todos/:id/delete', (req, res) => {
        db.collection('todoCollection').deleteOne({'_id': ObjectId(`${req.params.id}`)}, async (err, result) => {
            try {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                res.status(200).redirect('/')
            } catch (err) {
                console.error('err', err);
            }
        })
    });

    router.route('/todos/:id/edit')
        .get((req, res) => {
            res.render('edit-todo', {todoId: req.params.id} );
        })
        .post((req, res) => {
            const newTodo = req.body.newTodo;
            const id = ObjectId(`${req.params.id}`);
            db.collection('todoCollection').updateOne(
                {'_id': ObjectId(`${req.params.id}`)},
                { $set: { 'todo': newTodo } },
                async (err, result) => {
                    try {
                        assert.equal(err, null);
                        assert.equal(1, result.result.n);
                        res.status(200).redirect('/');
                    } catch (err) {
                        console.error('err', err);
                    }
            })
    });
});

module.exports = router;