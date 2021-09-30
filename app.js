const fs = require('fs');
const path = require('path');
const boysPath = path.join(__dirname, 'files', 'boys');
const girlsPath = path.join(__dirname, 'files', 'girls');

fs.readdir(boysPath, (err, files) => {
    if (err) {
        return;
    }
    files.forEach(file => {
        fs.readFile(path.join(boysPath, file), (er, data) => {
            if (er) {
                return;
            }
            if ((JSON.parse(data).gender) == "female") {
                fs.rename(path.join(boysPath, file), path.join(girlsPath, file), err => {
                    if (err) {
                        return;
                    }
                })
            }
        })
    })
})

fs.readdir(girlsPath, (err, files) => {
    if (err) {
        return;
    }
    files.forEach(file => {
        fs.readFile(path.join(girlsPath, file), (er, data) => {
            if (er) {
                return;
            }
            if ((JSON.parse(data).gender) == "male") {
                fs.rename(path.join(girlsPath, file), path.join(boysPath, file), err => {
                    if (err) {
                        return;
                    }
                })
            }
        })
    })
})


