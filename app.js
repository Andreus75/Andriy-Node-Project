const express = require('express');
const mongoose = require('mongoose');

const app = express();

const { MONGO_CONNECT_URL, PORT } = require('./configs/config');

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});


