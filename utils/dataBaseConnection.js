const mongoose  = require('mongoose');


const dotenv = require("dotenv");

dotenv.config();

const {MONGO_DEVELOPMENT_URL,MONGO_LIVE_URL } = process.env

module.exports =  async function startDBConnection(){
    try {
        const url  = process.env.NODE_ENV == 'development' ?
         MONGO_DEVELOPMENT_URL : MONGO_LIVE_URL;
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        const db = mongoose.connection
        db.once("open",()=>{
            console.log('Successfully connected to database....');
        })


    } catch (error ) {
        console.log(error,"Error Connecting to the database...")

    }
}