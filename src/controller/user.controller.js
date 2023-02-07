const userModel = require("../models/user.model")
const {success, error} = require("../helper/responseHelper")
const transformer = require("../transformer/userTransformer")
const {userAddValidation, logInValidation} = require("../validation/userValidation")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        let reqParam = req.body
        const validationMessage = await userAddValidation(reqParam)
        if (validationMessage) return error(res, validationMessage, 400)

        const user = new userModel(reqParam)

        const userExist = await userModel.findOne({email: reqParam.email, status: 1})
        if (userExist) return success(res, 0, "User email already exist.", 200)

        user.password = await bcrypt.hashSync(reqParam.password, 10)

        await user.save()

        const response = await transformer.userTransformer(user)
        return success(res, 1, "User added successfully", 200, response)
    } catch (e) {
        return error(res, "Something wrong.", 500)
    }
}

exports.login = async (req, res) => {
    try {
        const reqParam = req.body

        const validationMessage = await logInValidation(reqParam)
        if (validationMessage) return error(res, validationMessage, 400)

        const userExist = await userModel.findOne({email: reqParam.email, status: 1})
        if (!userExist) return error(res, "Use not found", 400)

        const verify = await bcrypt.compare(reqParam.password, userExist.password)
        if (!verify) {
            return error(res, "Invalid password", 400)
        }

        const tokenData = {
            _id: userExist._id,
            Name: userExist.name,
            Email: userExist.email,
            Phone: userExist.phone,
            Gender: userExist.gender,
        }
        const token = await jwt.sign(tokenData, "tOpSeCretaeKey", {expiresIn: "365d"})
        const response = await transformer.signInTransformer(userExist)
        return success(res, 1, "Log-in successfully", 200, response, {token: token})
    } catch (e) {
        return error(res, "Something wrong.", 500)

    }
}

exports.viewProfile = async (req,res) =>{
    const userId = req.user
    console.log("userIduserId",userId)
    const fineUser = await userModel.findOne({_id:userId,status:1})
    if(!fineUser)return error(res, "User Not Found..!!!", 400)

    const response = await transformer.userTransformer(fineUser)
    return success(res,1,"user details..!!",200,response)

}