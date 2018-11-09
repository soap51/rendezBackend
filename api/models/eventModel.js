const mongoose = require('mongoose')
const commentModel = require('./commentModel')
const seatModel = require('./seatModel')
const eventSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    eventName : {
        type : String,
        required : true , 
    },
    place : {
        type : String,
        required : true,
    },
    eventDate:{
        type :Date,
        required : true
    },
    startTime: {
        type : Date,
        required : true
    },
    endTime : {
        type : Date,
        required :true
    },
    
    author : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'User',
        required :true
    },
    detail : {
        type : String
    },
    comment : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Comment'
    },
    currentSeat: {
        type : Number,
        required : true
    },
    totalSeat : {
        type : Number ,
        required : true
        // type : [mongoose.Schema.Types.ObjectId],
        // ref : 'Seat'
    }
} , {
    timestamps: true
})

module.exports = mongoose.model('Event' , eventSchema)