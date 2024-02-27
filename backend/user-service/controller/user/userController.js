const userCollection = require('../../model/userModel')
const googleUserCollection = require('../../model/googleUsersModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const jwkToPem = require('jwk-to-pem');


const getPublicKey = async (kid) => {
    const response = await axios.get(process.env.jwksUri);
    const keys = response.data.keys;
  
    const key = keys.find((k) => k.kid === kid);
  
    if (!key) {
      throw new Error('Public key not found for the given Key ID (kid).');
    }
  
    return jwkToPem(key);
}


const hashing = async (password) => {

    return new Promise((resolve, reject) => {
        let saltRound = 10
        bcrypt.hash(password, saltRound, (err, hash) => {
            if (err) {
                console.error('Password hashing error:', err);
                reject(err);
            } else {
                // console.log('hashed pass-', hash);
                resolve(hash)
            }
        })
    })
}

const maxAge = 24 * 60 * 60
const createToken = (userEmail) => {
    return jwt.sign({ userEmail}, process.env.jwtSecret, {
        expiresIn: maxAge
    })
}

const addUser = async (req, res) => {
    try {
        const { userEmail, userName, userPassword, userNumber } = req.body
        // console.log(req.body);
        // const hash = await hashing(userPassword)
        const newUser = await userCollection.create({ userEmail, userName, userPassword, userNumber })
        console.log('user added- ', newUser);
        res.status(201).json({ success: true, message: newUser })
    }
    catch (err) {
        console.log('Error while signing up - ', err);
    }
}

const verifyEmail = async(req, res) => {
    try {
        const userEmail = req.query.email
        console.log(userEmail);
        await userCollection.updateOne({userEmail}, {$set: {isEmailVerified: true}})
        res.status(200).json({success: true})
    }
    catch (err) {
        console.log('verify email error-', err);
    }
}

const googleSignin = async (req, res) => {
    // console.log(req.body.token);
    const token = req.body.token
    jwt.verify(token, async (header, callback) => {
        try {
            const publicKey = await getPublicKey(header.kid);
            callback(null, publicKey);
        } catch (error) {
            callback(error);
        }
    }, { algorithms: ['RS256'] }, async (err, decoded) => {
        if (err) {
            console.error('Error decoding JWT:', err);
        } else {
            // console.log('Decoded JWT:', decoded);
            const userEmail = decoded.email
            const userName = decoded.name
            const list = await googleUserCollection.find({userEmail})
            let newUser = {}
            // console.log(list)
            if(list.length != 0) {
                console.log(list);
                newUser = list[0]
            } else {
                console.log(userEmail, userName);
                newUser = await googleUserCollection.create({userEmail, userName})              
            }
            const token = createToken(userEmail)
            res.status(200).json({success: true, user: newUser, token})
        }
    });
}

const verifylogin = async (req, res) => {
    try {
        console.log('login controller - ', req.body);
        const {userEmail, userPassword} = req.body
        // const hashPassword = await hashing(userPassword)
        const list = await userCollection.findOne({ userEmail, userPassword });
        const token = createToken(userEmail)
        if(list) {
            res.status(200).json({success: true, user: list, token})
        }
    }
    catch(err) {
        console.log('error at verify login - ', err);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userCollection.find({})
        res.status(200).json({success: true, users})
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {
    addUser, 
    verifyEmail,
    googleSignin,
    verifylogin,
    getAllUsers
}