const Joi = require('joi')
const helper = require("../helper/Helper")

module.exports = {
    async addProductValidation(req) {
        const schema = Joi.object({
            categoryId: Joi.string().required(),
            productName: Joi.string().min(3).max(25).trim(true).required(),
            productDescription: Joi.string().min(3).max(50).trim(true).required(),
            price: Joi.number().required(),
            stock: Joi.number().required(),
            productImage: Joi.string().required(),
        }).unknown(true);
        const {error} = schema.validate(req);
        if (error) {
            return helper.validationMessageKey("validation", error);
        }
        return null;
    },
    async editProductValidation(req) {
        const schema = Joi.object({
            productId: Joi.string().required(),
            categoryId: Joi.string(),
            productName: Joi.string().min(3).max(25).trim(true),
            productDescription: Joi.string().min(3).max(50).trim(true),
            price: Joi.number(),
            stock: Joi.number(),
            productImage: Joi.string()

        }).unknown(true);
        const {error} = schema.validate(req);
        if (error) {
            return helper.validationMessageKey("validation", error);
        }
        return null;
    }
}