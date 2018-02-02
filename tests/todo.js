'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Todo = require('../models/todo');

chai.use(chaiHttp);

describe('/GET Todos', () => {
    it('it should GET all the Todos', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
});

describe('/POST Todo', () => {
    it('it should not POST a todo without pages field', (done) => {
        chai.request(server)
            .post('/')
            .send({
                id: Schema.Types.ObjectId,
                myTodo: 'Doing the tests',
                createdAt: Date.now()
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('/GET/:id Todo', () => {
    it('it should GET a todo by the given id', (done) => {
        const todo = new Todo({ myTodo: 'Doing the tests'});
        todo.save((err, result) => {
            chai.request(server)
                .get(`/todos/${result.id}`)
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});

describe('/DELETE/:id Todo', () => {
    it('it should DELETE a todo given the id', (done) => {
        const todo = new Todo({myTodo: 'Running all tests'})
        todo.save((err, result) => {
            chai.request(server)
                .post(`/todos/${result.id}/delete`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});

describe('/PUT/:id Todo', () => {
    it('it should UPDATE a todo given the id', (done) => {
        const todo = new Todo({myTodo: 'Doing the tests'})
        todo.save((err, result) => {
            chai.request(server)
                .post(`/todos/${result.id}/edit`)
                .send({myTodo: 'Running all tests'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});