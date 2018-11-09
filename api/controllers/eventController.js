const mongoose = require("mongoose")
const EventModel = require("../models/eventModel")
const Comment = require("../models/commentModel")
const UserModel =require('../models/userModel')
exports.getAllEventFeed = (req,res,next)=>{
    // EventModel.find()
    // .select('_id eventName place eventDate startTime endTime author detail comment currentSeat totalSeat timestamp')
    // .populate()
    // .exec()
    // .then(docs =>{
    //     res.status(200).json({
    //         count : docs.length,
    //         event : docs.map(doc =>{
    //             return{
    //                 _id : doc._id,
    //                 eventName : doc.eventName,
    //                 place : doc.place,
    //                 eventDate : doc.eventDate,
    //                 author : doc.author,
    //                 request : {
    //                     type : 'GET',
    //                     url : ''
    //                 }
    //             }
    //         })
    //     })
    // })
    // .catch(err =>{
    //     res.status(500).json({
    //         error : err
    //     })
    // })
   
}
exports.createEvent =(req,res,next)=>{
   
    UserModel
        .find({_id : req.body.userID})
        .exec()
        .then(user=>{
            if(user.length == 0){
                return res.status(404).json({
                    message : "User doesn't found"
                })
            }
            else { 
                const Event = new EventModel({
                    _id : new mongoose.Types.ObjectId(),
                    userID : req.body.userID,
                    eventName : req.body.eventName,
                    author : req.body.author ,
                    eventDate : /*req.body.eventDate*/ new Date(),
                    startTime : /*req.body.startTime*/ new Date(),
                    endTime  : /*req.body.endTime*/ new Date(),
                    place : req.body.place,
                    currentSeat : req.body.currentSeat,
                    totalSeat : req.body.totalSeat,
                    detail : req.body.detail
                })
                Event
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message : "Create Event Successfully",
                            result : result
                        })
                    })
                    .catch(err=>{
                        console.log(err)
                        res.status(500).json({
                            message : "Internal Server Error "
                        })
                    })
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                message : "Internal Server Error"
            })
        })
    
}
exports.joinEvent =(req,res,next)=>{

}
exports.getEventDetail =(req,res,next)=>{
    
}

exports.deleteEvent = (req,res,next)=>{
    UserModel
        .find({_id : req.params.id_author})
        .exec()
        .then(user=>{
            if(user.length == 0 ){
                return res.status(404).json({
                    message : "User doesn't found"
                })
            }
            else {
                EventModel
                    .find({_id : req.params.id_event})
                    .exec()
                    .then(event=>{
                        if(event.length == 0){
                            return res.status(404).json({
                                message : "Event doesn't found"
                            })
                        } 
                        else { 
                            res.status(200).json({
                                message : "Delete Event Successfully"
                            })
                        }
                    })
                    .catch(err=>{
                        res.statu(500).json({
                            message : "Internal Server Error"
                        })
                    })
            }
        })
        .catch(err=>{
            res.statu(500).json({
                message : "Internal Server Error"
            })
        })
}
