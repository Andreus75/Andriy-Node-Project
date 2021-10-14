const User = require('../dataBase/User');
const passwordService = require('../services/password.service');
const userUtil = require('../util/user.util');

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
            const hashedPassword = await passwordService.hash(request.body.password);

            const newUser = await User.create({ ...request.body, password: hashedPassword });

            const newUserNormalise = userUtil.userNormaliseToAuth(newUser);

            response.json(newUserNormalise);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (request, response, next) => {
        try {
            const { _id } = request.user;

            const { name, age } = request.body;

            const userUpdate = await User.findByIdAndUpdate(_id, { name, age }, { new: true });

            response.json(userUpdate);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (request, response, next) => {
        try {
            const user = request.user;

            await User.deleteOne(user);

            response.json('user delete');
        } catch (e) {
            next(e);
        }

    }
};
