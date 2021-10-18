const router = require('express').Router();

const { authMiddleware, userMiddleware } = require('../middlewares');
const { userController } = require('../controllers');
const userValidator = require('../validators/user.validator');

router.get('/', userController.getUsersL4);

router.post(
    '/',
    userMiddleware.isUserBodyValid(userValidator.createUserValidator),
    userMiddleware.createUserMiddleware,
    userController.createUser);

router.get(
    '/:user_id',
    userMiddleware.findUserWithId,
    userController.getUserById);

router.delete(
    '/:user_id',
    userMiddleware.findUserWithId,
    userController.deleteUser);

router.delete('/', authMiddleware.chekAccessToken, userController.deleteAccount);

router.put(
    '/:user_id',
    userMiddleware.isUserBodyValid(userValidator.updateUserValidator),
    userMiddleware.findUserWithId,
    userController.updateUser);

module.exports = router;

