const placeCollection = require('../../model/placeModel')
const geolib = require('geolib')
const path = require('path')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId



const addPlace = async (req, res) => {
    const { placeName, placeDescription, district } = req.body
    const location = JSON.parse(req.body.location)
    console.log(location);
    const filename = req.file.filename
    // const filenames = req.files.map(file => file.filename)
    const newPlace = await placeCollection.create({ placeName, placeDescription, district, location, placeImage: filename })
    res.status(200).json({ success: true })
}

const showPlacesByDistrict = async (req, res) => {
    const district = req.query.district
    const lattitude = req.query.lattitude
    const longitude = req.query.longitude
    const placeList = await placeCollection.find({ district })
    const placesWithDistance = placeList.map((place) => {
        const distance = geolib.getDistance(
            { latitude: req.query.lattitude, longitude: req.query.longitude },
            { latitude: place.location.lattitude, longitude: place.location.longitude }
        )
        let imageUrl = null
        let imagePath = path.join(__dirname, '../../assets/places', place.placeImage[0])
        // console.log(imagePath);
        imageUrl = `file://${imagePath}`
        // console.log(imagePath);
        return {
            id: place._id,
            location: place.location,
            placeName: place.placeName,
            placeDescription: place.placeDescription,
            placeImage: imageUrl,
            isActive: place.isActive,
            distance: distance
        }
    })
    placesWithDistance.sort((a, b) => a.distance - b.distance)
    res.status(200).json({ success: true, placesWithDistance })
}

const showAllPlaces = async (req, res) => {
    try {
        const placeList = await placeCollection.find({})
        res.status(200).json({ success: true, placeList })
    }
    catch (err) {
        console.log('error at show all places - ', err);
    }
}

const showPlaceById = async (req, res) => {
    try {
        const id = req.query.id
        const placeDetails = await placeCollection.find({ _id: new ObjectId(id) })
        // console.log(placeDetails);
        res.status(200).json({ place: placeDetails[0] })
    }
    catch (err) {
        console.log('Error at show place by id - ', err);
    }
}

const getPlaceImageById = async (req, res) => {
    try {
        const id = req.query.id
        const images = await placeCollection.find({ _id: new ObjectId(id) }, { placeImage: 1, _id: 0 })
        // let placeImages = []
        let imagePath
        images[0].placeImage.forEach((image) => {
            image = path.join(__dirname, '../../assets/places', image)
            // placeImages.push(image)
            imagePath = image
        });
        // console.log(placeImages);
        res.sendFile(imagePath)
    }
    catch (err) {
        console.log(err);
    }
}

const getPlaceBySearch = async (req, res) => {
    try {
        console.log('here');
        const district = req.query.district
        const lattitude = req.query.lattitude
        const longitude = req.query.longitude
        const placeName = req.query.placename
        let placeList = await placeCollection.find({ placeName })
        if (placeList.length != 0) {
            // console.log(placeList);
        } else {
            placeList = await placeCollection.find({ district })
        }
        const placesWithDistance = placeList.map((place) => {
            const distance = geolib.getDistance(
                { latitude: req.query.lattitude, longitude: req.query.longitude },
                { latitude: place.location.lattitude, longitude: place.location.longitude }
            )
            let imageUrl = null
            let imagePath = path.join(__dirname, '../../assets/places', place.placeImage[0])
            // console.log(imagePath);
            imageUrl = `file://${imagePath}`
            // console.log(imagePath);
            return {
                id: place._id,
                location: place.location,
                placeName: place.placeName,
                placeDescription: place.placeDescription,
                placeImage: imageUrl,
                isActive: place.isActive,
                distance: distance
            }
        })
        placesWithDistance.sort((a, b) => a.distance - b.distance)
        res.status(200).json({ success: true, placesWithDistance })
    }
    catch (err) {
        console.log('err at get place by search -', err);
    }
}

const getPlaceById = async (req, res) => {
    // console.log(req.body);
    const id = req.body
    console.log(id);
    const placeObjectId = id.map((placeId) => new ObjectId(placeId))
    const places = await placeCollection.find({ _id: { $in: placeObjectId } })
    console.log('here',places);
    let placeList = []
    places.forEach((place) => {
        let imageUrl = null
        let imagePath = path.join(__dirname, '../../assets/places', place.placeImage[0])
        // console.log(imagePath);
        imageUrl = `file://${imagePath}`
        placeList.push({
            id: place._id,
            location: place.location,
            placeName: place.placeName,
            placeDescription: place.placeDescription,
            placeImage: imageUrl,
            isActive: place.isActive,
        })
    })
    res.status(200).json({ placeList })
}

const addReview = async (req, res) => {
    try {
        const { userId, placeId, rating, review } = req.body
        const updatedPlace = await placeCollection.findOneAndUpdate({ _id: new ObjectId(placeId) }, { $push: { reviews: { userId, review, rating } } },{new: true})
        if(updatedPlace) {
            res.json(200).json({success: true})
        }
    }
    catch(err) {
        console.log('error at add review - ', err);
    } 
}

const reviewDetails = async (req, res) => {
    try {
        const placeId = req.query.placeid
        const reviewList = await placeCollection.find({_id: new ObjectId(placeId)}, {reviews: 1, _id: 0})
        const reviews = reviewList[0].reviews
        // console.log('reviews - ',reviews);
        let totalRating = 0;
        let totalReviews = reviews.length;
        reviews.forEach(review => {
            totalRating += review.rating;
        });
        const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;
        // console.log('Average Rating:', averageRating);
        // console.log('Total Reviews:', totalReviews);
        console.log(reviews, totalReviews, averageRating);
        res.status(200).json({reviews, totalReviews, averageRating})
    }
    catch(err) {
        console.log('error at review details- '. err);
    }
}



module.exports = {
    addPlace,
    showPlacesByDistrict,
    showAllPlaces,
    showPlaceById,
    getPlaceImageById,
    getPlaceBySearch,
    getPlaceById,
    addReview,
    reviewDetails
}