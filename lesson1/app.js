const path = require('path');

const boysPath = path.join(__dirname, 'files', 'boys');
const girlsPath = path.join(__dirname, 'files', 'girls');

change.readWrite(boysPath, girlsPath, 'female');
change.readWrite(girlsPath, boysPath, 'male');

