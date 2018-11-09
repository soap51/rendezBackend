const mongoose = require('mongoose')
const commentSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    eventID : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Event',
        required :true
    },
    detail : {
        type : String
        
    }
},{
    timestamp : true
})

module.exports = mongoose.model('Comment' , commentSchema)