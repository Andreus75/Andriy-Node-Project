const router = require('express').Router();

const userController3 = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.post('/', userMiddleware.authUserMiddleware, userController3.userAuth);

module.exports = router;
