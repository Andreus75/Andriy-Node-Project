const User4 = require('../dataBase/User');

const { Error } = require('mongoose');

const userValidator = require('../../validators/user.validator');

module.exports = {
    createUserMiddleware: async (request, response, next) => {
        try {
            const { email } = request.body;

            const userByEmail = await User4.findOne({email});

            if (userByEmail) {
                return next({
                    message: 'Email already exist!!!',
                    status: 404
                });
            }
            
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (request, response, next) => {
        try {
            const { error, value } = userValidator.createUserValidator.validate(request.body);

            request.body = value;

            if (error) {
                return next({
                    message:  new Error(error.details[0].message),
                    status: 400
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserUpdateBodyValid: (request, response, next) => {
        try {
            const { error, value } = userValidator.updateUserValidator.validate(request.body);

            request.body = value;

            if (error) {
                return next({
                    message:  new Error(error.details[0].message),
                    status: 400
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    findUserWithId: async (request, response, next) => {
        try {
            const { user_id } = request.params;

            const userById = await User4.findById(user_id);

            request.user = userById;

            if (!userById) {
                return next({
                    message: 'User with this id is missing!!!',
                    status: 404
                });
            }
            next();
        } catch (e) {
            response.json('User with this id is missing');
        }
    },

    checkUserRole: (roleArr = []) => (request, response, next) => {
        try {
            const { role } = request.user;

            if (!roleArr.includes(role)) {
                return next({
                    message: 'Access denied',
                    status: 404
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

