import geckos from '@geckos.io/server';
import http from 'http'
import express from 'express'
import _ from 'lodash';

const PORT = 8081;
const app = express();
const server = http.createServer(app);
const io = geckos();
io.addServer(server);
let onlineUsers = [];

io.listen(PORT); // default port is 9208

io.onConnection(channel => {
    channel.onDisconnect(() => {
        console.log(`${channel.id} got disconnected`)
        let tempArray = _.remove(onlineUsers, function (n) {
            return n.user == channel.id;
        })
        onlineUsers = tempArray;
    })

    channel.on('get users', (array) => {
        array = onlineUsers;
    })

    channel.on('add user', data => {
        onlineUsers.push(data);
        channel.emit('chat message', 'new user added')
        console.log(onlineUsers);
    })

    channel.on('chat message', data => {
        console.log(`got ${data} from "chat message"`)
        // emit the "chat message" data to all channels in the same room
        io.room(channel.roomId).emit('chat message', data)
    })
})