const express = require('express')
const cordinatorRouter =  express()
const cordinatorController = require('../../controller/cordinator/cordinatorController')

cordinatorRouter.post('/verifylogin', cordinatorController.verifylogin)


module.exports = cordinatorRouter