require('../src/db/mongoose')
const User = require('../src/models/user')

// a user id    5cf2bc9cc8405e2b9817a467

// User.findByIdAndUpdate('5cf2ded1bcf4b52e247b3fd2', { age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5cf2ded1bcf4b52e247b3fd2', 2).then((count) => {
    console.log('count: ', count)
}).catch((e) => {
    console.log(e)
})