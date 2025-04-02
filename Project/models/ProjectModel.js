const { default: mongoose, Schema } = require("mongoose");

const projectSchema = new Schema({
   nom : {type : String , required : true}, 
   description : {type : String , required : true}, 
   date_debut : {type : Date , required : true}, 
   date_fin : {type : Date , required : true}, 
   status : {type : String , enum : ['terminer' , 'en cours'] , default : 'en cours'  , required : true}, 
   category_id : {type : mongoose.Types.ObjectId , ref : 'Categorie' , required : true}, 
})
const ProjectModel = mongoose.model('Project' , projectSchema)
module.exports = ProjectModel