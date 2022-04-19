const mongoose  = require('mongoose');


const {MONGO_DEVELOPMENT_URL, MONGO_LIVE_URL } = process.env

module.exports =  async function startDBConnection(){
    try {
        const url  = process.env.NODE_ENV === 'production' ?
            "mongodb+srv://octave-talents:octave123talents@cluster0.jhoqd.mongodb.net/octave-talents?retryWrites=true&w=majority"
        : MONGO_DEVELOPMENT_URL;

        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        const db = mongoose.connection
        db.once("open",()=>{
            console.log(process.env);
            console.log('Successfully connected to database....');
        })


    } catch (error ) {
        console.log(error,"Error Connecting to the database...")

    }
}