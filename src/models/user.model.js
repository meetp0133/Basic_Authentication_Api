const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    status:{
        type:Number,
        enum:[1,2,3],
        default:1
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
    gender:{
        type:String,
        enum:["male","female"]
    }
},{collection:"userAuth",timestamps:true})

const userModel = new mongoose.model('userAuth',userSchema)
module.exports = userModel