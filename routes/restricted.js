const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/User");
// Load Session mode
const Session = require("../models/Session");

// @route GET api/restricted/authcheck
// @desc simple auth check to access dashboard
// @access Private
router.get("/authcheck", passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const ua = req.headers['user-agent'];
    const ip = req.connection.remoteAddress;
    Session.findOne({ token: token }).then((session) => {
        if (ip === session.ip && ua == session.useragent && session.valid) {
            console.log('dashboard retrieved session - restricted route');
            return res.sendStatus(200);
        }
    })
});

// @route GET api/restricted/getstats
// @desc fetch the data to populate the dashboard
// @access Private
router.post("/getstats", passport.authenticate('jwt', {session: false}), (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const ua = req.headers['user-agent'];
    const ip = req.connection.remoteAddress;
    console.log(req);

    Session.findOne({ token: token }).then((session) => {
        if (ip === session.ip && ua == session.useragent && session.valid) {
            console.log('dashboard data retrieved session - restricted route');
            Promise.all([
                User.find().estimatedDocumentCount(),
                Session.find().estimatedDocumentCount()
            ]).then(counts => {
                console.log(counts);
                res.json({
                    numberOfUsers: counts[0],
                    numberLoggedIn: counts[1]
                })
            })
        }
    })
});


// @route GET api/restricted/getprofile
// @desc get the user profile and return the data
// @access Private
router.post("/getprofile", passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log('reached restricted route');
    const token = req.headers.authorization.split(' ')[1];
    const ua = req.headers['user-agent'];
    const ip = req.connection.remoteAddress;
    Session.findOne({ token: token }).then((session) => {
        console.log(session);
        if (ip === session.ip && ua == session.useragent && session.valid) {
            console.log('getprofile session valid');
            User.findOne({ email: session.email }).then((user) => {
                console.log(user);
                return res.json({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    image: user.image,
                    whatTheme: user.whatTheme
                });
            })
        }
    })
});

// @route POST api/restricted/saveprofile
// @desc find the user session, update it, then update the user profile
// @access Private
router.post("/saveprofile", passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log('reached restricted route');
    const token = req.headers.authorization.split(' ')[1];
    const ua = req.headers['user-agent'];
    const ip = req.connection.remoteAddress;
    console.log(req.body);
    Session.findOneAndUpdate({token: token}, {$set:{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        image: req.body.image,
        whatTheme: req.body.whatTheme
    }}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        User.findOneAndUpdate({email: doc.email}, {$set:{
            firstName: doc.firstName,
            lastName: doc.lastName,
            image: doc.image,
            whatTheme: doc.whatTheme
        }}, {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
            return res.json(doc);
        });
    });     
});

module.exports = router;