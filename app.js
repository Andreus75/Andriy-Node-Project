const express = require('express');
const {request, response} = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userRouter = require('./Lesson2/routers/user.router');

// -------------- homework lesson2

app.use('/users', userRouter);

// --------- homework lesson1

// change.readWrite(boysPath, girlsPath, 'female');
// change.readWrite(girlsPath, boysPath, 'male');

app.listen(5000, () => {
    console.log('App listen 5000');
});
















