const postModel = require("../models/post.model.js")

function createPostController(req,res){
    const file = req.file;
    if(!file){
        return res.status(400).json({
            message:"No file uploaded"
        })
    }
    
}

module.exports = createPostController