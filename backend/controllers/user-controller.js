'use strict';

const 
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    User = mongoose.model('User');

const register = async (req, res) => {
//     const newUser = new User(req.body);
//     newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
//     newUser.save((err, user) => {
//     if (err) {
//       return res.status(400).send({
//         message: err
//       });
//     } else {
//       user.hash_password = undefined;
//       return res.json(user);
//     }
//   });
    try {
        const newUser = new User(req.body);
        newUser.password = await bcrypt.hashSync(req.body.password, 10);
        newUser.save();
        return res.json(newUser);
    } catch (err) {
        console.error('err', err);
    }
}


const sign_in = async (req, res) => {
    // User.findOne({
    //     email: req.body.email
    //   }, (err, user) => {
    //     if (err) throw err;
    //     if (!user) {
    //       res.status(401).json({ message: 'Authentication failed. User not found.' });
    //     } else if (user) {
    //       if (!user.comparePassword(req.body.password)) {
    //         res.status(401).json({ message: 'Authentication failed. Wrong password.' });
    //       } else {
    //         return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs')});
    //       }
    //     }
    // });
    try {
        User.findOne(
            { email: req.body.email },
            async (user) => {
                try {
                    if (!user) {
                        res.status(401).json({ message: 'Authentication failed. User not found.' });
                    } else if (user) {
                        if (!user.comparePassword(req.body.password)) {
                        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
                        } else {
                            return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs')});
                        }
                    }
                } catch (err) {
                    console.error('err', err);
                }
            }
        )
    } catch (err) {
        console.error('err', err);
    }
}

const loginRequired = async (req, res, next) => {
    try {
        if (req.user) {
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized user!' });
          }
    } catch (err) {
        console.error('err', err);
    }
}

exports.module = { register, sign_in, loginRequired }    