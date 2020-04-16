const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SessionSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '43200s' } // 12 hour sessions
    },
    useragent: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    whatTheme: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    valid: {
        type: Boolean,
        required: true
    },
});

module.exports = Session = mongoose.model("sessions", SessionSchema);