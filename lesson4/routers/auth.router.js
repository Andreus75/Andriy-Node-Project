const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.post(
    '/',
    userMiddleware.authEmailAndPasswordValid,
    userMiddleware.authUserToEmail,
    userMiddleware.authUserToPassword,
    authController.login);

module.exports = router;
