import fs from "fs";
import path from "path";
import builder from "./lesson1/helper/user.builder";
const createDirPath1 = path.join(__dirname, 'files', 'manOlder20');
const createDirPath2 = path.join(__dirname, 'files', 'manYounger20');
const createDirPath3 = path.join(__dirname, 'files', 'womanOlder20');
const createDirPath4 = path.join(__dirname, 'files', 'womanYounger20');

fs.mkdir(createDirPath1, {recursive: true}, (e) => {
    if (e) {
        return;
    }

});
fs.mkdir(createDirPath2, {recursive: true}, (e) => {
    if (e) {
        return;
    }

});
fs.mkdir(createDirPath3, {recursive: true}, (e) => {
    if (e) {
        return;
    }

});
fs.mkdir(createDirPath4, {recursive: true}, (e) => {
    if (e) {
        return;
    }

});

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
const pathManYounger20 = path.join(__dirname, 'files', 'manYounger20')
const pathManOlder20 = path.join(__dirname, 'files', 'manOlder20')
const pathWomanOlder20 = path.join(__dirname, 'files', 'womanOlder20')
const pathWomanYounger20 = path.join(__dirname, 'files', 'womanYounger20')

users.forEach(user => {
    if (user.gender === 'male' && user.age < 20) {
        fs.writeFile(path.join(pathManYounger20, `${user.name}`), JSON.stringify(user), err => {
            if (err) {
                return;
            }
        });
        return;
    }

    if (user.gender === 'male' && user.age > 20) {
        fs.writeFile(path.join(pathManOlder20, `${user.name}`), JSON.stringify(user), err => {
            if (err) {
                return;
            }
        });
        return;
    }

    if (user.gender === 'female' && user.age > 20) {
        fs.writeFile(path.join(pathWomanOlder20, `${user.name}`), JSON.stringify(user), err => {
            if (err) {
                return;
            }
        });
        return;
    }

    if (user.gender === 'female' && user.age < 20) {
        fs.writeFile(path.join(pathWomanYounger20, `${user.name}`), JSON.stringify(user), err => {
            if (err) {
                return;
            }
        });
    }
});