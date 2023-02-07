const Joi = require('joi')
const helper = require("../helper/Helper")

module.exports = {
    async userAddValidation(req) {
        const schema = Joi.object({
            name: Joi.string().min(3).max(25).trim(true).required(),
            email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).trim(true).required(),
            password: Joi.string().min(5).required(),
            phone: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
            gender: Joi.string().valid("male","female").required(),
            profileImage: Joi.string().required(),
        }).unknown(true);
        const {error} = schema.validate(req);
        if (error) {
            return helper.validationMessageKey("validation", error);
        }
        return null;
    },
    async logInValidation(req) {
        const schema = Joi.object({
            email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).trim(true).required(),
            password: Joi.string().required(),
        }).unknown(true);
        const {error} = schema.validate(req);
        if (error) {
            return helper.validationMessageKey("validation", error);
        }
        return null;
    },
}