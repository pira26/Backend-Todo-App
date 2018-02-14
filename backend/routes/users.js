'use strict';

const
    passport = require('passport'),
    passportConf = require('../passports/user-passport'),
    { validateBody, schemas } = require('../helpers/user-route-helper'),
    usersHandler = require('../controllers/user-controller'),
    express = require('express'),
    router = require('express-promise-router')();

router.route('/sign-in')
    .post(validateBody(schemas.userSchema), usersHandler.sign_in);
   
router.route('/login')
    .post(validateBody(schemas.authSchema), passport.authenticate('local', { session: false }), usersHandler.login);

router.route('/')
    .get(usersHandler.findAll);

router.route('/:id')
    .get(usersHandler.findById)
    .put(usersHandler.update)
    .delete(usersHandler.delete);    

module.exports = router;