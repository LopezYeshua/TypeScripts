const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser');
const colors = require('colors');
const { users } = require('./server/data/users');
const { rooms } = require('./server/data/rooms')
colors.enable()
require('dotenv').config();


app.use(cookieParser());

app.use(cors({ credentials: true, origin: ['http://localhost:3000', process.env.LOCAL_IP] }))
// middleware
app.use(express.json());

// This is where we import the users routes function from our user.routes.js
require('./server/routes/user.routes')(app);
require('./server/routes/friends.routes')(app);
require('./server/routes/scores.routes')(app);
// This will fire our mongoose.connect statement to initialize our database connection
require('./server/config/mongoose.config');
const server = app.listen(8000, () => console.log(colors.america(`Listening on port: 8000`)));
const io = require('socket.io')(server, { cors: true })

let newRoom = {
    room: null,
    player1: null,
    player2: null,
}
io.on("connection", (socket) => {
    console.log("user connected: ", socket.id)


    socket.on("join room", ({ roomName, username }) => {



        const currentRoom = rooms.filter((room) => room === roomName)
        if (currentRoom) {
            console.log(currentRoom)
        }

        // check if room has a name. input new Room name if so, or nothing if not
        if (newRoom.room === null || newRoom.room !== roomName) {
            newRoom.room = roomName
            newRoom.player1 = null
            console.log(roomName)
        }

        if (newRoom.player1 === null) {
            newRoom.player1 = username
            rooms.push(newRoom)
            console.log("room queue: \n", rooms)
        } else {
            newRoom.player2 = username
            console.log("new user entered: \n", rooms)
        }

        // check if player1 is already in game
        newRoom.player2 === newRoom.player1 ? newRoom.player2 = null : null

        socket.join(roomName)
        // check if player2 is filled so players can start the game.
        io.to(roomName).emit("all users connected", newRoom.player2 === username)

        console.log("current socket room: \n", socket.rooms)
        io.to(roomName).emit("welcome message", roomName)
        
    })

    socket.on("send progress", ({roomName, progress}) => {
        for (const room of socket.rooms) {
            if (room === roomName) {
                console.log(room)
                socket.broadcast.to(room).emit("recieve opponent progress", progress)
            }
        }
    })

    socket.on("send wpm", ({wpm, roomName}) => {
        for (const room of socket.rooms) {
            if (room === roomName) {
                console.log(room)
                socket.broadcast.to(room).emit("recieve opponent wpm", wpm)
            }
        }
    })

// listen for user disconnection
    socket.on("disconnecting", (reason) => {
        //look for user id in room server
        for (const room of socket.rooms) {
            if (room !== socket.id) {

                // emit back that the user has left and set boolean to send back to client
                socket.to(room).emit("user disconnected", "user has left the game")
            }
        }
    })
})