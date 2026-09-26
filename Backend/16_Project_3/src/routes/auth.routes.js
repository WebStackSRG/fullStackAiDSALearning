const express = require('express')
const { registerController, loginController } = require("../controllers/auth.controller")

const router = express.Router()

// which routes have which controller will be in routes.js file
router.post('/register', registerController)
router.post('/login', loginController)
// router.post('/user')


module.exports = router;