const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    status: {
        type: Number,
        default: 1,
        enum: [1, 2, 3]
    },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        index:true
    },
    productImage:{
        type:String
    },
    productName: {
        type:String
    },
    productDescription:{
        type:String
    },
    price: {
        type:Number
    },
    stock:{
        type:Number
    }

},{collection:"product",timestamps:true});

const productModel = new mongoose.model("product",productSchema)
module.exports = productModel;
