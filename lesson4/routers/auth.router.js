const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware} = require('../middlewares');
const {MANAGER} = require('../../configs/user_roles_enum');
const userValidator = require('../validators/user.validator');

router.post(
    '/',
    userMiddleware.isUserBodyValid(userValidator.passwordAndEmailValidator),
    authMiddleware.authUserToEmail,
    authMiddleware.authUserToPassword,
    authController.login);

router.post(
    '/manager',
    userMiddleware.isUserBodyValid(userValidator.passwordAndEmailValidator),
    authMiddleware.authUserToEmail,
    userMiddleware.checkUserRole([MANAGER]),
    authMiddleware.authUserToPassword,
    authController.login);

module.exports = router;
