module.exports = {
    NODE_ENV: process.env.MONGO_CONNECT_URL || 'dev',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/testDB',
    PORT: process.env.PORT || 5000,

    HTTP: 'http://localhost:3000/',

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'zzz',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'aaa',
    JWT_ACTION_SECRET: process.env.JWT_REFRESH_SECRET || 'ppp',
    JWT_ACTION_FORGOT_SECRET: process.env.JWT_ACTION_FORGOT_SECRET || 'fff',

    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD,

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',

    DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,
};

