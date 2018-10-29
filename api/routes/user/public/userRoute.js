const express = require('express')
const router = express.Router()
const userController = require('../../../controllers/userController')

router.post("/register" ,userController.register)
router.post("/login" , userController.login)
router.post('/forgot' , userController.forgot)
router.post('/verify' , userController.verify)
router.post('/resend' , userController.resend)
module.exports = router