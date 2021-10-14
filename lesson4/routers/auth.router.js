const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware} = require('../middlewares');
const {MANAGER} = require("../../configs/user_roles_enum");

router.post(
    '/',
    authMiddleware.authEmailAndPasswordValid,
    authMiddleware.authUserToEmail,
    authMiddleware.authUserToPassword,
    authController.login);

router.post(
    '/manager',
    authMiddleware.authEmailAndPasswordValid,
    authMiddleware.authUserToEmail,
    userMiddleware.checkUserRole([MANAGER]),
    authMiddleware.authUserToPassword,
    authController.login);

module.exports = router;
