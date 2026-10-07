const userModel = require('../models/user.model.js')
const { verify } = require('jsonwebtoken')

async function authUser(req,res,next){
    const {token} = req.cookies;

    if(!token){
        res
        .status(401)
        .json({
            message:"Unauthorized"
        })
    }

    try {
        const decoded = verify(token,process.env.JWT_SECRET)

        const user =  await userModel.findById(decoded.id)
        console.log(user)

        req.user = user;
        next()
    } catch (error) {
        res
        .status(401)
        .json({
            message:"Unauthorized"
        })
    }
}

module.exports = {authUser}