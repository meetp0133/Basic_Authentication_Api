const categoryModel = require("../models/category.model")
const {success,error} = require("../helper/responseHelper")
const trasformer = require("../transformer/categoryTransformer")
const {categoryValidation,editCategoryValidation} = require("../validation/categoryValidation")

exports.addEditCategory = async (req, res) => {
    try {
        let reqParam = req.body;

        if (req.file && req.file.filename) reqParam.categoryImage = req.file.filename

        let exitingCategory
        if (reqParam.categoryId) {
            const validationMessage = await editCategoryValidation(reqParam);
            if (validationMessage) return error(res, validationMessage, 400)

            exitingCategory = await categoryModel.findOne({_id: reqParam.categoryId, status: {$ne: 3}});
            if (!exitingCategory) return success(res, 0, "Category not found.", 200);

        } else {

            const validationMessage = await categoryValidation(req.body);
            if (validationMessage) return error(res, validationMessage, 400)

            exitingCategory = await categoryModel.findOne({categoryName: req.body.categoryName});
            if (exitingCategory) return success(res, 0, "Category already exists.", 200)
            exitingCategory = new categoryModel();
        }

        exitingCategory.categoryName = reqParam?.categoryName ? reqParam.categoryName : exitingCategory.categoryName
        exitingCategory.categoryDescription = reqParam?.categoryDescription ? reqParam.categoryDescription : exitingCategory.categoryDescription
        exitingCategory.status = reqParam?.status ? reqParam.status : exitingCategory.status
        exitingCategory.categoryImage = reqParam?.categoryImage ? reqParam.categoryImage : exitingCategory.categoryImage

        await exitingCategory.save();
        const response = trasformer.categoryTransformDetails(exitingCategory)
        if (reqParam.categoryId) {
            return success(res, 1, "Category edited successfully", 200, response)
        }
        return success(res, 1, "Category added successfully", 200, response)
    } catch (e) {
        return error(res, "Something Went Wrong", 500);
    }
}

exports.listCategory = async (req,res) =>{
    try{
        const categoryList = await categoryModel.find({status:1})
        const response = await trasformer.listCategoryTransformer(categoryList)
        return success(res,1,"category listed successfully",200,response)
    }catch (e) {
        return error(res, "Something Went Wrong", 500);
    }
}
