const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const PORT = 8080;
const server = http.createServer(express);
const wss = new WebSocket.Server({
    server
});

wss.on('connection', function connection(ws) {
    console.log('new client connected');
    ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        })
    })
})

server.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}`);
})

// https://javascript-conference.com/blog/real-time-in-angular-a-journey-into-websocket-and-rxjs/
// https://www.youtube.com/watch?v=RL_E56NPSN0&ab_channel=KarlHadwen