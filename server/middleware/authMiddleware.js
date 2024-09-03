const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel.js")


//user must be loged in so this function can verify the token and procced
const protect = asyncHandler(async(req,res,next) => {


    let token 

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            //get token without Bearer name
            token=req.headers.authorization.split(" ")[1]

            //token id decoding
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select("-password")

            next()

        } catch (err) {
            res.status(401)
            throw new Error("Not authorized, token failed")

        }
    }

    if(!token) {
        res.status(401)
        throw new Error("Not authorized, no token")
    }




})

module.exports = { protect }  