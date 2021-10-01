const fs = require('fs');
const path = require('path');

const readWrite = (path1, path2, gender) => {
    fs.readdir(path1, (err, files) => {
        if (err) {
            return;
        }

        files.forEach(file => {
            fs.readFile(path.join(path1, file), (er, data) => {
                if (er) {
                    return;
                }

                if (JSON.parse(data).gender === gender) {
                    fs.rename(path.join(path1, file), path.join(path2, file), err => {
                        if (err) {
                            return;
                        }

                    });
                }
            });
        });
    });
}

module.exports = {
    readWrite
}