const {connect} = require('mongoose')

async function connectToDB(){
    try {
        await connect(process.env.MONGO_URI)
        console.log('connected to db...')
    } catch (error) {
        console.error("Error connecting to the database:",error)
    }
}

module.exports = connectToDB;