const {Schema,model} = require('mongoose')

const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const userModel = model('User',userSchema)

module.exports = userModel
