const util = require('util');
const fs = require('fs');
const path = require('path');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const pathDB = path.join(__dirname, '../', 'dataBase', 'users.json');

const read = async () => {
    const buffer = await (readFilePromise(pathDB));
    return JSON.parse(buffer.toString());
};

const write = async (users) => {
    await (writeFilePromise(pathDB, JSON.stringify(users)));
};

module.exports = {
    read,
    write
};