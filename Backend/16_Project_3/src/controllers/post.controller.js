const postModel = require("../models/post.model.js");
const { generateCaption } = require("../services/gemini.service.js");
const { uploadFile } = require("../services/imagekit.service.js");

async function createPostController(req, res) {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const [caption, imageKitResponse] = await Promise.all([
            generateCaption(file),
            uploadFile(file)
        ]);

        const post = await postModel.create({
            userId: req.user._id,
            caption,
            image: imageKitResponse.url
        });

        return res.status(201).json({
            message: "Post created successfully",
            post
        });
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({
            message: "Failed to create post",
            error: error.message
        });
    }
}

module.exports = { createPostController };