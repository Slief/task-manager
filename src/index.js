const express = require('express')
require('./db/mongoose')
const mongoose = require('mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     // console.log(req.method, req.path)
//     // next()
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Application is temporarily in maintenance mode. Check back in a few minutes.')
// })

app.use(express.json()) 
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({_id: 'abcd1234'}, 'thisisacoolapp', { expiresIn: '15 seconds'} )
//     console.log(token)

//     const data = jwt.verify(token, 'thisisacoolapp!')
//     console.log(data)
// }`

// myFunction()

// const bcrypt = require ('bcryptjs')

// const myFunction = async () => {
//     const password = 'Red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)
//     console.log(password)
//     console.log(hashedPassword)
    
//     const isMatch = await bcrypt.compare(password, hashedPassword)
//     console.log(isMatch)
// }

// myFunction()

const pet = {
    name: "Shelby"
}

pet.toJSON = function () {
    console.log(this)
    return this
}
console.log(JSON.stringify(pet))