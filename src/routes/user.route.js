const express = require("express")
const userRoute = new express.Router
const controller = require("../controller/user.controller")
const {authToken} = require("../middaleware/userAuth")

userRoute.post("/register", controller.register)
userRoute.post("/log-in", controller.login)
userRoute.post("/view-profile", authToken, controller.viewProfile)

module.exports = userRoute