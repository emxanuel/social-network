require('dotenv').config();
const express = require('express');
const app = express();
const port = 80;
const {dbService} = require('./services/db-service')
const bodyParser = require('body-parser')
const server = require('http').Server(app)
const WebSocketServer = require('websocket').server;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.8.147:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(bodyParser.json())
require('./routes')(app, dbService())

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

wsServer.on('request', (request) => {
    const connection = request.accept(null, request.origin);
    connection.on('message', (message) => {
        console.log('message: ' + message.utf8Data)
        connection.sendUTF(message.utf8Data)
    })

    connection.on('close', (code, desc) => {
        console.log('client disconnected')
    })
})

app.listen(port, () => {
    console.log("app listen in port: " + port)
})

server.listen(81, () => {
    console.log('websocket app listen in port: ' + 81)
})