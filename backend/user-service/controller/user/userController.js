const userCollection = require('../../model/userModel')
const googleUserCollection = require('../../model/googleUsersModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const jwkToPem = require('jwk-to-pem');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const Razorpay = require('razorpay')
const guideCollection = require('../../model/guideModel')


const razorpay = new Razorpay({
    key_id: process.env.razorpayId,
    key_secret: process.env.razorpaySecret
})


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
    return jwt.sign({ userEmail }, process.env.jwtSecret, {
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

const verifyEmail = async (req, res) => {
    try {
        const userEmail = req.query.email
        console.log(userEmail);
        await userCollection.updateOne({ userEmail }, { $set: { isEmailVerified: true } })
        res.status(200).json({ success: true })
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
            const list = await googleUserCollection.find({ userEmail })
            let newUser = {}
            // console.log(list)
            if (list.length != 0) {
                console.log(list);
                newUser = list[0]
            } else {
                console.log(userEmail, userName);
                newUser = await googleUserCollection.create({ userEmail, userName })
            }
            const token = createToken(userEmail)
            res.status(200).json({ success: true, user: newUser, token })
        }
    });
}

const verifylogin = async (req, res) => {
    try {
        console.log('login controller - ', req.body);
        const { userEmail, userPassword } = req.body
        // const hashPassword = await hashing(userPassword)
        const list = await userCollection.findOne({ userEmail, userPassword });
        const token = createToken(userEmail)
        if (list) {
            res.status(200).json({ success: true, user: list, token })
        }
    }
    catch (err) {
        console.log('error at verify login - ', err);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userCollection.find({})
        res.status(200).json({ success: true, users })
    }
    catch (err) {
        console.log(err);
    }
}

const saveitenary = async (req, res) => {
    try {
        // console.log(req.body);
        const placeId = req.body.placeId
        const date = req.body.date
        const userId = req.body.userId
        const district = req.body.district
        const itenaryData = { date: new Date(date), district, placesId: placeId }
        console.log(itenaryData);
        const result = await userCollection.updateOne({ _id: new ObjectId(userId) }, { $push: { itenaries: itenaryData } })
        // console.log(result);
        res.status(200).json({ success: true })
    }
    catch (error) {
        console.log('error at save itenary - ', error);
    }
}

const getItenaryByUserId = async (req, res) => {
    try {
        const userId = req.query.userid
        const itenary = await userCollection.find({ _id: new ObjectId(userId) }, { itenaries: 1 }).lean()
        // console.log(itenary[0].itenaries);
        const itenaryDetails = itenary[0].itenaries
        res.status(200).json({ itenaryDetails })
    } catch (err) {
        console.log('error at get itenary by user id- ', err);
    }
}

const addGuideToItenary = async (req, res) => {
    try {
        console.log('here');
        const { itenaryId, userId, guideId } = req.body
        const guideDetails = {
            guideId: guideId,
            paymentCompleted: true
        };
        const user = await userCollection.findOneAndUpdate({ _id: userId, 'itenaries._id': itenaryId }, { $set: { 'itenaries.$.guide': guideDetails } }, { new: true }).exec();
        console.log(user);
        res.status(200).json({ success: true })
    }
    catch (err) {
        console.log('addGuideToItenary- ', err);
    }
}

const razorpayPayment = async (req, res) => {
    const amount = req.body.amount
    const currency = 'INR'
    const options = {
        amount: amount,
        currency: currency
    }
    try {
        const response = await razorpay.orders.create(options)
        res.json(response)
    }
    catch (err) {
        console.log('error at razorpay- ', err);
        res.status(500).json({ error: err.message })
    }
}

const getGuide = async (req, res) => {
    try {
        const userId = req.query.userid
        const itenaryId = req.query.itenaryid
        const user = await userCollection.findOne({ _id: new ObjectId(userId), "itenaries._id": itenaryId }, { "itenaries.$": 1 });
        // console.log('user- ', user);
        const itinerary = user.itenaries[0];
        const guideId = itinerary.guide.guideId;
        // console.log('guideID - ',guideId);
        const guideDetails = await guideCollection.find({ _id: new ObjectId(guideId) })
        console.log(guideDetails);
        res.status(200).json({ success: true, guideDetails })

    }
    catch (err) {
        console.log('error at getGuide- ', err.message);
    }
}

const cancelTrip = async (req, res) => {
    try {
        const userId = req.query.userid
        const itenaryId = req.query.itenaryid
        const newList = await userCollection.findOneAndUpdate({ _id: new ObjectId (userId) },{ $pull: { itenaries: { _id: new ObjectId(itenaryId) } } },{ new: true });
        res.status(200).json({success: true})
    }
    catch(err) {
        console.log('error at cancel trip - ', err);
    }
}

module.exports = {
    addUser,
    verifyEmail,
    googleSignin,
    verifylogin,
    getAllUsers,
    saveitenary,
    getItenaryByUserId,
    addGuideToItenary,
    razorpayPayment,
    getGuide,
    cancelTrip
}