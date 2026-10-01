const jwt = require('jsonwebtoken')
const userModel = require("../models/user.model.js")

async function authMiddleware(req,res,next){
    const token = req.cookies.token

    console.log(token)

    if(!token){
        return res.status(401).json({message:"Unauthorized, please login again"})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)
        req.user = user;
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message:"Invalid token, please login again"
        })
    }
    next()
}

module.exports = authMiddleware