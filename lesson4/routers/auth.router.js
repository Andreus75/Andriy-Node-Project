const router = require('express').Router();

const userController4 = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.post('/', userMiddleware.authEmailAndPasswordValid, userMiddleware.authUserMiddleware, userController4.userAuth);

module.exports = router;
