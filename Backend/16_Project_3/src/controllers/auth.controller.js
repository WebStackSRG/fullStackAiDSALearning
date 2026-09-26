const userModel = require('../models/user.model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerController(req, res) {
    // extract data from body
    const { username, password } = req.body

    // check is user already exists or not
    const isUserAlreadyExist = await userModel.findOne({ username })

    // if user exists send error
    if (isUserAlreadyExist) {
        return res.status(400).json({ message: 'User already exists' })
    }

    // create user
    const user = await userModel.create({ username, password:await bcrypt.hash(password,10) })

    // generate token
    const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET
    )

    // store token in cookie
    res.cookie("token",token)

    // return response
    return res.status(201).json({
        success: true,
        message: 'User created successfully',
        user:{
            _id:user._id,
            username:user.username
        }
    })
}

async function loginController(req, res) {
    // extract data from body
    const {username,password} = req.body;

    // check user exists or not
    const user = await userModel.findOne({
        username
    })

    // if user not found send error
    if(!user){
        return res.status(404).json({ message: 'User not found' })
    }

    // check password valid or not
    const isPasswordValid = user.password === password

    // if password not valid send error
    if(!isPasswordValid){
        return res.status(401).json({ message: 'Invalid password' })
    }

    // generate token
    const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET
    )

    // store token in cookie
    res.cookie("token",token)

    // return response
    return res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        user
    })
}

module.exports = {
    registerController,
    loginController
}