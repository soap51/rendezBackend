const express = require('express')
const router = express.Router()
const eventController = require('../../../controllers/eventController')
const commentEventRoute = require('./commentEvent/index')

router.get("/" ,eventController.getAllEventFeed) // event feed page
router.post("/" , eventController.createEvent) // create event 
router.patch('/:eventID' , eventController.joinEvent) // join event
router.get("/:eventID" , eventController.getEventDetail) // get event detail
router.use('/:eventID' , commentEventRoute)
router.post('/unjoin' , eventController.unjoinEvent)

router.delete("/:eventID",eventController.deleteEvent)



module.exports = router