const mongoose = require("mongoose")
const Event = require("../models/eventModel")
const Comment = require("../models/commentModel")

exports.getAllEventFeed = (req,res,next)=>{
    Event.find()
    .select('_id eventName place eventDate startTime endTime author detail comment currentSeat totalSeat timestamp')
    .populate()
    .exec()
    .then(docs =>{
        res.status(200).json({
            count : docs.length,
            event : docs.map(doc =>{
                return{
                    _id : doc._id,
                    eventName : doc.eventName,
                    place : doc.place,
                    eventDate : doc.eventDate,
                    author : doc.author,
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
exports.createEvent =(req,res,next)=>{}
exports.joinEvent =(req,res,next)=>{}
exports.getEventDetail =(req,res,next)=>{}
exports.deleteEvent = (req,res,next)=>{}
