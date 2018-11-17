const mongoose = require("mongoose")
const EventModel = require("../models/eventModel")
const Comment = require("../models/commentModel")
const UserModel =require('../models/userModel')
exports.getAllEventFeed = (req,res,next)=>{
    EventModel.find()
    .select('_id eventName fullName iconType place eventDate startTime endTime detail comment currentSeat totalSeat timestamp')
    .populate('author' , 'fullName')
    .exec()
    .then(docs =>{
        
        res.status(200).json({
            count : docs.length,
            event : docs.map(doc =>{
                return{
                    _id : doc._id,
                    comment : doc.comment,
                    detail : doc.detail,
                    eventName : doc.eventName,
                    startTime : doc.startTime,
                    endTime : doc.endTime,
                    place : doc.place,
                    eventDate : doc.eventDate,
                    author : doc.author,
                    iconType : doc.iconType,
                    request : {
                        type : 'GET',
                        url : ''
                    }
                }
            })
        })
    })
    .catch(err =>{
        res.status(500).json({
            error : err
        })
    })
   
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
                     userID : user[0]._id,
                    eventName : req.body.eventName,
                    author : req.body.author ,
                    eventDate : req.body.eventDate ,
                    startTime : req.body.startTime,
                    endTime  : req.body.endTime  ,
                    place : req.body.place,
                    currentSeat : req.body.currentSeat,
                    totalSeat : req.body.totalSeat,
                    detail : req.body.detail,
                    iconType : req.body.iconType
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
                            message : "Create Event Error ",
                            err : err
                        })
                    })
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                message : "Internal Server Error",
                err : err
            })
        })
    
}
exports.joinEvent =(req,res,next)=>{
    UserModel
    .find({_id : req.body.userID})
    .exec()
    // .populate()
    .then(user=>{
        if(user.length == 0){
             res.status(404).json({
                message : "User doesn't found"
            })
        }
            else { 
                EventModel
                .fine({_id :req.body.eventID})
                .exec()
                .then(event=>{
                    if(event.length == 0){
                        res.status(404).json({
                            message : "Event doesn't found"
                        })
                    }
                    else{
                        if(event.currentSeat == event.totalSeat){
                            return res.status(200).json({
                                messsage : "Event Full"
                            })
                        }
                        else{
                            let seat = event.current + 1
                            EventModel.findByIdAndUpdate(req.body.eventID,{$set:{currentSeat:seat}})
                            EventModel.updateOne(req.body.eventID,{$set:{userJoin:req.body._id}})
                        }
                    }
                })
                .catch(err=>{
                    res.status(401).json({
                        message : "Event out"
                    })
                })
//             const Seat = new seatModel({
//                 _id : mongoose.Schema.Types.ObjectId,
//                 eventID : req.body.eventID,
//                 max : req.body.max
// })
//             Seat
//                 .save()
//                 .then(result => {
//                     res.status(201).json({
//                         message : "Join Event",
//                         result : result
//                     })
//                 })
//                 .catch(err=>{
//                     console.log(err)
//                     res.status(500).json({
//                         message : "Internal Server Error"
//                     })
//                 })
        }
    })
    .catch(err=>{
        res.status(401).json({
            error : err
        })
    })
}

exports.getEventDetail =(req,res,next)=>{
    console.log(req.params.eventID)
    EventModel.findById(req.params.eventID)
        .exec()
        .then(event=>{
            if(event.length == 0){
                return res.status(404).json({
                    message : "EventDetail dosen't found"
                })
            }
           
            else{
                console.log(event)
                res.status(200).json({
                    ...event._doc
            })
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                erorr : err
            })
        })
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
