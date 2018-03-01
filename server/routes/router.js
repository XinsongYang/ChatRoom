const router = require('koa-router')();
const userController = require('../controllers/user');
const uploadController = require('../controllers/upload');

router.post('/api/user/signup', userController.signup)
    .post('/api/user/login', userController.login)    
    .get('/api/user/logout', userController.logout)
    .get('/api/user/info', userController.getUser)
    .post('/api/upload', uploadController.upload);


module.exports = router;