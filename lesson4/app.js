const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { MONGO_CONNECT_URL, PORT } = require('../configs/config');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { authRouter, userRouter} = require('../lesson4/routers');

app.use('/users', userRouter);
app.use('/auth', authRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, request, response, next) => {
    response
        .status(err.status || 500)
        .json({
            msg: err.message
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
