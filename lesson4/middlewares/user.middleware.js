const User4 = require('../dataBase/User');

const { Error } = require('mongoose');

const userValidator = require('../../validators/user.validator');

module.exports = {
    createUserMiddleware: async (request, response, next) => {
        try {
            const { email } = request.body;
            const userByEmail = await User4.findOne({email});

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

    isUserUpdateBodyValid: (request, response, next) => {
        try {
            const { error, value } = userValidator.updateUserValidator.validate(request.body);

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

            const userById = await User4.findById(user_id);

            request.user = userById;

            if (!userById) {
                throw new Error('User with this id is missing!!!');
            }

            next();
        } catch (e) {
            response.json('User with this id is missing');
        }
    },


};

