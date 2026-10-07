const {Schema,model} = require('mongoose')

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true 
    },
    fullName:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
    },
    password:{
        type:String
    }
},{
    timestamps:true
})

const userModel = model("user",userSchema)

module.exports = userModel