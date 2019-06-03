require('../src/db/mongoose')
const Task = require('../src/models/task')

// 5cf2c073ef3e3b427c54b2b9

// Task.findByIdAndDelete('5cf2c073ef3e3b427c54b2b9').then(() => {
//     console.log('deleted')
//     return Task.where('completed: false').countDocuments()
// }).then((result) => {
//     console.log('Total not complete: '+ result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {

    const task = await Task.findByIdAndDelete(id)
    // equivalent
    //  await Task.findByIdAndDelete(id)
    
    const count = await Task.where('completed: false').countDocuments()
    // equivalent
    // const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('5cf2d643ca91eb0258a1660a').then((count) => {
    console.log('Count: ', count)
}).catch((e) => {
    console.log(e)
})