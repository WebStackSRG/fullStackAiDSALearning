const express = require("express")
const authMiddleware = require("../middleware/auth.middleware.js");
const {createPostController} = require("../controllers/post.controller.js");
const multer = require("multer")

const upload = multer({storage:multer.memoryStorage()})

const router = express.Router()

router.post("/",authMiddleware,upload.single('image'),createPostController)

module.exports = router;