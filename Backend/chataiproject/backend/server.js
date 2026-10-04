require("dotenv").config()
const app = require('./src/app.js')
const {generateResponse} = require('./src/services/ai.service.js')

const {createServer} = require('http')
const {Server} = require('socket.io')


const httpServer = createServer(app)
const io = new Server(httpServer,{
    cors:{
        origin: "http://localhost:5174",
    }
})

io.on("connection", (socket) => {
    console.log('a user connected', socket.id)

    const chatHistory = []

    socket.on('ai-prompt', async (prompt) => {
        chatHistory.push({ role: 'user', parts: [{ text: prompt }] })
        const response = await generateResponse(chatHistory)
        chatHistory.push({ role: 'model', parts: [{ text: response }] })
        socket.emit('ai-response', response)
    }) 
})



httpServer.listen(3000,()=>{
    console.log('Server is running on port 3000')
})