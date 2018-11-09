const eventRoute =require('./event/private/eventRoute')
const userRoute= require('./user/public/userRoute')
const express = require('express')
const Router = express.Router()
Router.use('/event' , eventRoute)
Router.use('/user' , userRoute)
module.exports = Router
