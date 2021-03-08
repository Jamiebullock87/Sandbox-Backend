const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
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

app.use(fileUpload({
    limits: { fileSize: 500 * 2500 * 1500 },
}));

// Postgres Connection

let db = require('./database');
db.model = require('./models/index');
// Leave this commented out if working on the front end and need persistant db data
// Uncomment to sync db with code usefull when adding to the api, can just create a few new things in insomnia
// db.sync({ force: true })

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
