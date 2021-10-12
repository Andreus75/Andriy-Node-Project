const userValidator = require("../../validators/user.validator");
const passwordService = require("../services/password.service");
const User4 = require("../dataBase/User");

const {Error} = require("mongoose");

module.exports = {
    authEmailAndPasswordValid: (request, response, next) => {
        try {
            const { error, value } = userValidator.passwordAndEmailValidator.validate(request.body);

            request.body = value;

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            response.json('Wrong email or password!!!');
        }
    },

    authUserToEmail: async (request, response, next) => {
        try {
            const { email } = request.body;
            const userByEmail = await User4
                .findOne({ email })
                .select('+password')
                .lean();

            if (!userByEmail) {
                throw new Error('Email or password is wrong + authUserToEmail!!!');
            }

            request.user = userByEmail;

            next();
        } catch (e) {
            response.json(e.message);
        }
    },

    authUserToPassword: async (request, response, next) => {
        try {
            const { password } = request.body;
            const { password: hashPassword } = request.user;;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            response.json(e.message);
        }
    }
};
