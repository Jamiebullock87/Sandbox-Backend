const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const SessionSchema = new Schema({
    useragent: {
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
    expiry: {
        type: Date,
        required: true
    }
}, {timestamps: true});

SessionSchema.index( ({ expiry: 1 }, { expireAfterSeconds : 0 }) )
module.exports = Session = mongoose.model("sessions", SessionSchema);