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
    // notifications : {
    //     type : [String],
       
    // },
    sex : {
        type : String,
        required : true
    },
    
    historyComment : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Comment'
    },
    historyJoin : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Event'
    },
    historyAct : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Event'
    },
    otp : {
        type : Number ,
        required : true
    },
    currentJoin : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Event'
    },
    currentAct : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Event'
    },
    age : {
        type : Number,
        required : true
    },
    rate : {
        type : Number,
        require : true
    }
},{
    timestamp : true
})

module.exports = mongoose.model('User' , userSchema)