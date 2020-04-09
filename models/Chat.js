const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    message: {
      type: String
    },
    sender: {
      type: String
    }
}, {timestamps: true});

module.exports = Chat = mongoose.model("chatlog", ChatSchema);
