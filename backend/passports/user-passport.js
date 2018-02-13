'use strict';

const 
    passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    { ExtractJwt } = require('passport-jwt'),
    LocalStrategy = require('passport-local').Strategy,
    config = require('../../config'),
    User = require('../models/user');
 
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}, async (payload, done) => {
    try {
        const user = User.findById(payload.sub);
 
        if (!user) {
            return done(null, false);
        }
 
        done(null, user);
    } catch(err) {
        done(err, false);
    }
}));
 
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
 
    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return done(null, false);
        }
        
        const isMatch = await user.isValidPassword(password);
        
        if (!isMatch) {
            return done(null, false);
        }
        
        done(null, user);
    
    } catch (error) {
        done(error, false);
    }
}));