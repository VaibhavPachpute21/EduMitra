const express=require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')

const connectDB = require('./config/config');
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users/', require('./routes/userRoutes'));

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
})