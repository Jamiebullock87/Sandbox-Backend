const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require('./routes/users');

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    }),
    cors()
);
app.use(bodyParser.json());
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
// API Routes
app.use('/api/users', users);


// Protected routes
app.get('/api/authorization', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('You reached the restricted route');
    res.send(req.user.profile);
});


const port = process.env.PORT || 8081; // process.env.port is Heroku's port, otherwise 8081

app.listen(port, () => {
    console.log(`Server up and running on port ${port} !`)   
});
