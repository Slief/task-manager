const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    // console.log('...from auth middleware')
    // next()
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisappiscool')
        const user = await User.findOne({ _id : decoded._id, 'tokens.token' : token })
        
        // console.log(decoded._id)
        // console.log(token)
        // console.log(user.id)
        // console.log(token)
        if (!user) {
            throw new Error()
        }
        req.token = token 
        req.user = user
        next()

    } catch(e) {
        res.status(401).send({ error: 'Please authenticate'})
    }
}

module.exports = auth