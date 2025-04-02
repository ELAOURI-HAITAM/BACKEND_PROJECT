const mongoose = require("mongoose");

// TASK COLLECTION
const TaskSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: [true, "Le titre est requit"]
    },
    description: {
        type: String,
        default: "Write Your description here"
    },
    priorite: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    deadline: {
        type: Date,
        required: [true, "La date de deadline est requit"]
    },
    status: {
        type: String,
        enum: ["En cours", "Terminé", "Annulé"],
        default: "En cours"
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});


// USER TASK COLLECTION
const UserTaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "L'utilisateur id est requit"]
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: [true, "La tâche id est requit"]
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// TASK COMMENT COLLECTION
const TaskCommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "L'utilisateur id est requit"]
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: [true, "La tâche id est requit"]
    },
    comment: {
        type: String,
        required: [true, "Le commentaire est requit"]
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = {
    Task: mongoose.model("Task", TaskSchema),
    UserTask: mongoose.model("UserTask", UserTaskSchema),
    TaskComment: mongoose.model("TaskComment", TaskCommentSchema)
};