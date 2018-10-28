const express = require('express')
const router = express.Router()
const commentEventRouter = require('./commentEventRoute')
router.use("/comment" , commentEventRouter)



module.exports = router