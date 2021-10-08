const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('../Lesson2/routers/user.router');

app.use('/users', userRouter);
