const express = require("express")
const categoryRouter = new express.Router;
const controller = require("../controller/category.controller");
const {uploadCategory}  = require("../middaleware/addImage")

categoryRouter.post("/add-edit-category",uploadCategory.single('categoryImage'),controller.addEditCategory)
categoryRouter.post("/list-category",controller.listCategory)

module.exports = categoryRouter

