const adminCollection = require('../../model/adminModel')
const jwt = require('jsonwebtoken')

const maxAge = 24 * 60 * 60
const createToken = (cordinatorEmail) => {
    return jwt.sign({ cordinatorEmail }, process.env.jwtSecret, {
        expiresIn: maxAge
    })
}


const verifylogin = async (req, res) => {
    try {
        // console.log('login controller - ', req.body);
        const {adminEmail, adminPassword} = req.body
        // const hashPassword = await hashing(userPassword)
        const list = await adminCollection.findOne({ adminEmail, adminPassword });
        if(list) {
            const token = createToken(adminEmail)
            res.status(200).json({success: true, user: list, token})
        }
    }
    catch(err) {
        console.log('error at verify login - ', err);
    }
}

module.exports = {
    verifylogin
}