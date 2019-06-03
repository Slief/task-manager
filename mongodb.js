// CRUD 
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

// using destructuring this one line replaces the three lines above
const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager' 

// const id = new ObjectID()
// console.log(id.id)
// console.log(id.id.length)
// console.log(id.toHexString())
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, {useNewUrlParser: true} , (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    // console.log('Connected to DB')
    const db = client.db(databaseName) // automatically created just by referencing it

    // db.collection('users').deleteMany({
    //     age: 34
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({
        description: 'Get groceries'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})

    // const updatePromise = db.collection('users').updateOne({ 
    //     _id : new ObjectID('5cf155069af75d17c9c08b86')
    // }, {
    //     $set: {
    //         name: 'Bart'
    //     }
    // })

    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // above equivalent to this chaining pattern. Don't have to create the variable updatePromise
    // db.collection('users').updateOne({ 
    //     _id : new ObjectID('5cf155069af75d17c9c08b86')
    // }, {
    //     $set: {
    //         name: 'Suzie'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').updateOne({ 
    //     _id : new ObjectID('5cf155069af75d17c9c08b86')
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({ 
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


    // db.collection('users').insertOne({
    //     name: 'Bob',
    //     age: 53
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Tommy',
    //         age: 34
    //     },
    //     {
    //         name: 'Frank',
    //         age: 17
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Wash car',
    //         completed: true
    //     },
    //     {
    //         description: 'Get groceries',
    //         completed: false
    //     },
    //     {
    //         description: 'Return library book',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').findOne({ name: 'Brent'}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch.')
    //     }
    //     console.log(user)
    // })

    // db.collection('users').findOne({ _id: new ObjectID('5cf158c6390c0897102f4dc4')}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch.')
    //     }
    //     console.log(user)
    // })

    // db.collection('users').find({ age: 34 }).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').find({ age: 34 }).count((error, count) => {
    //     console.log(count)
    // })

    // db.collection('tasks').findOne({ _id: new ObjectID('5cf159c4f4ccbef9d0ed859a') }, (error, task) => {
    //     if (error) { return console.log('Unable to fetch')}
    //     console.log(task)
    // })

    // db.collection('tasks').find({ completed: true}).toArray((error, tasks) => {
    //     console.log(tasks)
    // })
