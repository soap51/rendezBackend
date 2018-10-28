const express = require('express')
const router = express.Router()
const commentEventController = require('../../../../controllers/commentEventController')
router.get('/' , commentEventController.getAllEventComment)
router.post('/' , commentEventController.addcomment)
router.delete('/:commentID' , commentEventController.deleteComment)
router.patch('/:commentID' , commentEventController.updateComment)
module.exports = router