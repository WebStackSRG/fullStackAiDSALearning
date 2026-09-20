const express = require("express");


const router = express.Router();

router.use((req,res,next)=>{
    console.log("This is middleware between routes and api")
    next()
})


router.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    });
})


module.exports = router
