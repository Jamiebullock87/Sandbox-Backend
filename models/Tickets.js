const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TicketSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: ''
    },
    identifier: {
        type: String,
        required: true,
        default: ''
    },
    client: {
        type: String,
        required: true,
        default: ''
    },
    raised: {
        type: String,
        required: true,
        default: ''
    },
    title: {
        type: String,
        required: true,
        default: ''
    },
}, {timestamps: true});
module.exports = Ticket = mongoose.model("tickets", TicketSchema);