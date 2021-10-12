const express = require('express');
const mongoose = require('mongoose');

const app = express();

const { MONGO_CONNECT_URL, PORT } = require('../configs/config');

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter4 = require('../lesson4/routers/user.router');
const authRouter4 =require('../lesson4/routers/auth.router');

app.use('/users', userRouter4);
app.use('/auth', authRouter4);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
