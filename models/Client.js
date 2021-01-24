const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ClientSchema = new Schema({
    identifier: {
        type: String,
        required: true,
        default: ''
    },
    name: {
        type: String,
        required: true,
        default: '',
    },
    telephone: {
        type: Number,
        required: false,
        default: '',
    },
    contact: {
        type: String,
        required: false,
        default: '',
    },
    directTelephone: {
        type: Number,
        required: false,
        default: ''
    },
    email: {
        type: String,
        required: true
    },
}, {timestamps: true});
module.exports = Client = mongoose.model("clients", ClientSchema);