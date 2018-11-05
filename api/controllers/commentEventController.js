const mongoose = require("mongoose")

const Event = require("../models/eventModel")
const Comment = require("../models/commentModel")


exports.getAllEventComment = (req,res,next)=>{
    Comment.find()
    .select('')
    .populate()
    .exec()
    .then()
}
exports.addcomment =(req,res,next)=>{

}
exports.deleteComment =(req,res,next)=>{
    Comment.remove({})
}
exports.updateComment =(req,res,next)=>{}
