const router = require('express').Router();

const { userController } = require('../controllers');
const userMiddleware = require('../middlewares/user.middleware');
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

router.put(
    '/:user_id',
    userMiddleware.isUserBodyValid(userValidator.updateUserValidator),
    userMiddleware.findUserWithId,
    userController.updateUser);

module.exports = router;

