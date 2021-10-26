const { Error } = require('mongoose');

const {EMAIL_ALREADY_EXIST,
    ACCESS_DENIED,
    USER_WITH_THIS_ID_IS_MISSING,
    ClientErrorNotFound,
    ClientErrorBadRequest, USER_IS_NOT_ACTIVE, ClientErrorForbidden
} =
    require('../../configs/error.enum');
const User4 = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (request, response, next) => {
        try {
            const { email } = request.body;

            const userByEmail = await User4.findOne({email});

            if (userByEmail) {
                return next({
                    message: EMAIL_ALREADY_EXIST,
                    status: ClientErrorNotFound
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
                    status: ClientErrorBadRequest
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
                    status: ClientErrorNotFound
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
                    status: ClientErrorNotFound
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserActive: (request, response, next) => {
        try {
            const {user} = request;

            if (!user.is_active) {
                return next({
                    message: USER_IS_NOT_ACTIVE,
                    status: ClientErrorForbidden
                });
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailValid: (validator) => (request, response, next) => {
        try {
            const email = request.body;

            const { error, value } = validator.validate(email);

            request.body = value;

            if (error) {
                return next({
                    message: new Error(error.details[0].message),
                    status: ClientErrorBadRequest
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isPasswordValid: (validator) => (request, response, next) => {
        try {
            const password = request.body;

            const { error, value } = validator.validate(password);

            request.body = value;

            if (error) {
                return next({
                    message: new Error(error.details[0].message),
                    status: ClientErrorBadRequest
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};

