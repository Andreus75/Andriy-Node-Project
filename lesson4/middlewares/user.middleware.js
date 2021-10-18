const { Error } = require('mongoose');

const {EMAIL_ALREADY_EXIST, ACCESS_DENIED, USER_WITH_THIS_ID_IS_MISSING} = require('../../configs/error.enum');
const User4 = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (request, response, next) => {
        try {
            const { email } = request.body;

            const userByEmail = await User4.findOne({email});

            if (userByEmail) {
                return next({
                    message: EMAIL_ALREADY_EXIST,
                    status: 404
                });
            }
            
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (validator) => (request, response, next) => {
        try {
            const { error, value } = validator.validate(request.body);

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
                    message: USER_WITH_THIS_ID_IS_MISSING,
                    status: 404
                });
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (request, response, next) => {
        try {
            const { role } = request.user;

            if (!roleArr.includes(role)) {
                return next({
                    message: ACCESS_DENIED,
                    status: 404
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

