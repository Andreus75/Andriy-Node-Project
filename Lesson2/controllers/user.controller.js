const { read, write} = require('../services/user.service');

module.exports = {
    getUsers: async (request, response) => {
        response.json(await read());
    },

    getUserById: async (request, response) => {
        const { user_id } = request.params;

        const users = (await read());

        users.forEach(user => {
            if (user.id === +user_id) {
                response.json({ user });
            }
        });
    },

    createUser: async (request, response) => {

        let users = await read();

        users.push({ id: users[users.length-1].id + 1, ...request.body });
        await write(users);
        response.json(users);
    },

    updateUser: (request, response) => {
        response.json('UPDATE user');
    },

    deleteUser: async (request, response) => {
        const { user_id } = request.params;

        const users = await read();

        const usersF = users.filter(user => +user_id !== user.id);

        await write(usersF);

        response.json(usersF);
    }
}