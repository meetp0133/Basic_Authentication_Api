const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    status:{
        type:Number,
        enum:[1,2,3],
        default:1
    },
    categoryName:{
        type:String
    },
    categoryImage:{
        type:String
    },
    categoryDescription:{
        type:String
    }
},{collection:"category",timestamps:true})

const categoryModel = new mongoose.model('category',categorySchema)
module.exports = categoryModel