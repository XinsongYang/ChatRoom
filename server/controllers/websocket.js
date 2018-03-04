var messageIndex = 0;

function createMessage(type, user, data) {
    messageIndex++;
    return JSON.stringify({
        id: messageIndex,
        type: type,
        user: user,
        data: data,
        time: (new Date()).getTime()
    });
}

function broadcast(wss, message) {
    wss.clients.forEach(function (client) {
        client.send(message);
    });
}

module.exports = {

    async chat(ctx, next) {
        console.log('[WebSocket] connected.');
        const wss = ctx.app.ws.server;
        const user = ctx.session.user;
        ctx.websocket.user = user;

        // const sameUserClients = [];
        // wss.clients.forEach(function(client) {
        //     if (client.user.username === user.username) {
        //         sameUserClients.push(client);
        //     }
        // });
        // for (let i = 0; i < sameUserClients.length - 1; i++) {
        //      await sameUserClients[i].close();
        // }
        
        ctx.websocket.on('error', function (err) {
            console.log('[WebSocket] error: ' + err);
        });

        if (user) {
            let joinMessage = createMessage('join', user, `${user.username} joined.`);
            console.log("joined");
            broadcast(wss, joinMessage);
            
            let users = [];
            wss.clients.forEach(function(client) {
                users.push(client.user);
            });
            ctx.websocket.send(createMessage('list', user, users));

            ctx.websocket.on('message', function (str) {
                const received = JSON.parse(str);
                const newMessage = createMessage(received.type, user, received.data);
                broadcast(wss, newMessage);
            });
            ctx.websocket.on('close', function () {
                let leftMessage = createMessage('left', user, `${user.username} left.`);
                broadcast(wss, leftMessage);
                console.log('[WebSocket] closed');
            });
        } else {
            ctx.websocket.close(4001, 'Invalid user');
            console.log("[WebSocket] invalid user");
        }
    }

}