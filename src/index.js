const express = require('express')
require('./db/mongoose')
const mongoose = require('mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json()) 

app.post('/users', (req, res) => {
    // console.log(req.body)
    // res.send('testing....')
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    }) 
})  

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
    console.log(req.params)
    const _id = req.params.id
        
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(406).send();
    }
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.get('/tasks/:id', (req, res) => {
    console.log(req.params)
    const _id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(406).send();
    }
    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e) => {
        console.log(e)
        res.status(500).send(e)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body) 

    task.save().then(() => {
        // console.log(req.body)
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e) 
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})