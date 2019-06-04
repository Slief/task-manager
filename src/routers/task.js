const express = require('express')
require('../db/mongoose')
const mongoose = require('mongoose')

const Task = require('../models/task')
const router = new express.Router()

router.delete('/tasks/:id', async (req,res) => {
    // check for well-formed ObjectID
    const _id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send();
    }

    try {
        const task = await Task.findByIdAndDelete(_id, )
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
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
        const task = await Task.findById(_id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch(e) {
        res.status(400).send(e)
    }

})

router.get('/tasks/:id', async (req, res) => {                      // find task by ID
    // console.log(req.params)
    const _id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send();
    }
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch(e) {
        res.status(500).send(e)
    }

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e) => {
    //     console.log(e)
    //     res.status(500).send(e)
    // })
})

router.get('/tasks', async  (req, res) => {                    //  find all tasks
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch(e) {
        res.status(500).send(e)
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

router.post('/tasks', async (req, res) => {                            //  create new task 
    const task = new Task(req.body) 

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
