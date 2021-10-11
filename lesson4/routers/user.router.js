const router = require('express').Router();

const userController4 = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController4.getUsersL4);

router.post('/', userMiddleware.isUserBodyValid, userMiddleware.createUserMiddleware, userController4.createUser);

router.get('/:user_id', userMiddleware.findUserWithId, userController4.getUserById);

router.delete('/:user_id', userMiddleware.findUserWithId, userController4.deleteUser);

router.put('/:user_id', userMiddleware.isUserBodyValid, userController4.updateUser);

module.exports = router;

