// const db = require('../dataBase/users');
// const userDB = require('../dataBase/users.json');
const {request, response} = require("express");
const fs = require('fs');
const path = require('path');
const readAndWrite = require('../helper/users.helper')

const  pathDataBase = path.join(__dirname, '../', 'database', 'users.json');

module.exports = {
    getUsers: (request, response) => {
            fs.readFile(pathDataBase, (err, data) => {
                if (err) {
                    return;
                }
                response.json(JSON.parse(data));
            });

    },

    getUserById: (request, response) => {
        const { user_id } = request.params;

        fs.readFile(pathDataBase, (err, data) => {
            if (err) {
                return;
            }
            const users = JSON.parse(data);
            users.forEach(user => {
                if (user.id === +user_id) {
                    response.json({ user });
                }
            });
        });
    },

    createUser: (request, response) => {

        fs.readFile(pathDataBase, (err, data) => {
            if (err) {
                return;
            }
            const users = JSON.parse(data);
            users.push({ id: users[users.length-1].id + 1, ...request.body });
            fs.writeFile(pathDataBase, JSON.stringify(users), er => {
                if (er) {
                    return;
                }
            });
            response.json(users);
        });
    },

    updateUser: (request, response) => {
        response.json('UPDATE user');
    },

    deleteUser: (request, response) => {
        const { user_id } = request.params;

        fs.readFile(pathDataBase, (err, data) => {
            if (err) {
                return;
            }
            const users = JSON.parse(data);
            const usersF = users.filter(user => +user_id !== user.id);

            fs.writeFile(pathDataBase, JSON.stringify(usersF), er => {
                if (er) {
                    return;
                }
            });
            response.json({ usersF });
        });
    }
}