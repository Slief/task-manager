const express = require('express')
const sqMail = require('@sendgrid/mail')

sqMail.setApiKey(process.env.SENDGRID_API_KEY)
console.log('API key:', process.env.SENDGRID_API_KEY)
// sqMail.send({
//     to: 'brentsliefert@gmail.com',
//     from: 'brentsliefert@gmail.com',
//     subject: 'This is my SECOND email',
//     text: 'Hello world'
// })

const sendWelcomeEmail = (email, name) => {
    sqMail.send({
        to: email,
        from: 'brentsliefert@gmail.com',
        subject: 'Thanks for signing up for my task manager',
        text: `Welcome to the app, ${name}. Let me know what you think.`
    })
}

const sendGoodbyeEmail = (email, name) => {
    sqMail.send({
        to: email,
        from: 'brentsliefert@gmail.com',
        subject: 'Sorry to see you go....one last question',
        text: `GB from my task manager app, ${name}. Hope to see you again soon!`
    })
}

module.exports = { 
    sendWelcomeEmail,
    sendGoodbyeEmail 
}
