
require('../../src/models/task')
require('../../src/models/user')
const express = require('express')
const router = new express.Router()

router.use(express.json())


router.post('/task', (req, res) => {
    Task = new Tasks(req.body)
    Task.save().then(() => {
        res.send(Task)
    }).catch((e) => {
        res.status(404).send(e)
    })
})



router.get('/task/:id', (req, res) => {
    const _id = req.params.id
    Tasks.findById(_id).then((task) => {
        if (!task) return res.send("No User Found")
        res.send(task)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

module.exports = router;