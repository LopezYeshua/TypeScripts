const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser');
const colors = require('colors');
const { users } = require('./server/data/users');
colors.enable()
require('dotenv').config();


app.use(cookieParser());

app.use(cors({credentials: true, origin: ['http://localhost:3000', process.env.LOCAL_IP]}))
// middleware
app.use(express.json());

// This is where we import the users routes function from our user.routes.js
require('./server/routes/user.routes')(app);
require('./server/routes/friends.routes')(app);
require('./server/routes/scores.routes')(app);
// This will fire our mongoose.connect statement to initialize our database connection
require('./server/config/mongoose.config');
const server = app.listen(8000, () => console.log(colors.america(`Listening on port: 8000`)) );
const io = require('socket.io')(server, {cors: true})

io.on("connection", (socket, room) => {
    console.log(socket.id)

    socket.on("user connected", (user) => {
        users.push(user)
        console.log(users.length)
    })

    socket.on("host room", (roomName, cb) => {
        console.log(roomName)
        socket.join(roomName)
    })

    socket.emit("all users connected", () => {
    })
})