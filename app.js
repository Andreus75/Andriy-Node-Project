const express = require('express');
const mongoose = require('mongoose');

const { MONGO_CONNECT_URL, PORT } = require('./configs/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const userRouter = require('./Lesson2/routers/user.router');
const userRouter3 = require('./lesson3/routers/user.router');

// --------- homework lesson1

// change.readWrite(boysPath, girlsPath, 'female');
// change.readWrite(girlsPath, boysPath, 'male');

// -------------- homework lesson2

// app.use('/users', userRouter);

// -------------- homework lesson3

app.use('/users', userRouter3);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});


