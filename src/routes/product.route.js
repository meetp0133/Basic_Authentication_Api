const express = require("express")
const productRouter = new express.Router;
const controller = require("../controller/product.controller");
const {uploadProduct}  = require("../middaleware/addImage")

productRouter.post("/add-edit-product",uploadProduct.single('productImage'),controller.addEditProduct)
productRouter.post("/list-product",controller.listProduct)

module.exports = productRouter

