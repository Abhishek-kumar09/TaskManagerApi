//task create,read,update,delete -----

require('./src/db/mongoose')
const express = require('express')
const taskRouter = require('./src/Routers/task-router')
const userRouter = require('./src/Routers/user-router')
//Express App Setup
const port = process.env.port || 3000
const app = express()
//router setup
app.use(express.json())
app.use(taskRouter)
app.use(userRouter)
//Listening on port 
app.listen(port, () => {
    console.log("Server Started On Port: " + port);
})