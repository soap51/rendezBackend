const mongoose = require('mongoose')
const commentSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    authorID : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'User',
        required :true
    },
    value : {
        type : String,
        
    }
})

module.exports = mongoose.model('Comment' , commentSchema)