const O_Auth = require('../dataBase/O_Auth');
const { jwtService, emailService } = require('../services');
const {
    TO_MACH_LOGINS,
    ClientErrorConflict,
    SuccessOK, USER_IS_ACTIVE,
    USER_NOT_FOUND,
    ClientErrorNotFound
} =
    require('../../configs/error.enum');
const { userNormalization } = require('../util/user.util');
const ActionForgot = require('../dataBase/Action_forgot');
const User = require('../dataBase/User');
const actionTokenTypeEnum = require('../../configs/action-token-type-enum');
const emailActionEnum = require('../../configs/email-action.enum');
const { HTTP } = require('../../configs/config');
const {AUTHORIZATION} = require('../../configs/constants');

module.exports = {
    login: async (request, response, next) => {
        try {
            const {user} = request;

            const tokenPair = jwtService.generateTokenPair();

            const logCount = await O_Auth.count({user_id: user._id});

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
    },

    sendMailForgotPassword: async (request, response, next) => {
        try {
            const {email} = request.body;

            const user = await User.findOne({email});

            if (!user) {
                return next({
                    message: USER_NOT_FOUND,
                    status: ClientErrorNotFound
                });
            }

            const actionForgotToken = jwtService.generateForgotActionToken(actionTokenTypeEnum.FORGOT_PASSWORD);
            console.log(actionForgotToken);
            await ActionForgot.create({
                token_forgot: actionForgotToken,
                token_type: actionTokenTypeEnum.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(
                email,
                emailActionEnum.FORGOT_PASSWORD,
                {forgotPasswordUrl: HTTP + `passwordForgot?token=${actionForgotToken}`});

            response.json('Ok');
        } catch (e) {
            next(e);
        }
    },

    setNewPasswordAfterForgot: (request, response, next) => {
        try {
            const actionToken = request.get(AUTHORIZATION);

            // const user = request.user;

            const newPassword = request.body;

            // passwordService.hash(newPassword);

            // const newUser = User.updateOne();

            console.log(request.body);
            console.log(newPassword);
            console.log(actionToken);

            response.json('ok');
        } catch (e) {
            next(e);
        }
    }
};
