const WebSocket = require('ws');

const PORT = 8081;

const wss = new WebSocket.Server({
    port: PORT
});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    });
});

// https://javascript-conference.com/blog/real-time-in-angular-a-journey-into-websocket-and-rxjs/
// https://www.youtube.com/watch?v=RL_E56NPSN0&ab_channel=KarlHadwen