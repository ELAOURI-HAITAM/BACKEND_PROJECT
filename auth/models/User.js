const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username :{type: String , required:[true , "username is required"] , unique: true},
    email :{type: String , required:true , unique: true},
    password :{type: String , required:true },
    role :{type: String , enum:["admin","membre","invité"] , default: "invité"},
    blocked :{type:Boolean , default:false}
})

module.exports = mongoose.model("User" ,UserSchema)