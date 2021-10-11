const Joi = require('joi');

const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../configs/costants');

const userRoles = require('../configs/user_roles_enum');

const createUserValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    age: Joi.number()
        .integer()
        .positive()
        .required(),

    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .trim()
        .required(),
    role: Joi.string().allow(...Object.values(userRoles)),
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .required()
});

const passwordAndEmailValidator = Joi.object({
    name: Joi.string(),
    age: Joi.number(),
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .required()
        .trim(),
    role: Joi.string(),
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .required()
        .trim()
});

module.exports = {
    createUserValidator,
    passwordAndEmailValidator
};

