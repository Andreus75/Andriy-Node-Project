const router = require('express').Router();

const userController3 = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController3.getUsers);

router.post('/', userMiddleware.createUserMiddleware, userController3.createUser);

// router.post('/auth', userMiddleware.authUserMiddleware, userController3.userAuth);

router.get('/:user_id', userController3.getUserById);

router.delete('/:user_id', userController3.deleteUser);

module.exports = router;

