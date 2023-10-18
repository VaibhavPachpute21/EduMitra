const express=require('express');
const dotenv = require('dotenv');
const cors = require('cors')

const app = express();
dotenv.config();

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
})