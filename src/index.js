const express = require('express')
require('./db/mongoose')
const mongoose = require('mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a Word document'))
        }
        cb(undefined, true)
        // ways to call the callback (cb) function
        // cb( new Error('File must be of type "xyz"')
        // cb(undefined, true)   success
        // cb(undefined, false)  silently reject (don't use)

    }

})

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })

app.use(express.json()) 
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


const pet = {
    name: "Shelby"
}

pet.toJSON = function () {
    console.log(this)
    return this
}
console.log(JSON.stringify(pet))