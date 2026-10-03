const app = require('./src/app.js')
const {createServer} = require('http')
const {Server} = require('socket.io')

const httpServer = createServer(app)
const io = new Server(httpServer)

io.on("connection", (socket) => {
    console.log('a user connected', socket.id)

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
    })   
})


httpServer.listen(3000,()=>{
    console.log('Server is running on port 3000')
})