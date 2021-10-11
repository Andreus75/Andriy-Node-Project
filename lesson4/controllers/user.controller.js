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

    getUserById: async (request, response) => {
        try {
            const { user_id } = request.params;
            let user = await User.findById(user_id).lean();

            user = userUtil.userNormalizator(user);

            response.json(user);
        } catch (e) {
            response.json(e.message);
        }
    },

    userAuth: (request, response) => {
        try {
            response.json('welcome: email and password is good!!!');
        } catch (e) {
            response.json(e.message);
        }
    },

    createUser: async (request, response) => {
        try {
            const hashedPassword = await passwordService.hash(request.body.password);

            const newUser = await User.create({ ...request.body, password: hashedPassword });

            response.json(newUser);
        } catch (e) {
            response.json(e);
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
        const { user_id } = request.body;

        await User.deleteOne(user_id);

        response.json('user delete');
    }
};
