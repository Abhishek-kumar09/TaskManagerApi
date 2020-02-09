//task create,read,update,delete -----

require('./src/models/task')
require('./src/db/mongoose')
require('./src/models/user').default
const express = require('express')

const port = process.env.port || 3000
const app = express()
app.use(express.json())

app.post('/task',(req,res)=>{
    Task = new Tasks(req.body) 
    Task.save().then(()=>{
        res.send(Task)
    }).catch((e)=>{
        res.status(404).send(e)
    })
})

app.post('/user', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user);
        console.log(user)
    })
        .catch((e) => {
            res.status(400).send(e)
            console.log("Error Ocurred once again")
        })

})

app.get('/user/:id', (req, res) => {
    _id = req.params.id
    User.findById(_id).then((user) => {
        res.send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.get('/task/:id', (req, res) => {
    const _id = req.params.id
    Tasks.findById(_id).then((task) => {
        if(!task) return res.send("No User Found")
        res.send(task)
    }).catch((e)=> {
        res.status(500).send(e)
    })
})

app.post('/user', (req, res) => {
    const t = new Task(req.body)
    t.save().then(() => {
        console.log(t)
        res.send(t)
    }).catch((e) => {
        res.status(400).send(e)
        console.log(e);
    })
})

app.patch('/user/:id',(req,res) => {
    const _id = req.params.id
    User.findByIdAndUpdate(_id,req.body,{new : true, runValidators : true}).then((user)=> {
        res.send(user)
    }).catch((E)=> {
        res.status(500).send(E)
    })
})

app.listen(port, () => {
    console.log("Server Started On Port: " + port);
})