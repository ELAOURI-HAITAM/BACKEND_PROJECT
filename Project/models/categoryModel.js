const { Schema, default: mongoose } = require("mongoose");

const categorySchema = new Schema(
    {
        categ : {type : String , required : true , unique : true}
    }
)

const categoryModel = mongoose.model('Categorie' , categorySchema)
module.exports = categoryModel