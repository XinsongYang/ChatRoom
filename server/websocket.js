const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

module.exports = {
    
    createWebSocketServer(server) {
        let wss = new WebSocketServer({
            server: server
        });
        wss.on('connection', function connection(ws, req) {
            console.log("connected");
            console.log(req);
            const ip = req.connection.remoteAddress;
            console.log(ip);
            ws.on('message', function incoming(message) {
                console.log('received: %s', message);
                ws.send('response');
            });
        });
        return wss;
    }

}