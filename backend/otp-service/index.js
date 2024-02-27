const express = require('express')
const app = express()
const  nodemailer = require('nodemailer');
require('dotenv').config()

app.use((req, res, next) => {
    console.log(req.url);
    next()
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/sendmail', (req, res) => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.gmail,
            pass: process.env.gmailAppPass
        }
    });
    // console.log(req.body.otp);
    let mailOptions;
    if(req.body.otp && req.body.email) {
        console.log(req.body);
        mailOptions = {
            from: process.env.gmail,
            to: req.body.email,
            // to: 'sarathpradeep12@gmail.com',
            subject: 'Email Verfication',
            text: `otp is - ${req.body.otp}`
            // text: 'otp is 7987'
        };
    } else if(req.body.text) {
        console.log('approval');
        mailOptions = {
            from: process.env.gmail,
            to: req.body.recipient,
            // to: 'sarathpradeep12@gmail.com',
            subject: 'Guide Request Approval',
            text: req.body.text
            // text: 'otp is 7987'
        };
    }
    

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).json({success: true})
})




app.listen(process.env.port, () => {
    console.log(`Server running at http://localhost:${process.env.port}`);
})