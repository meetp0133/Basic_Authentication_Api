const express = require("express")
const app = new express()
require("./db/conn")
const port = process.env.PORT || 3000;

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("You are connected to server.")
})

const user = require("./routes/user.route")
app.use("/user",user)

app.listen(port,()=>{
    console.log(`Connection setup on http://localhost:${port}`)
})