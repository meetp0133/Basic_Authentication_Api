const userModel = require("../models/user.model")
const {success, error} = require("../helper/responseHelper")
const transformer = require("../transformer/userTransformer")
const {userAddValidation, logInValidation} = require("../validation/userValidation")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        let reqParam = req.body

        if (req.file && req.file.filename) reqParam.profileImage = req.file.filename

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
            Profile_Image: userExist.profileImage,
        }
        const token = await jwt.sign(tokenData, "tOpSeCretaeKey", {expiresIn: "365d"})
        const response = await transformer.signInTransformer(userExist)
        return success(res, 1, "Log-in successfully", 200, response, {token: token})
    } catch (e) {
        return error(res, "Something wrong.", 500)

    }
}

exports.viewProfile = async (req, res) => {
    try {
        const userId = req.user._id

        const fineUser = await userModel.findOne({_id: userId, status: 1})
        if (!fineUser) return error(res, "User Not Found..!!!", 400)

        const response = await transformer.userTransformer(fineUser)
        return success(res, 1, "user details..!!", 200, response)
    } catch (e) {
        return error(res, "Something wrong.", 500)

    }

}

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user._id
        let reqParam = req.body
        let findUser = await userModel.findOne({_id: userId, status: 1})
        if (!findUser) return success(res, 0, "User not found", 200)
        findUser.name = reqParam?.name ? reqParam.name : findUser.name
        findUser.email = reqParam?.email ? reqParam.email : findUser.email
        findUser.phone = reqParam?.phone ? reqParam.phone : findUser.phone
        findUser.gender = reqParam?.gender ? reqParam.gender : findUser.gender

        await findUser.save()
        const response = await transformer.userTransformer(findUser)
        return success(res, 1, "Profile Updated successfully", 200, response)
    } catch (e) {
        return error(res, "Something wrong.", 500)

    }
}

exports.changePassword = async (req, res) => {
    try {
        const userId = req.user._id
        let reqParam = req.body
        let foundUser = await userModel.findOne({_id: userId, status: 1})

        if (foundUser) {
            const passVerify = await bcrypt.compare(reqParam.oldPassword, foundUser.password)
            if (passVerify) {
                if (reqParam.oldPassword == reqParam.newPassword) {
                    return success(res, 0, "Current password and new password cannot be same.", 400);
                }
                const newPassword = await bcrypt.hash(reqParam.newPassword, 10)
                await foundUser.updateOne({password: newPassword})
                return success(res, 1, "Password updated successfully", 200);
            } else {
                return error(res, "Please enter valid password.", 400);
            }
        }
        return success(res, 1, "Profile Updated successfully", 200,/*response*/)
    } catch (e) {
        return error(res, "Something wrong.", 500)

    }
}