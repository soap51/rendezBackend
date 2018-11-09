const mongoose = require('mongoose')
const seatSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    eventID : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Event',
        required :true
    },
    max : {
        type : Number,
        require : true
    }
})

module.exports = mongoose.model('Seat' , seatSchema)