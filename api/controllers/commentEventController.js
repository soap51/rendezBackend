const mongoose = require('mongoose')

const Event = require('../models/eventModel')
const Comment = require('../models/commentModel')


exports.getAllEventComment = (req,res,next)=>{
    Comment.find()
    .select('_id eventID detail timestamp')
    .exec()
    .then(docs => {
        const response = {
            count : docs.length,
            event : docs.map(doc => {
                return{
                    _id : doc._id,
                    eventID : doc.eventID,
                    detail : doc.detail,
                    timestamp : doc.timestamp,
                    request : {
                        type : 'GET',
                        url : ' '
                    }
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error : err
        })
    })
}
exports.addcomment =(req,res,next)=>{
    const comment = new Comment({
        _id : new mongoose.Types.ObjectId(),
        eventID : req.body.eventID,
        detail : req.body.detail,
        // timestamp : req.body.timestamp
    })
    console.log(comment)
    Event.findByIdAndUpdate( req.body.eventID )
        .exec()
        .then(event=>{
            console.log(event)
            res.status(200).json({
                message : "Add Comment Successfully",
                event : event
            })
            
                
            
        })
        .catch(err=>{
            res.status(500).json({
                message : "Internal Server Error"
            })
        })
    // comment
    //     .save()
    //     .then(result =>{
    //         console.log(result)
    //         res.status(201).json({
    //             message : 'Add comment success',
    //             addComment: {
    //                 _id : result._id,
    //                 eventID : result.eventID,
    //                 detail : result.detail,
    //                 timestamp : result.timestamp,
    //                 request: {
    //                     type : 'GET',
    //                     url : ''
    //                 }
    //             }
    //         })
    //     })
    //     .catch(err =>{
    //         console.log(err)
    //         res.status(500).json({
    //             error : err
    //         })
    //     })

}
exports.deleteComment =(req,res,next)=>{
    const id = req.param.commentID
    Comment.remove({_id : id})
        .exec()
        .then(result =>{
            res.status(200).json({
                message : 'Comment deleted',
                request : {
                    type : 'POST',
                    url : ' ',
                    body : {detail : 'String'}
                }
            })
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                error : err
            })
        })
}
exports.updateComment =(req,res,next)=>{
    const id = req.param.commentID
    const updateOps = {}
    for(const ops of req.body){
        updateOps[ops.propName] = opse.value
    }
    comment.update({id : id},{$set : updateOps})
        .exec()
        .then(result =>{
            res.status(200).json({
                message : 'Comment updated',
                request : {
                    type : 'GET',
                    url : ' '
                }
            })
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                error : err
            })
        })
}
