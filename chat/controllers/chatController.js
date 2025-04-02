const Chat = require('../models/chatModel');
const { errorHandler } = require('../errorHandler/error');
const axios = require("axios");
const { response } = require('express');

// TO SEND MESSAGES 
const createChat = (req, res)=> errorHandler(async ()=> {
  const { room, message } = req.body;
  const sender = req.user.id;
  const sender_name = req.user.username
  const token = req.user.token;
  console.log("token : ",token);
  
 const project = await axios.get('http://projects:4000/api/v1/project/find/'+room,{
  headers : {
    Authorization : token
  }
 });
  if(!project.data)
  {
    return res.status(400).json({message : "project not found :("})
  }
  
  const chat = new Chat({ room, sender , sender_name, message });
  await chat.save();
  const messages = await Chat.find({ room } , {sender_name : 1 , message : 1  , room : 1});
  return res.status(201).json({messages });
})(req, res);
// TO GET ALL MESSAGES BY ROOM ID 
const getMessages = (req, res)=> errorHandler(async ()=> {
  const { room } = req.params;
  const messages = await Chat.find({ room });
  return res.status(200).json({ messages });
})(req, res);

// TO DELETE A SPECIFIC MESSAGE BY MESSAGE ID
const deleteMessage = (req, res)=> errorHandler(async ()=>{
  const { chatId } = req.params;
  const chat = await Chat.findByIdAndDelete(chatId);
  return res.status(200).json({ deleted: true, chat });
})(req, res);

// TO MODIFY MESSAGE BY MESSAGE ID
const updateMessage = (req, res)=> errorHandler(async ()=>{
  const { chatId } = req.params;
  const { message } = req.body;
  const chat = await Chat.findByIdAndUpdate(chatId, { message }, { new: true });
  return res.status(200).json({ updated: true, chat });
})(req, res);

// EXPORTS ALL FUNCTIONS TO USE IT ON ROUTES
module.exports = { createChat, getMessages, deleteMessage, updateMessage }