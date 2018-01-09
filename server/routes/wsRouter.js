const wsRouter = require('koa-router')();
const wsController = require('../controllers/websocket');

wsRouter.all('/ws/chat', wsController.chat);

module.exports = wsRouter;