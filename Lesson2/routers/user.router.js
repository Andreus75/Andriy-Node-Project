const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);

router.post('/', userController.createUser);

router.put('/', userController.updateUser);

router.get('/:user_id', userController.getUserById);

router.delete('/:user_id', userController.deleteUser);

module.exports = router;

