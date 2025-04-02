const express = require("express");
const Router = express.Router();
const { createChat, getMessages, deleteMessage, updateMessage } = require("../controllers/chatController");
const verifyToken = require("../middleware/auth");

Router.post('/chat', verifyToken, createChat);
Router.get('/chat/:room', verifyToken, getMessages);
Router.delete('/chat/:chatId', verifyToken, deleteMessage);
Router.patch('/chat/:chatId', verifyToken, updateMessage);

module.exports = Router;