const express = require("express");
const indexRoutes = require("./routes/index.routes.js");


const app = express();

app.use((req,res,next)=>{
    console.log("This is middleware between app and route")
    next()
})

app.use("/", indexRoutes)


module.exports = app