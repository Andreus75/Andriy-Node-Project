const { emailService, jwtService} = require('../services');
const User = require('../dataBase/User');
const userUtil = require('../util/user.util');
const { WELCOME } = require('../../configs/email-action.enum');
const { SuccessNoContent, SuccessCreated} = require('../../configs/error.enum');
const Action = require('../dataBase/Action');
const { ACTION } = require('../../configs/action-token-type-enum');

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
            const { name, email } = request.body;

            const newUser = await User.createUserWithHashPassword(request.body);

            const token = jwtService.createActionToken();

            await Action.create({token, type: ACTION, user_id: newUser._id});

            await emailService.sendMail(email, WELCOME, { userName: name, token });

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
