const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
const passport = require("passport");
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


// Postgres Connection

let db = require('./database');
db.model = require('./models/index');
db.sync({ force: true })

// End of Postgres Connections

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// API Public Routes - No Auth Required
app.use('/api/users', users);

// Restricted Routes - Auth Required
app.use('/api/restricted', restricted);

const port = process.env.PORT || 8081; // process.env.port is Heroku's port, otherwise 8081 - undecided which vps to use, running locally for now

app.listen(port, () => {
    console.log(`Server up and running on port ${port} !`)   
});
