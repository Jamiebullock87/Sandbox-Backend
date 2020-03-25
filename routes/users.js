const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/User");
// Load Session mode
const Session = require("../models/Session");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    });
});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 86400 // 1 year in seconds
                    },
                    (err, token) => {
                        // create session if token gets signed
                        const date = new Date();
                        date.setDate(date.getDate() + 1);
                        const addSession = new Session({
                            useragent: req.headers['user-agent'],
                            ip: req.connection.remoteAddress,
                            token: token,
                            valid: true,
                            expiry: date.toISOString() // expire day after creation if not logged out
                        });
                        
                        addSession.save(function (err, session) {
                            if (err) return console.error(err);
                            console.log('session created');
                        });
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

// @route POST api/users/logout
// @desc log out user and invalidate session
// @access Private
router.post("/logout", (req, res) => {
    const id = req.headers.authorization.split('Bearer ')[1];
    Session.deleteOne({token: id}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
            console.log('removed session', result)
        }
    });
});

// @route GET api/users/getprofile
// @desc get the user profile and return the data
// @access Private
router.post("/getprofile", (req, res) => {
    const email = req.body.email;
    // Adventure.findOne({ type: 'iphone' }, function (err, adventure) {});
    User.findOne({ email: email }).then((user) => {
        return res.json(user);
    })
});

// @route POST api/users/saveprofile
// @desc log out user and invalidate session
// @access Private
router.post("/saveprofile", (req, res) => {
    const email = req.body.email;
    console.log(req.body);
    // User.findOne({ email }).then((user) => {
    //     console.log(user);
    // })
    User.findOneAndUpdate({email: email}, {$set:{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        image: req.body.image,
        whatTheme: req.body.whatTheme
    }}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
    });
    
});

module.exports = router;