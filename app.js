const fs = require('fs');
const path = require('path');
// const boysPath = path.join(__dirname, 'files', 'boys');
// const girlsPath = path.join(__dirname, 'files', 'girls');
// const change = require('./lesson1/readWrite/readWrite');
// const classwork1 = require('./lesson1/classwork/classwork')

const express = require('express');
const {request, response} = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userRouter = require('./Lesson2/routers/user.router');

app.use('/users', userRouter);



// --------- homework

// change.readWrite(boysPath, girlsPath, 'female');
// change.readWrite(girlsPath, boysPath, 'male');

app.listen(5000, () => {
    console.log('App listen 5000');
});
















