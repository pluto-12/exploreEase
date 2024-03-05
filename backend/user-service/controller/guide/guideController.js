const guideCollection = require('../../model/guideModel')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const path = require('path')
const fs = require('fs').promises


const maxAge = 24 * 60 * 60
const createToken = (cordinatorEmail) => {
    return jwt.sign({ cordinatorEmail }, process.env.jwtSecret, {
        expiresIn: maxAge
    })
}

const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}


const addGuide = async (req, res) => {
    console.log('controller-', req.body);
    // console.log('filename-', req.file.filename);
    const { guideEmail, guideName, dateOfBiirth } = req.body
    const location = JSON.parse(req.body.location)
    const idCard = req.file.filename
    console.log('data- ', guideEmail, guideName, dateOfBiirth, location, idCard);
    const newGuide = await guideCollection.create({ guideEmail, guideName, dateOfBiirth, location, idCard })
    res.status(200).json({ success: true })
}

const getguiderequest = async (req, res) => {
    const guideRequests = await guideCollection.find({ isApproved: false })
    console.log(guideRequests);
    res.status(200).json({ success: true, guideRequests })
}

const approveGuide = async (req, res) => {
    const guideEmail = req.query.guideemail
    const randomPassword = generatePassword()
    console.log(randomPassword);
    const data = { recipient: guideEmail, text: `Your Guide request at ExploreEase is approved. You can login at http://localhost:4200/guide/login with password: ${randomPassword}` }
    await axios.post('http://localhost:3000/api-otp/sendmail', data)
    await guideCollection.updateOne({ guideEmail }, { $set: { isApproved: true, guidePassword: randomPassword } })


    res.status(200).json({ success: true })
}

const verifylogin = async (req, res) => {

    try {
        const { guideEmail, guidePassword } = req.body
        // const hashPassword = await hashing(userPassword)
        const list = await guideCollection.findOne({ guideEmail, guidePassword });
        if (list) {
            const token = createToken(guideEmail)
            res.status(200).json({ success: true, user: list, token })
        }
    }
    catch (err) {
        console.log('error at verify login - ', err);
    }
}

const resetPassword = async (req, res) => {
    try {
        const { guideEmail, guidePassword } = req.body
        await guideCollection.updateOne({ guideEmail }, { $set: { guidePassword: guidePassword, passwordFlag: true } })
        res.status(200).json({ success: true })
    }
    catch (err) {
        console.log('error at reset passss - ', err);
    }
}

const getAllGuides = async (req, res) => {
    try {
        const guides = await guideCollection.find({ isApproved: true })
        console.log(guides);
        res.status(200).json({ success: true, guides })

    }
    catch (err) {
        console.log(err);
    }
}

const getGuideImage = async (req, res) => {
    try {
        const guideEmail = req.query.guideemail
        const guideDetails = await guideCollection.find({ guideEmail }, { idCard: 1 })
        const idCard = guideDetails[0].idCard
        const imagePath = path.join(__dirname, '../../assets/guide-id', idCard)
        // console.log(imagePath);
        res.sendFile(imagePath)
    }
    catch (err) {
        console.log('Error at get guide image - ', err);
    }
}

const getGuideByPlace = async(req, res) => {
    try {
        const district = req.query.palce
        const guideList = await guideCollection.find({ district })
        console.log(guideList);
        res.status(200).json({success: true, guideList})
    }
    catch (err) {
        console.log('error at get guide by place - ', err);
    }
}

module.exports = {
    addGuide,
    getguiderequest,
    approveGuide,
    verifylogin,
    resetPassword,
    getAllGuides,
    getGuideImage,
    getGuideByPlace
}