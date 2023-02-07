const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/Authentication",{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("Your are connected to Database..!!!")
}).catch((e)=>{
    console.log("Disconnected",e)
})