const User = require('../dataBase/User');
const passwordService = require('../services/password.service');

const userUtil = require('../util/user.util');

module.exports = {
    getUsersL4: async (request, response) => {
        try {
            const users = await User.find();

            response.json(users);
        } catch (e) {
            response.json(e.message);
        }
    },

    getUserById: (request, response) => {
        try {
            const user = request.user;

            const normalisedUser = userUtil.userNormalizator(user);

            response.json(normalisedUser);
        } catch (e) {
            response.json(e.message);
        }
    },

    createUser: async (request, response) => {
        try {
            const hashedPassword = await passwordService.hash(request.body.password);

            const newUser = await User.create({ ...request.body, password: hashedPassword });

            const newUserNormalise = userUtil.userNormalizator(newUser);

            response.json(newUserNormalise);
        } catch (e) {
            response.json(e.message);
        }
    },

    updateUser: async (request, response) => {
        try {
            const { user_id } = request.params;

            const user = await User.findById(user_id);

            user.name = request.body.name;
            user.save();

            response.json(user);
        } catch (e) {
            response.json(e.message);
        }
    },

    deleteUser: async (request, response) => {
        try {
            const user = request.user;

            await User.deleteOne(user);

            response.json('user delete');
        } catch (e) {
            response.json(e.message);
        }

    }
};
