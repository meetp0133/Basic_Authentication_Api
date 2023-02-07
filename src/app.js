const express = require("express")
const app = new express()
require("./db/conn")
const port = process.env.PORT || 3000;
const path = require("path")
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("You are connected to server.")
})

const user = require("./routes/user.route")
app.use("/user",user)

const category = require("./routes/category.route")
app.use("/category",category)

const product = require("./routes/product.route")
app.use("/product",product)

const publicDirectory = path.join(__dirname, "../");
app.use(express.static(publicDirectory))

app.listen(port,()=>{
    console.log(`Connection setup on http://localhost:${port}`)
})