const express = require('express');
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser');
const colors = require('colors')
colors.enable()
require('dotenv').config();


app.use(cookieParser());

app.use(cors({credentials: true, origin: ['http://localhost:3000', process.env.LOCAL_IP]}))
// middleware
app.use(express.json());

// This is where we import the users routes function from our user.routes.js
require('./server/routes/user.routes')(app);
// This will fire our mongoose.connect statement to initialize our database connection
require('./server/config/mongoose.config');
app.listen(8000, () => console.log(colors.america(`Listening on port: 8000`)) );