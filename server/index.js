import express, { json, response, urlencoded } from 'express';
import { createServer } from 'node:http';
import { Server, Socket } from 'socket.io';
import cors from 'cors'
import { readFileSync, writeFileSync } from 'node:fs';

const app = express()
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}))
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:3001']
    }
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (request, response, next) {
    request.io = io;
    next();
});
const messages = []

app.get('/', (req, res) => {
    console.log(req.io)
    res.status(200).send('message received')
})

app.post('/', (req, res) => {
    req.io.emit('receive', req.body)
    res.status(200).send('msg received')

})

io.on("connection", (socket, error) => {
    socket.join('majorRooom')
    console.log('connected a user', socket.id)

    socket.on('msgSent', (msg, callback) => {
        socket.emit('receive', msg)
        console.log(msg)


    });




    socket.on('disconnect', (data) => {
        console.log('disconnected', data)
    })



});

io.on('disconnect', () => {
    console.log('user disconnected');
});
httpServer.listen(4000, () => {
    console.log('listening at 4000')
})
