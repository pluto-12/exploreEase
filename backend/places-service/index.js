const mongoose = require('mongoose')
require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const placeRouter = require('./router/place/placeRouter')

mongoose.connect(process.env.dbConnectionString)
    .then(() => {
        console.log('Datebase Connection Succesfull');
    })
    .catch((err) => {
        console.log('Database Connection Error- ', err);
    })

app.use((req, res, next) => {
    console.log(`${req.method}${req.url}`);
    next()
})

app.use('/place', placeRouter)

app.listen(process.env.port, () => {
    console.log(`Server running at http://localhost:${process.env.port}`);
})