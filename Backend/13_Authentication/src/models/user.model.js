const {Schema,model} = require('mongoose')


const userSchema = new Schema({
    username:String,
    password:String
})


const userModel = model("User",userSchema)

module.exports = userModel;