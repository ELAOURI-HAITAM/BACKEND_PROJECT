const express = require("express");
const Router = express.Router();
const { createTask, getTasks, getTask, updateTask, deleteTask, assignTaskToUser, removeTaskFromUser, getTaskByStatus, createComment, getComments, deleteComment, getUserTasks } = require("../controllers/taskManager");
const { authMiddleware } = require("../middlewares/authenticate");

// Crud 
Router.use(authMiddleware);
Router.post('/task/create', createTask);
Router.get("/tasks", getTasks);
Router.get("/tasks/:id", getTask);
Router.put("/tasks/:id", updateTask);
Router.delete("/tasks/:id", deleteTask);
Router.get("/tasksByStatus/:status", getTaskByStatus);

// Assign task to user
Router.get("/userTasks/:userId", getUserTasks);
Router.post("/userTask", assignTaskToUser);
Router.delete("/userTask/:id", removeTaskFromUser);

// task comments
Router.post("/comment", createComment);
Router.get("/comments/:userId/:taskId", getComments);
Router.delete("/comments/:id", deleteComment);

module.exports = Router;