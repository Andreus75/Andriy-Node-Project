const fs = require('fs');
const path = require('path');

const  pathDataBase = path.join(__dirname, '../', 'database', 'users.json');

const readUsers = () => {
    fs.readFile(pathDataBase, (err, data) => {
        if (err) {
            return;
        }
    });
}

const writeUsers = (users) => {
    fs.writeFile(pathDataBase, JSON.stringify(users), er => {
        if (er) {
            return;
        }
    });
}

module.exports = {
    readUsers,
    writeUsers
}