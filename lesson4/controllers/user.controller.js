const { passwordService, emailService } = require('../services');
const User = require('../dataBase/User');
const userUtil = require('../util/user.util');
const { WELCOME } = require('../../configs/email-action.enum');
const { SuccessNoContent, SuccessCreated} = require('../../configs/error.enum');

module.exports = {
    getUsersL4: async (request, response, next) => {
        try {
            const users = await User.find();

            response.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (request, response, next) => {
        try {
            const user = request.user;

            response.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (request, response, next) => {
        try {
            const { name, password, email } = request.body;

            const hashedPassword = await passwordService.hash(password);

            await emailService.sendMail(email, WELCOME, { userName: name });

            const newUser = await User.create({ ...request.body, password: hashedPassword });

            const newUserNormalise = userUtil.userNormaliseToAuth(newUser);

            response.status(SuccessCreated).json(newUserNormalise);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (request, response, next) => {
        try {
            const { _id } = request.user;

            const { name, age } = request.body;

            const userUpdate = await User.findByIdAndUpdate(_id, { name, age }, { new: true });

            response.status(SuccessCreated).json(userUpdate);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (request, response, next) => {
        try {
            const user = request.user;

            await User.deleteOne(user);

            response.sendStatus(SuccessNoContent);
        } catch (e) {
            next(e);
        }

    },

    deleteAccount: (request, response, next) => {
        try {
            response.json('ok');
        } catch (e) {
            next(e);
        }
    }
};
