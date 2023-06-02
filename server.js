const express = require('express')
const app = express()
require('dotenv').config({path:'./config.env'})
const connectDb = require('./db/db')
const routerUser  = require('./route/userRoute')
const port = 5000 || process.env.port



//connectDB
connectDb();
//middleware
app.use(express.json());
app.use('/api',routerUser);

//routes
//connect app

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})