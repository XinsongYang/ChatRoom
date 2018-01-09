const router = require('koa-router')();
const userController = require('../controllers/user');

router.post('/api/user/signup', userController.signup)
    .post('/api/user/login', userController.login)    
    .get('/api/user/logout', userController.logout)
    .get('/api/user/info', userController.getUser);


module.exports = router;