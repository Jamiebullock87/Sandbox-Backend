const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require('./routes/users');
const restricted = require('./routes/restricted');

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    }),
    cors()
);
app.use(bodyParser.json());

// Websocket
const WebSocket = require('ws');
const wss = new WebSocket.Server({
    port: 8000,
    perMessageDeflate: false
});

// Need to extend this more to allow auth and user recognition
// Perhaps with tokens?
wss.on('connection', function connection(ws) {
    ws.send('User Connected');
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        ws.send(message);
    });
    ws.on('open', function open() {
        ws.send('something');
    });
});



// Socket IO 
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// io.on('connection', function(socket){
//     io.emit('user connected', 'Jamie');
//     socket.on('connect', function(user){
//         console.log('a user connected');
//     });

//     socket.on('user-join', function(user) {
//         io.emit('user-join')
//     });

//     socket.on('chat-message', (message) => {
//         console.log('Received a message', message)
//         io.emit('chat-message', message);
//     });

//     socket.on('disconnect', function(){
//         console.log('User Disconnected');
//     });
// });
// io.listen(8000);

// DB Config
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose
.connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('MongoDB successfully connected'))
.catch(err => console.log(err));

// Make Mongoose use `findOneAndUpdate()`.
mongoose.set('useFindAndModify', false);

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
