//task create,read,update,delete -----

require('./src/db/mongoose')
const express = require('express')
const taskRouter = require('./src/Routers/task-router')
const userRouter = require('./src/Routers/user-router')

const port = process.env.port || 3000
const app = express()
app.use(express.json())
app.use(taskRouter)
app.use(userRouter)

app.listen(port, () => {
    console.log("Server Started On Port: " + port);
})