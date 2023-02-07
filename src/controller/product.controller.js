const productModel = require("../models/product.model")
const {success, error} = require("../helper/responseHelper")
const trasformer = require("../transformer/productTransformer")
const {addProductValidation, editProductValidation} = require("../validation/productValidation")

exports.addEditProduct = async (req, res) => {
    try {
        let reqParam = req.body;

        if (req.file && req.file.filename) reqParam.productImage = req.file.filename

        let exitingProduct

        if (reqParam.productId) {
            const validationMessage = await editProductValidation(reqParam);
            if (validationMessage) return error(res, validationMessage, 400)

            exitingProduct = await productModel.findOne({_id: reqParam.productId, status: {$ne: 3}});
            if (!exitingProduct) return success(res, 0, "Product not found.", 200);
        } else {
            const validationMessage = await addProductValidation(req.body);
            if (validationMessage) return error(res, validationMessage, 400)

            exitingProduct = await productModel.findOne({productName: req.body.productName});
            if (exitingProduct) return success(res, 0, "Product already exists.", 200)

            exitingProduct = new productModel();
        }

        exitingProduct.categoryId = reqParam?.categoryId ? reqParam.categoryId : exitingProduct.categoryId
        exitingProduct.productName = reqParam?.productName ? reqParam.productName : exitingProduct.productName
        exitingProduct.price = reqParam?.price ? reqParam.price : exitingProduct.price
        exitingProduct.stock = reqParam?.stock ? reqParam.stock : exitingProduct.stock
        exitingProduct.productDescription = reqParam?.productDescription ? reqParam.productDescription : exitingProduct.productDescription
        exitingProduct.productImage = reqParam?.productImage ? reqParam.productImage : exitingProduct.productImage

        await exitingProduct.save();

        const response = trasformer.productTransformDetails(exitingProduct)

        if (reqParam.categoryId) {
            return success(res, 1, "Product edited successfully", 200, response)
        }
        return success(res, 1, "Product added successfully", 200, response)

    } catch (e) {
        return error(res, "Something Went Wrong", 500);
    }
}

exports.listProduct = async (req, res) => {
    try {
        const categoryList = await productModel.find({status: 1})
        const response = await trasformer.listProductTransformer(categoryList)
        return success(res, 1, "category listed successfully", 200, response)
    } catch (e) {
        return error(res, "Something Went Wrong", 500);
    }
}
