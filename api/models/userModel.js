const mongoose = require('mongoose')
const commentModel = require('./commentModel')
const eventModel = require('./eventModel')
const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    studentCode : {
        type : Number,
        required : true,
        unique : true,
    },
    fullName : {
        type : String,
        required : true,
        unique : true,
    },
    email : { 
        type : String ,
        required : true , 
        unique : true,
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    events : {
        type : [mongoose.Schema.Types.ObjectId], 
        ref : 'Event',
        required :true
    },
    confirmationToken : {
        type : Boolean , 
        required : true ,
        default : false,
    },
    password : {
        type : String , 
        required : true
    },
    notifications : {
        type : [String],
       
    },
    sex : {
        type : String,
        required : true
    },
    age : {
        type : Number ,
        required : true
    },
    otp : {
        type : Number ,
        required : true
    },
    myJoinEvent : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Event'
    },
    myCreateEvent : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Event'
    }
},{
    timestamp : true
})

module.exports = mongoose.model('User' , userSchema)