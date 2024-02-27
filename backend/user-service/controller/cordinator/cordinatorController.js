const cordinatorCollection = require('../../model/cordinatorModel')
const jwt = require('jsonwebtoken')

const maxAge = 24 * 60 * 60
const createToken = (cordinatorEmail) => {
    return jwt.sign({ cordinatorEmail }, process.env.jwtSecret, {
        expiresIn: maxAge
    })
}

const verifylogin = async (req, res) => {
    try {
        console.log('login controller - ', req.body);
        const {cordinatorEmail, cordinatorPassword} = req.body
        // const hashPassword = await hashing(userPassword)
        const list = await cordinatorCollection.findOne({ cordinatorEmail, cordinatorPassword });
        if(list) {
            const token = createToken(cordinatorEmail)
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