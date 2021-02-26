const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const { Client } = require('pg');

const users = require('./routes/users');
const restricted = require('./routes/restricted');

require('dotenv').config();

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    }),
    cors()
);
app.use(bodyParser.json());

// Socket IO 
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
    
    io.emit('user connected', 'Jamie');

    socket.on('connect', function(user){
        console.log('a user connected');
    });

    socket.on('chat-message', (message) => {
        console.log('Received a message', message)
        io.emit('chat-message', message);
    });
    socket.on('terminate', function (){
        console.log('connection closed');
        socket.disconnect();
    });

    socket.on('disconnect', function(){
        console.log('User Disconnected');
    });
});
io.listen(8000);


// Mongo DB Connections
// DB Config
// const db = require('./config/keys').mongoURI;
// Connect to MongoDB
// mongoose
// .connect(
    // db,
    // { useNewUrlParser: true, useUnifiedTopology: true }
// )
// .then(() => console.log('MongoDB successfully connected'))
// .catch(err => console.log(err));

// Make Mongoose use `findOneAndUpdate()`.
// mongoose.set('useFindAndModify', false);

// End of Mongo DB

// Postgres Connection

let db = require('./database');
db.model = require('./models/index');
db.sync({ force: true })
// .then(() => {
//     console.log("Drop and re-sync db.");
//     UserModel.bulkCreate([
//         {firstName: 'Jamie',lastName: 'bullock',image: 'testimg',whatTheme: 'dark',email: 'jamiebullock1987@gmail.com',password: 'badger',isSuper: true}
//     ]).then(function() {
//         return UserModel.findAll();
//     }).then(function(notes) {
//         console.log(notes);
//     });

// });

// End of Postgres Connections

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// API Public Routes - No Auth Required
app.use('/api/users', users);

// Restricted Routes - Auth Required
app.use('/api/restricted', restricted);

const port = process.env.PORT || 8081; // process.env.port is Heroku's port, otherwise 8081

app.listen(port, () => {
    console.log(`Server up and running on port ${port} !`)   
});
