const express = require('express')
const placeRouter = express()
const multer = require('multer')
const placeController = require('../../controller/place/placeController')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './assets/places')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

// placeRouter.post('/addplace', upload.array('file', 4), placeController.addPlace)
placeRouter.post('/addplace', upload.single('file'), placeController.addPlace)
placeRouter.get('/showplaces', placeController.showPlacesByDistrict)
placeRouter.get('/showallplaces', placeController.showAllPlaces)
placeRouter.get('/getplacedetails', placeController.showPlaceById)
placeRouter.get('/getplaceimage', placeController.getPlaceImageById)
placeRouter.get('/search', placeController.getPlaceBySearch)
placeRouter.post('/getplacebyid', placeController.getPlaceById)
placeRouter.post('/addreview', placeController.addReview)
placeRouter.get('/reviewdetails', placeController.reviewDetails)











module.exports = placeRouter