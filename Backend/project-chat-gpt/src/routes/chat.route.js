const express = require('express')
const {authUser} = require('../middlewares/auth.middleware.js')
const createChat = require('../controllers/chat.controller.js')

const router = express.Router()

router.post('/',authUser,createChat)

module.exports = router