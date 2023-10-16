const express = require('express')
require("dotenv").config()
const tasks = require('./routes/tasks')
const cors = require('cors');
const app = express() 
const connectDB =  require('./db/connect')

//middelware
app.use(express.json())
app.use(cors());


//routes
app.use('/api/tasks',tasks)


const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
    } catch (error) {
        console.log(error);
    }
}


app.listen(process.env.PORT , ()=>{
    console.log(`Listening on Port ${process.env.PORT}`)
})

start()