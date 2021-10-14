const User = require('../dataBase/User');

const { Error } = require('mongoose');

module.exports = {
    createUserMiddleware: async (request, response, next) => {
        try {
            const { user_email } = request.body;
            const userByEmail = await User.findOne({email: user_email});

            if (userByEmail) {
                throw new Error('Email already exist');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    findUserWithId: async (request, response, next) => {
        try {
            const { user_id } = request.params;

            await User.findById(user_id);

            next();
        } catch (e) {
            response.json('User with this id is missing');
        }
    },

    authUserMiddleware: async (request, response, next) => {
        try {
            const { user_email, user_password } = request.body;

            const userByEmailAndPassword = await User.findOne({email: user_email, password: user_password});
            
            if (!userByEmailAndPassword) {
                throw new Error('Email or password is wrong!!!');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
