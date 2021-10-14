const passwordService = require('../services/password.service');
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
                    message: 'Email or password is wrong!!!',
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
    }
};
