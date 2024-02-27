const express = require('express')
const adminRouter =  express()
const adminController = require('../../controller/admin/adminController')

adminRouter.post('/verifylogin', adminController.verifylogin)


module.exports = adminRouter