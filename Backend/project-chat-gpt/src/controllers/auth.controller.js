const userModel = require('../models/user.model.js')
const {hash,compare} = require('bcryptjs')
const {sign} = require('jsonwebtoken')


async function registerUser(req,res){
    const {fullName:{firstName,lastName},email,password} = req.body

    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User Already Exists"
        }) 
    }

    const hashedPassword = await hash(password,10)

    const user = await userModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password:hashedPassword
    })

    const generatedToken = sign({id:user._id},process.env.JWT_SECRET)

    res.cookie("token",generatedToken)

    res.status(201).json({
        message:"User Registered Successfully.",
        user:{
            fullName:user.fullName,
            email:user.email
        }
    })
}

async function loginUser(req,res){
    const {email,password} = req.body

    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res
        .status(400)
        .json({
            message:"Invalid email or password"
        })
    }

    const isPasswordValid = await compare(password,user.password)

    if(!isPasswordValid){
        return res
        .status(400)
        .json({
            message:"Invalid email or password"
        })
    }

    const generatedToken = sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie("token",generatedToken)

    res
    .status(200)
    .json({
        message:"User logged in Successfully.",
        user:{
            email:user.email,
            _id:user._id,
            fullName:user.fullName
        }
    })

}

module.exports = {
    registerUser,
    loginUser
}