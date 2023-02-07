const Joi = require('joi')
const helper = require("../helper/Helper")

module.exports = {
    async categoryValidation(req) {
        const schema = Joi.object({
            categoryName: Joi.string().min(3).max(25).trim(true).required(),
            categoryDescription: Joi.string().min(3).max(50).trim(true).required()
        }).unknown(true);
        const {error} = schema.validate(req);
        if (error) {
            return helper.validationMessageKey("validation", error);
        }
        return null;
    },
    async editCategoryValidation(req) {
        const schema = Joi.object({
            categoryId: Joi.string().required(),
            categoryName: Joi.string().min(3).max(25).trim(true),
            categoryDescription: Joi.string().min(3).max(50).trim(true),
        }).unknown(true);
        const {error} = schema.validate(req);
        if (error) {
            return helper.validationMessageKey("validation", error);
        }
        return null;
    }
}