const User = require('../dataBase/User');

module.exports = {
    getUsers: async (request, response) => {
        try {
            const users = await User.find();

            response.json(users);
        } catch (e) {
            response.json(e);
        }
    },

    getUserById: async (request, response) => {
        try {
            const { user_id } = request.params;
            const user = await User.findById(user_id);

            response.json(user);
        } catch (e) {
            response.json(e);
        }
    },

    userAuth: (request, response) => {
        try {
            response.json('welcome: email and password is good!!!');
        } catch (e) {
            response.json(e);
        }
    },

    createUser: async (request, response) => {
        try {
            const newUser = await User.create(request.body);

            response.json(newUser);
        } catch (e) {
            response.json(e);
        }
    },

    deleteUser: async (request, response) => {
        const { user_id } = request.body;

        await User.deleteOne(user_id);

        response.json('user delete');
    }
};

