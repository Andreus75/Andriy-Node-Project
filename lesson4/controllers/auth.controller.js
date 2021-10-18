const O_Auth = require('../dataBase/O_Auth');
const { jwtService } = require('../services');
const {TO_MACH_LOGINS} = require('../../configs/error.enum');
const { userNormalization } = require('../util/user.util');

module.exports = {
    login: async (request, response, next) => {
        try {
            const { user } = request;

            const tokenPair = jwtService.generateTokenPair();

            const logCount = await O_Auth.count({ user_id: user._id});

            if (logCount > 10) {
                return next({
                    message: TO_MACH_LOGINS
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
            await O_Auth.remove({access_token: token});

            response.json('logout');
        } catch (e) {
            next(e);
        }
    }
};
