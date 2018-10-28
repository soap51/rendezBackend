const eventRoute =require('./event/private/eventRoute')
const userRoute= require('./user/public/userRoute')
const express = require('express')
const router = express.Router()
router.use('/event' , eventRoute)
router.use('/user' , userRoute)
module.exports = router
