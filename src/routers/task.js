const express = require('express')
require('../db/mongoose')
const mongoose = require('mongoose')

const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.delete('/tasks/:id', auth, async (req,res) => {
    // check for well-formed ObjectID
    const _id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send();
    }

    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    // only allow updates to certain existing fields or whole update fails
    const updates = Object.keys(req.body)  // create an array from body JSON
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update: incorrect fields included'})
    }

    // check for well-formed ObjectID
    const _id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send();
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.status(200).send(task)
    } catch(e) {
        res.status(400).send(e)
    }

})

router.get('/tasks/:id', auth, async (req, res) => {                      // find task by ID
    // console.log(req.params)
    const _id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send();
    }
    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch(e) {
        res.status(500).send(e)
    }

})

router.get('/tasks', auth, async  (req, res) => {                    //  find all tasks...for a user
    try {
        // const tasks = await Task.find({ owner: req.user._id })  // this works but
        await req.user.populate('tasks').execPopulate() 

        res.status(200).send(req.user.tasks)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.post('/tasks', auth, async (req, res) => {                            //  create new task 
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)    
    } catch(e) {
        res.status(400).send(e) 
    }
    // task.save().then(() => {
    //     // console.log(req.body)
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e) 
    // })
})

module.exports = router
