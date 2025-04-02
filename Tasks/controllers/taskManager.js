const { errorHandler } = require("../errorHandler/error");
const { Task, UserTask, TaskComment } = require("../models/taskManager");
const axios = require("axios");

// ADD NEW TASK
const createTask = (req, res) =>
  errorHandler(async () => {
    const { titre, description, priorite, deadline, status } = req.body;
    const task = new Task({ titre, description, priorite, deadline, status });
    await task.save();
    res.status(200).json(task);
  })(req, res);

// GET ALL TASKS
const getTasks = (req, res) =>
  errorHandler(async () => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  })(req, res);

//GET SPECIFIC TASK BY ID
const getTask = (req, res) =>
  errorHandler(async () => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }
    res.status(200).json(task);
  })(req, res);

//MODIFY TASK BY ID
const updateTask = (req, res) =>
  errorHandler(async () => {
    const { id } = req.params;
    const { titre, description, priorite, deadline, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      { titre, description, priorite, deadline, status },
      { new: true }
    );
    if (!task) {
      throw new Error("Task not found");
    }
    res.status(200).json(task);
  })(req, res);

//DELETE TASK BY ID
const deleteTask = (req, res) =>
  errorHandler(async () => {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      throw new Error("Task not found");
    }
    res.status(200).json({ message: "Task deleted successfully" });
  })(req, res);

//GET ALL TASKS BY SPECIFIC USER ID
// test commit
const getUserTasks = (req, res) =>
  errorHandler(async () => {
    const userId = req.params.userId;
    const tasks = await UserTask.find({user : userId});
    res.status(200).json(tasks);
  })(req, res);

//ASSIGN TASK TO SPECIFIC USER
const assignTaskToUser = (req, res) =>
  errorHandler(async () => {
    const { user, task } = req.body;
    await axios.get('http://auth:5000/api/v1/users/'+user, {
      headers: {
        Authorization: 'Bearer '+req.user.token
      }
    })
    const taskExist = await Task.findById(task);
    if(!taskExist) {
      throw new Error('Task not found');
    }
    const assign = new UserTask({ user, task });
    await assign.save();
    res.status(200).json(assign);
  })(req, res);

// REMOVE TASK FROM SPECIFIC USER
const removeTaskFromUser = (req, res) =>
  errorHandler(async () => {
    const { id } = req.params;
    const task = await UserTask.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }
    await task.deleteOne();
    res.status(200).json({ deleted: true });
  })(req, res);

//GET TASK BY SPECIFIC STATUS
const getTaskByStatus = (req, res) =>
  errorHandler(async () => {
    const { status } = req.params;
    const tasks = await Task.find({ status });
    res.status(200).json(tasks);
  })(req, res);

//ADD COMMENT
const createComment = (req, res) =>
  errorHandler(async () => {
    const { user_id, task_id, comment } = req.body;
    const taskComment = new TaskComment({
      user: user_id,
      task: task_id,
      comment,
    });
    await taskComment.save();
    res.status(200).json(taskComment);
  })(req, res);

//GET ALL COMMENTS BY USER ID AND TASK ID
const getComments = (req, res) =>
  errorHandler(async () => {
    const { userId, taskId } = req.params;
    const comments = await TaskComment.find({ user: userId, task: taskId });
    res.status(200).json(comments);
  })(req, res);

// DELETE SPECIFIC COMMENT BY ID
const deleteComment = (req, res) =>
  errorHandler(async () => {
    const { id } = req.params;
    const comment = await TaskComment.findByIdAndDelete(id);
    if (!comment) {
      throw new Error("Comment not found");
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  })(req, res);

//EXPORTS FUNCTIONS TO USE IT ON ROUTES
module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  assignTaskToUser,
  removeTaskFromUser,
  getTaskByStatus,
  createComment,
  getComments,
  deleteComment,
  getUserTasks,
};
