const express = require('express')
const guideRouter = express()
const guideController = require('../../controller/guide/guideController')
const multer = require('multer')
const fileUpload = require('express-fileupload')
const validation = require('../../middleware/authMiddleware')

guideRouter.use((req, res, next) => {
    console.log('in guideRouter', req.body);
    next()
})


// const storage = multer.diskStorage({

//     destination: (req, file, cb) => {
//         console.log('multer config- ', req.body);
//         if (req.body.guideEmail) {
//             console.log("Guide email:", req.body.guideEmail);
//             cb(null, './assets/guide-id')
//         } else {
//             console.log("Guide email not provided.");
//         }
//     },
//     filename: (req, file, cb) => {
//         if (req.body.guideEmail) {
//             cb(null, `${req.body.guideEmail}`)
//         } else {
//             cb(null, `${req.body.guideEmail}`)
//         }
//     }
// })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './assets/guide-id');
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
})



const upload = multer({ storage: storage })

guideRouter.post('/addguide', upload.single('file'), guideController.addGuide)
guideRouter.get('/getguiderequest', guideController.getguiderequest)
guideRouter.get('/approveguide',validation.validateToken, guideController.approveGuide)
guideRouter.post('/verifylogin', guideController.verifylogin)
guideRouter.post('/resetpassword', guideController.resetPassword)
guideRouter.get('/getallguides',validation.validateToken, guideController.getAllGuides)
guideRouter.get('/getguideimage', validation.validateToken, guideController.getGuideImage)
guideRouter.get('/getguidebyplace', validation.validateToken, guideController.getGuideByPlace)
guideRouter.get('/getguidebyplaceanddate', guideController.getGuideByPlaceAndDate)
guideRouter.post('/savejob', guideController.saveJob)
guideRouter.get('/getjobs', guideController.getJobRequest)
guideRouter.get('/approvejob', guideController.approveJob)

module.exports = guideRouter