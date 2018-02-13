'uses trict';

const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            }

            if (!req.value) { 
                req.value = {}; 
            }
            req.value['body'] = result.value;
            next();
        }
    },

    schemas: {
        userSchema: Joi.object().keys({
            email: Joi.string().email().min(9).max(30).required(),
            password: Joi.string().min(6).max(18).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            lastName: Joi.string().alphanum().min(2).max(20).required(),
            firstName: Joi.string().alphanum().min(2).max(20).required(),
            avatar: Joi.string().min(5).max(140).required(),
        }),
        authSchema: Joi.object().keys({
            email: Joi.string().email().min(9).max(30).required(),
            password: Joi.string().min(6).max(18).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        })

    }
}