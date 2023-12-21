const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()
mongoose.set('strictQuery', false);


const connectDB = async () => {
    try {
        const SERVER = process.env.LOCAL_URI;
        const conn = await mongoose.connect(SERVER, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`connected at ${conn.connection.host}`)
    } catch (error) {
        console.log(`${error}`)

    }
}

module.exports = connectDB;