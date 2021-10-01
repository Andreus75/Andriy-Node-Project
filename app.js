const fs = require('fs');
const path = require('path');
const boysPath = path.join(__dirname, 'files', 'boys');
const girlsPath = path.join(__dirname, 'files', 'girls');
const createDirPath1 = path.join(__dirname, 'files', 'manOlder20');
const createDirPath2 = path.join(__dirname, 'files', 'manYounger20');
const createDirPath3 = path.join(__dirname, 'files', 'womanOlder20');
const createDirPath4 = path.join(__dirname, 'files', 'womanYounger20');
const builder = require('./helper/user.builder');
const change = require('./readWrite/readWrite');


// --------- homework

change.readWrite(boysPath, girlsPath, 'female');
change.readWrite(girlsPath, boysPath, 'male');


// --------- classwork

fs.mkdir(createDirPath1, {recursive: true}, (e) => {
    if (e) {
        return;
    }
})
fs.mkdir(createDirPath2, {recursive: true}, (e) => {
    if (e) {
        return;
    }
})
fs.mkdir(createDirPath3, {recursive: true}, (e) => {
    if (e) {
        return;
    }
})
fs.mkdir(createDirPath4, {recursive: true}, (e) => {
    if (e) {
        return;
    }
})

const users = [
    builder.createUser('Vasay', 'male', 34),
    builder.createUser('Igor', 'male', 17),
    builder.createUser('Olya', 'female', 23),
    builder.createUser('Roksolyana', 'female', 25),
    builder.createUser('Inna', 'female', 16),
    builder.createUser('Oleg', 'male', 18),
    builder.createUser('Ira', 'female', 19),
    builder.createUser('Viktor', 'male', 25),
    builder.createUser('Evgen', 'male', 38),
    builder.createUser('Vira', 'female', 21)
];

users.forEach(user => {
    if (user.gender === 'male' && user.age < 20) {
        fs.writeFile(`${__dirname}/files/manYounger20/${user.name}`, JSON.stringify(user), err => {
            if (err) {
                return
            }
        })
    }else if (user.gender === 'male' && user.age > 20) {
        fs.writeFile(`${__dirname}/files/manOlder20/${user.name}`, JSON.stringify(user), err => {
            if (err) {
                return
            }
        })
    }else if (user.gender === 'female' && user.age > 20) {
        fs.writeFile(`${__dirname}/files/womanOlder20/${user.name}`, JSON.stringify(user), err => {
            if (err) {
                return
            }
        })
    }else if (user.gender === 'female' && user.age < 20) {
        fs.writeFile(`${__dirname}/files/womanYounger20/${user.name}`, JSON.stringify(user), err => {
            if (err) {
                return
            }
        })
    }
})









