module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/testDB',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'zzz',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'aaa',

    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD
};

