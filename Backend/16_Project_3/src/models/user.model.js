const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    }
})

const userModel = model('User', userSchema)

module.exports = userModel