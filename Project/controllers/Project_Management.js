const { request, response, Router } = require("express");
const { errorHandler } = require("../errorHandler/error");
const Projects = require("../models/ProjectModel");
const Categories = require('../models/categoryModel')


const welcom = (request, response) =>
  errorHandler(async () => {
    response.send("welcom to project route :)");
  })(request, response);

//READ ALL PROJECTS
const read_all = (request, response) =>
  errorHandler(async () => {
    const find_all =await Projects.find().populate({
      path: "category_id",
      select: "categ -_id",
    })
    response.status(200).send(find_all);
  })(request, response);


//CREATE CATEGORY
  const create_categ = (request , response)=>
    errorHandler(async () =>{
      const {categ} = request.body
      const new_categ = new Categories({categ})
      await new_categ.save()
      response.status(201).json({message : "category added successufly  :)" , categ : new_categ} )
    })(request , response)

//DISPLAY ALL CATEGORIES
const all_categ = (request , response)=>
  errorHandler(async () =>{
    const categories = await  Categories.find()
    response.status(200).send(categories)
  })(request , response)
 //CREATE PROJECT   
const create = (request, response) =>
  errorHandler(async () => {
    const { nom, description, date_debut, date_fin, status, category_id } =
      request.body;
    const find_categ = await Categories.findById(category_id)
    if(! find_categ)
    {
      return response.status(400).json({message : "category not found :( "})
    }
    const new_project =  new Projects({
      nom,
      description,
      date_debut,
      date_fin,
      status,
      category_id,
    });
   await new_project.save();
    response
      .status(201)
      .json({ message: "project added successufly :)", project: new_project });
  })(request, response);


  //UPDATE PROJECT
const update = (request, response) =>
  errorHandler(async () => {
    const { nom, description, date_debut, date_fin, status, category_id } =
      request.body;
    const project_id = request.params.id;
    
    if (!project_id) {
      return response.status(400).json({ message: "project not found " });
    }

    const update_project = await Projects.findByIdAndUpdate(project_id,{ nom, description, date_debut, date_fin, status, category_id })

    response.status(200).json({
      message: "project updated successufly :)",
      project: update_project,
    });
  })(request, response);


//DELETE PROJECT
const supprimer = (request, response) =>
  errorHandler(async () => {
    const project_id = request.params.id;
    if (!project_id) {
      return response.status(400).json({ message: "project not found " });
    }
    const delete_project = await Projects.findByIdAndDelete(project_id)
    response
      .status(200)
      .json({
        message: "project deleted successufly :)",
        project: delete_project,
      });
  })(request, response);

//READ ONE PROJECT BY ID
const read_one = (request , response) =>
  errorHandler(async () => 
  {
    const project_id = request.params.id
    const project = await Projects.findById(project_id).populate({path : 'category_id' , select : 'categ -_id'})
    if(!project)
    {
      return response.status(400).json({message : 'project not found :('})
    }
    response.status(200).send(project)

  })(request ,  response)


//FILTER PROJECT BY(NAME , STATUS , DATES)
const search = (request, response) =>
  errorHandler(async () => {
    const { nom, date_debut, date_fin, status } = request.query;
    const filter = {};
    if (nom) {
      filter.nom = nom;
    }

    if (status) {
      filter.status = status;
    }
    if (date_debut) {
      filter.date_debut = { $gte: new Date(date_debut) };
    }
    if (date_fin) {
      filter.date_fin = { $lte: new Date(date_fin) };
    }

    // I USE POPULATE FOR DISPLAY CATEGORY NAME INSTEAD OF CATEGORY ID
    const searching = await Projects.find(filter).populate({path : 'category_id' , select : "categ -_id"});
    response.send(searching);
  })(request, response);


module.exports = {
  welcom,
  create_categ,
  all_categ,
  read_all,
  read_one,
  create,
  update,
  supprimer,
  search,
};


