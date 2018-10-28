const mongoose = require('mongoose')
const commentModel = require('./commentModel')
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
        type : TimeRanges,
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
        type : String,
    },
    comment : {
        type : [commentModel],
        ref : 'Comment',
    }
} , {
    timestamps: true
})

module.exports = mongoose.model('User' , userSchema)