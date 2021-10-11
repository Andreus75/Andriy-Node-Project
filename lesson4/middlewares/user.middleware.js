const User4 = require('../dataBase/User');

const { Error } = require('mongoose');

const userValidator = require('../../validators/user.validator');

const passwordService = require('../services/password.service');

module.exports = {
    createUserMiddleware: async (request, response, next) => {
        try {
            const { user_email } = request.body;
            const userByEmail = await User4.findOne({email: user_email});

            if (userByEmail) {
                throw new Error('Email already exist!!!');
            }
            
            next();
        } catch (e) {
            response.json(e.message);
        }
    },

    isUserBodyValid: (request, response, next) => {
        try {
            const { error, value } = userValidator.createUserValidator.validate(request.body);

            request.body = value;

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            response.json(e.message);
        }
    },

    findUserWithId: async (request, response, next) => {
        try {
            const { user_id } = request.params;

            await User4.findById(user_id);

            next();
        } catch (e) {
            response.json('User with this id is missing');
        }
    },

    authEmailAndPasswordValid: (request, response, next) => {
        try {
            const { error, value } = userValidator.passwordAndEmailValidator.validate(request.body);

            request.body = value;

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            response.json(e.message);
        }
    },

    authUserMiddleware: async (request, response, next) => {
        try {
            const userByEmail = await User4.findOne({email: request.body.email});

            if (!userByEmail) {
                throw new Error('Email or password is wrong!!!++++++');
            }

            await passwordService.compare(request.body.password, userByEmail.password);

            next();
        } catch (e) {
            response.json(e.message);
        }
    }
};

