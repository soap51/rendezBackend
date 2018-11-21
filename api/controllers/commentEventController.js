const mongoose = require('mongoose')

const Event = require('../models/eventModel')
const Comment = require('../models/commentModel')


exports.getAllEventComment = (req,res,next)=>{
   
    Event.findById(req.body.eventID ).populate('author' , 'fullName')
    .exec()
    .then(result=>{
        console.log("test ",result)
        res.status(200).json({
           comment : result.comment,
           fullName : result.fullName,
           eventName : result.eventName,
           iconType : result.iconType
           
           
        })
    }).catch(err=>{
        res.status(500).json({
            message : "Can not get all event",
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
    Event.findById( req.body.eventID)
        .exec()
        .then(event=>{
           
            Event.updateOne({_id : req.body.eventID} , {...event._doc , comment : [...event._doc.comment , comment]})
                .exec()
                .then(result=>{
                    res.status(200).json({
                        message : "Add Comment Successfully",
                        result : result
                    })
                    
                })
                .catch(err=>
                    res.status(500).json({
                        message : "Update Error",
                        err : err
                    })    
                )
            
                
            
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
// exports.deleteComment =(req,res,next)=>{
//     const id = req.param.commentID
//     Comment.remove({_id : id})
//         .exec()
//         .then(result =>{
//             res.status(200).json({
//                 message : 'Comment deleted',
//                 request : {
//                     type : 'POST',
//                     url : ' ',
//                     body : {detail : 'String'}
//                 }
//             })
//         })
//         .catch(err =>{
//             console.log(err)
//             res.status(500).json({
//                 error : err
//             })
//         })
// }
// exports.updateComment =(req,res,next)=>{
//     const id = req.param.commentID
//     const updateOps = {}
//     for(const ops of req.body){
//         updateOps[ops.propName] = opse.value
//     }
//     comment.update({id : id},{$set : updateOps})
//         .exec()
//         .then(result =>{
//             res.status(200).json({
//                 message : 'Comment updated',
//                 request : {
//                     type : 'GET',
//                     url : ' '
//                 }
//             })
//         })
//         .catch(err =>{
//             console.log(err)
//             res.status(500).json({
//                 error : err
//             })
//         })
// }
