const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const proxy =  require('express-http-proxy')
const corsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}
app.use(cors(corsOptions))


app.use((req, res, next) => {
    console.log(`${req.method}${req.url}`);
    next()
})

app.use('/api-user', proxy('http://localhost:3001'))
app.use('/api-otp', proxy('http://localhost:3002'))
app.use('/api-places', proxy('http://localhost:3003'))
app.use('/api-chat', proxy('http://localhost:3003'))

app.listen(process.env.port, () => {
    console.log(`Server running at http://localhost:${process.env.port}`);
})
