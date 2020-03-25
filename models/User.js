const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: false,
        default: '',
    },
    lastName: {
        type: String,
        required: false,
        default: '',
    },
    image: {
        type: String,
        required: false,
        default: '',
    },
    whatTheme: {
        type: String,
        required: false,
        default: 'dark',
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isSuper: {
        type: Boolean,
        default: false,
        required: false
    }
}, {timestamps: true});
module.exports = User = mongoose.model("users", UserSchema);