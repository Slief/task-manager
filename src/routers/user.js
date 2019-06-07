const express = require('express')
require('../db/mongoose')
const mongoose = require('mongoose')
const multer = require('multer')
const sharp = require('sharp')

const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendGoodbyeEmail } = require('../emails/account')
const router = new express.Router()

router.post('/users', async (req, res) => {                          // Create user
    // console.log(req.body)
    // res.send('testing....')
    const user = new User(req.body)
    
    try {
        await user.save()  // evertyhing after this only runs if it save returns either successfuly or un successfuly.
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        
        res.status(201).send({ user, token })
    } catch(e) {
        res.status(400).send(e)
    }
})  

router.post('/users/login', async (req, res) => {                    // login
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token })
    } catch(e) {
        res.status(400).send()
    }
})

// "name": "Amy",
// "email": "a@123.com",
// "password": "pppp1234#"

// "name": "Chris",
// "email": "c@123.com",
// "password": "pppp1234#"

// "name": "Brent",
// "email": "b@1.com",
// "password": "pppp1234#"

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send() 
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send() 
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {      // get my profile
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {                      // update user
    // only allow updates to certain existing fields or whole update fails
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(401).send({ error: 'Invalid update: incorrect fields included'})
    }

    // // check for well-formed ObjectID
    // const _id = req.user._id
    // if (!mongoose.Types.ObjectId.isValid(_id)) {
    //     return res.status(404).send();
    // }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()  //  forces middleware to execute

        res.status(200).send(req.user)
    } catch (e) {
        res.status(403).send(e)

    }
})

router.delete('/users/me', auth, async (req, res) => {
    // check for well-formed ObjectID
    const _id = req.user._id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send();
    }
    try {
        await req.user.remove()
        sendGoodbyeEmail(req.user.email, req.user.name)
        res.status(200).send(req.user)
    } catch(e) {
        res.status(500).send()
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            console.log('failed file upload')
            return cb(new Error('Please upload an image file (jpg, jpeg or png)'))
        }
        console.log('success file upload')
        cb(undefined, true)
        // ways to call the callback (cb) function
        // cb( new Error('File must be of type "xyz"')
        // cb(undefined, true)   success
        // cb(undefined, false)  silently reject (don't use)

    }
})  

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    // req.user.avatar =  req.file.buffer
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()

    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById( req.params.id )
        if (!user || !user.avatar ) {
            throw new Error()
        } 
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    } catch(e) {
        res.status(404).send()
    }
})

module.exports = router