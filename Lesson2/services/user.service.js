const util = require('util');
const fs = require('fs');
const path = require('path');

let readFilePromise = util.promisify(fs.readFile);

const path1 = path.join(__dirname, '../', 'dataBase', 'users.json');
console.log(path1);

async function read() {

    let buffer = await readFilePromise(path1);
    console.log(buffer.toString());
}

module.exports = read;