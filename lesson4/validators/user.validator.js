const Joi = require('joi');

const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../../configs/constants');
const userRoles = require('../../configs/user_roles_enum');

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

const updateUserValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim(),
    age: Joi.number()
        .integer()
        .positive()
});

const passwordAndEmailValidator = Joi.object({
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .required()
        .trim(),
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .required()
        .trim()
});

const passwordValidator = Joi.object({
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .required()
        .trim()
});

const emailValidator = Joi.object({
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .required()
        .trim()
});

module.exports = {
    createUserValidator,
    passwordAndEmailValidator,
    updateUserValidator,
    passwordValidator,
    emailValidator
};

