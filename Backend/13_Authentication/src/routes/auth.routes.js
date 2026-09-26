const { Router } = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')


const router = Router()

router.post('/register',async(req,res)=>{
    const {username,password} = req.body

    const newUser = await userModel.create({
        username,
        password
    })

    const token = jwt.sign({
        id:newUser._id
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message:"User registered successfully",
        user:newUser,
        token
    })
})

router.post('/login',async(req,res)=>{
    const {username,password} = req.body

    // check user already exist or not
    const user = await userModel.findOne({username})

    if(!user){
        return res.status(401).json({
            message:"User not found"
        })
    }

    const isPasswordValid = password === user.password

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    res.status(200).json({
        message:"User logged in successfully"
    })
})

router.get('/user',async(req,res)=>{
    const {token} = req.cookies

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }

    try {
        const decodedData = jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findById(decodedData.id).select("-password")

        return res.status(200).json({
            message:"User data fetched successfully!",
            user
        })
        
    } catch (error) {
        return res.status(403).json({
            message:"Unauthorized - invalid token"
        })
    }

})



module.exports = router;