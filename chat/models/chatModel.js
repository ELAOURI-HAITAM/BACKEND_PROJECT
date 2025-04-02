const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        required: [true, 'sender is required']
    },
    sender_name : {
        type : String , required : true
    },
    room: {
        type: mongoose.Types.ObjectId,
        required: [true, 'room is required']
    },
    message: {
        type: String,
        required: [true, 'message is empty?!']
    }
})

const chatModel = mongoose.model('chat' , chatSchema)
module.exports = chatModel;