const { AUTHORIZATION } = require('../../configs/costants');
const {EMAIL_OR_PASSWORD_IS_WRONG, INVALID_TOKEN} = require('../../configs/error.enum');
const O_Auth = require('../dataBase/O_Auth');
const { passwordService, jwtService } = require('../services');
const tokenTypeEnum = require('../../configs/token-type.enum');
const User4 = require('../dataBase/User');

module.exports = {
    authUserToEmail: async (request, response, next) => {
        try {
            const { email } = request.body;
            const userByEmail = await User4
                .findOne({ email })
                .select('+password')
                .lean();

            if (!userByEmail) {
                return next({
                    message: EMAIL_OR_PASSWORD_IS_WRONG,
                    status: 404
                });
            }

            request.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    authUserToPassword: async (request, response, next) => {
        try {
            const { password } = request.body;
            const { password: hashPassword } = request.user;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    },

    chekAccessToken: async (request, response, next) => {
        try {
            const token = request.get(AUTHORIZATION);

            if (!token) {
                return next({
                    message: INVALID_TOKEN,
                    status: 401
                });
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth.findOne({ refresh_token: token }).populate('user_id');

            if (!tokenResponse) {
                return next({
                    message: INVALID_TOKEN,
                    status: 401
                });
            }

            await O_Auth.remove({refresh_token: token});

            request.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (request, response, next) => {
        try {
            const token = request.get(AUTHORIZATION);

            if (!token) {
                return next({
                    message: INVALID_TOKEN,
                    status: 401
                });
            }

            await jwtService.verifyToken(token, tokenTypeEnum.REFRESH);

            const tokenResponse = await O_Auth.findOne({ access_token: token }).populate('user_id');

            if (!tokenResponse) {
                return next({
                    message: INVALID_TOKEN,
                    status: 401
                });
            }

            request.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkDeleteToken: async (request, response, next) => {
        try {
            const token = request.get(AUTHORIZATION);

            if (!token) {
                return next({
                    message: INVALID_TOKEN,
                    status: 401
                });
            }

            await jwtService.verifyToken(token);

            request.token = token;

            const tokenRes = await O_Auth.findOne({ access_token: token }).populate('user_id');

            if (!tokenRes) {
                return next({
                    message: INVALID_TOKEN,
                    status: 401
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
