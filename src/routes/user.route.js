const express = require("express")
const userRoute = new express.Router
const controller = require("../controller/user.controller")
const {authToken} = require("../middaleware/userAuth")
const {uploadImage} = require("../middaleware/addImage")

userRoute.post("/register", uploadImage.single("profileImage"),controller.register)
userRoute.post("/log-in", controller.login)
userRoute.post("/view-profile", authToken, controller.viewProfile)
userRoute.post("/update-profile", authToken, controller.updateProfile)
userRoute.post("/update-password", authToken, controller.changePassword)

module.exports = userRoute