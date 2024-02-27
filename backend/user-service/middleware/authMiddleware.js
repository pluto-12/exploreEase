const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    const token = req.headers.authorization
    // console.log(token);
    if(!token) {
        return res.json({message: "Authtentication Failed"})
    }
    const tokenValue = token.replace('Bearer ', '')
    jwt.verify(tokenValue, process.env.jwtSecret, (err, decoded) => {
        if(err) {
            return res.json({message: "Authtentication Failed"})
        } else {
            req.decoded = decoded
        }
        next();
    })
}

module.exports = { validateToken }