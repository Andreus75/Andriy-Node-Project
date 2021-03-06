const { AUTHORIZATION } = require('../../configs/constants');
const {EMAIL_OR_PASSWORD_IS_WRONG,
    INVALID_TOKEN,
    ClientErrorNotFound,
    ClientErrorUnauthorized} =
    require('../../configs/error.enum');
const O_Auth = require('../dataBase/O_Auth');
const { passwordService, jwtService } = require('../services');
const tokenTypeEnum = require('../../configs/token-type.enum');
const actionTokenTypeEnum = require('../../configs/action-token-type-enum');
const User4 = require('../dataBase/User');
const Action = require('../dataBase/Action');
const ActionForgot = require('../dataBase/Action_forgot');

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
                    status: ClientErrorNotFound
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
                    status: ClientErrorUnauthorized
                });
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth.findOne({ access_token: token }).populate('user_id');

            if (!tokenResponse) {
                return next({
                    message: INVALID_TOKEN + '111111',
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
                    status: ClientErrorUnauthorized
                });
            }

            await jwtService.verifyToken(token, tokenTypeEnum.REFRESH);

            const tokenResponse = await O_Auth.findOne({ refresh_token: token }).populate('user_id');

            if (!tokenResponse) {
                return next({
                    message: INVALID_TOKEN,
                    status: ClientErrorUnauthorized
                });
            }

            request.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActivateToken: async (request, response, next) => {
        try {
            const { token } = request.params;

            await jwtService.verifyToken(token, actionTokenTypeEnum.ACTION);

            const {user_id: user, _id} = await Action.findOne({token, type: actionTokenTypeEnum.ACTION}).populate('user_id');

            if (!user) {
                throw new ErrorHandler(INVALID_TOKEN, ClientErrorUnauthorized);
            }

            await Action.deleteOne({_id});

            request.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    chekAccessNewToken: async (request, response, next) => {
        try {
            const token = request.get(AUTHORIZATION);

            if (!token) {
                return next({
                    message: INVALID_TOKEN,
                    status: ClientErrorUnauthorized
                });
            }

            await jwtService.verifyToken(token, actionTokenTypeEnum.FORGOT_PASSWORD);

            const tokenForgotNew = await ActionForgot
                .findOne({ token, type: actionTokenTypeEnum.FORGOT_PASSWORD })
                .populate('user_id');

            if (!tokenForgotNew) {
                return next({
                    message: INVALID_TOKEN,
                    status: 401
                });
            }

            request.user = tokenForgotNew.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }
};
