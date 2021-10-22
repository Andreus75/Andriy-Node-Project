const O_Auth = require('../dataBase/O_Auth');
const { jwtService } = require('../services');
const {TO_MACH_LOGINS, ClientErrorConflict, SuccessOK, USER_IS_ACTIVE} = require('../../configs/error.enum');
const { userNormalization } = require('../util/user.util');
const User = require('../dataBase/User');

module.exports = {
    login: async (request, response, next) => {
        try {
            const { user } = request;

            const tokenPair = jwtService.generateTokenPair();

            const logCount = await O_Auth.count({ user_id: user._id});

            if (logCount > 10) {
                return next({
                    message: TO_MACH_LOGINS,
                    status: ClientErrorConflict
                });
            }

            const userNormalised = userNormalization(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalised._id
            });

            response.json({
                user: userNormalised,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (request, response, next) => {
        try {
            const token = request.get(AUTHORIZATION);
            await O_Auth.deleteOne({access_token: token});

            response.json('logout');
        } catch (e) {
            next(e);
        }
    },

    activate: async (request, response, next) => {
        try {
            const {_id} = request.user;

            await User.updateOne({_id}, {is_active: true});

            response.status(SuccessOK).json(USER_IS_ACTIVE);
        } catch (e) {
            next(e);
        }
    }
};
