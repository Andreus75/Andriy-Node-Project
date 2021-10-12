const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.post(
    '/',
    authMiddleware.authEmailAndPasswordValid,
    authMiddleware.authUserToEmail,
    authMiddleware.authUserToPassword,
    authController.login);

module.exports = router;
