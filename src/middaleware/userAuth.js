const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");
const responseHelper = require("../helper/responseHelper")

exports.authToken = async (req,res,next) =>{
    try {
        const token = req.header('Authorization').replace("Bearer",'');

        let decode = await jwt.verify(token,"tOpSeCretaeKey");
        if(!decode) return responseHelper.error(res,"Token Expired..!!",400)
        const user = await userModel.findOne({_id:decode._id});

        if(!user) return responseHelper.error(res,"Token Expired..!!",400)

        req.user = decode

        await next()
    }catch (e) {
        return responseHelper.error(res, "Invalid token.", 500)

    }
}
