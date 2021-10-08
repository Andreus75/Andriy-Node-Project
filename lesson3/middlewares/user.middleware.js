const User = require('../dataBase/User');

const {Error} = require("mongoose");

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
            response.json(e.message);
        }
    },

    authUserMiddleware: async (request, response, next) => {
        try {
            const userByEmailAndPassword = await User.findOne({email: request.body.email, password: request.body.password});
            
            if (!userByEmailAndPassword) {
                throw new Error('Email or password is wrong!!!');
            }

            next();
        } catch (e) {
            response.json(e.message);
        }
    }
};
