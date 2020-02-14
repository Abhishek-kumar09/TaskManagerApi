require('../db/mongoose')
require('../../src/models/user')
const express = require('express')
const router = new express.Router()

router.post('/user', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user);
        console.log(user)
    })
        .catch((e) => {
            res.status(400).send(e)
            console.log("Error Ocurred once again" + e)
        })

})

router.post('/user/login',async (req, res) => {
    try {
        const user = await User.findByCredential(req.body.email, req.body.password)
        res.send(user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/user/:id', (req, res) => {
    _id = req.params.id
    User.findById(_id).then((user) => {
        res.send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})


router.post('/user', (req, res) => {
    const t = new Task(req.body)
    t.save().then(() => {
        console.log(t)
        res.send(t)
    }).catch((e) => {
        res.status(400).send(e)
        console.log(e);
    })
})

router.patch('/user/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send("Updates not Valid!")
    }

    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).send("User NOt Found")
        }
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;