'use strict';

const 
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    User = require('../models/user'),
    config = require('../../config');

const signToken = (user) => {
    return jwt.sign({
        iss: 'todoApp',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, config.secret)
};
 
module.exports = {
 
    sign_in: async (req, res, next) => {
		try {
			const { email, password, lastName, firstName, avatar } = req.value.body;
		
			const findUser = await User.findOne({ email });
			if (findUser) {
				return res.sendStatus(403).json({ error: 'Email is already in use' });
			}
			const newUser = new User({ email, password, lastName, firstName, avatar });
			await newUser.save();
		
			const token = signToken(newUser);
		    await res.sendStatus(200).json({ token });
        } catch (err) {
			console.error('err', err);
		}
    },
    
    login: async (req, res, next) => {
		try {
			// console.log('req.user', req.user);
			const token = signToken(req.user);
			await res.sendStatus(200).json({ token });
		} catch (err) {
			console.error('err', err);
		}
    },

    findAll: (req, res) => {
		User.find({})
			.then((users) => {
				// console.log('users', users)
				res.sendStatus(200).json(users);
			})
			.catch((err) => {
				console.error('err', err);	
				res.sendStatus(500).json("operation failed" + err);
			});
	},

	findById: (req, res) => {
		User.findOne({ _id: req.params.id })
			.then((user) => {
				// console.log('user', user);
				res.sendStatus(200).json(user);
			})
			.catch((err) => {
				console.error('err', err);
				res.sendStatus(500).json("operation failed" + err);
			});
	},

	update: (req, res) => {
		const user = User.findByIdAndUpdate({ _id: req.params.id })
			.then((user) => {
				user.lastName = req.body.lastName,
				user.firstName = req.body.firstName,
				user.password = req.body.password,
				user.avatar = req.body.avatar,
				user.email = req.body.email,
				user.save();
				res.sendStatus(200).json("updated user" + user);
			})
			.catch((err) => {
				res.sendStatus(500).json("operation failed" + err)
			});
        const token = signToken(user);
        console.log('token', token);	
	},

    delete: (req, res) => {
		User.findByIdAndRemove({ _id: req.params.id })
			.then((data) => {
				res.sendStatus(200).json("deleted profil" + data);
			}) 
			.catch((err) => {
				res.sendStatus(500).json("operation failed" + err);
			});
	},
}