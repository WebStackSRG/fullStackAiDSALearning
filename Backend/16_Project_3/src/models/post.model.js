const {Schema,model} = require('mongoose')

const postSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    caption:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const postModel  = model('Post',postSchema)

module.exports = postModel