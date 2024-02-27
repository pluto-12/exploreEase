const mongoose = require('mongoose')
require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const userRouter = require('./router/user/userRoutes')
const adminRouter = require('./router/admin/adminroutes')
const cordinatorRouter = require('./router/cordinator/cordinatorRoutes')
const guideRouter = require('./router/guide/guideRoutes')






mongoose.connect(process.env.dbConnectionString)
    .then(() => {
        console.log('Datebase Connection Succesfull');
    })
    .catch((err) => {
        console.log('Database Connection Error- ', err);
    })

app.use((req, res, next) => {
    console.log(`user-service - ${req.method}${req.url}`);
    next()
})

app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/cordinator', cordinatorRouter)
app.use('/guide', guideRouter)


app.listen(process.env.port, () => {
    console.log(`Server running at http://localhost:${process.env.port}`);
})