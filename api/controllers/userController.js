const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const salt = bcrypt.hashSync("myRendez")
const UserModel = require('../models/userModel')
const nodemailer =require("nodemailer")


exports.register = (req,res,next)=>{
    console.log(req.body)
    UserModel
        .find({email : req.body.email})
        .exec()
        .then(user=>{
            if(user.length > 0){
                return res.status(409).json({
                    message : "Mail exists"
                })
            }else{
                bcrypt.hash(req.body.password , salt , null , (err, hash)=>{
                 
                    if(err){
                        return res.status(500).json({
                            message : "Something went wrong"
                        })
                    }else{
                        const User = new UserModel({
                            _id : new mongoose.Types.ObjectId(),
                            studentCode : req.body.studentCode,
                            fullName : req.body.fullName,
                            email : req.body.email,
                            password : hash, 
                            events : [],
                            sex : req.body.sex,
                            confirmationToken : false,
                            notifications : []
                        })
                        
                        User
                            .save()
                            .then(result =>{
                                res.status(201).json({
                                    message : "Create user successfully",
                                    result  
                                })
                            }).catch(err=>{
                                console.log(err)
                                res.status(500).json({
                                    message : "Something went wrong"
                                })
                            })
                    }
                })
            }
        })
        .catch(err=>{
            
            res.status(500).json({
                message : "Something went wrong"
            })
        })
    }
exports.login =(req,res,next)=>{
    UserModel
        .find({email : req.body.email})
        .exec()
        .then(user=>{
           if(user.length < 1){
                return res.status(401).json({
                    message : "Auth failed"        
                })
           }
           bcrypt.compare(req.body.password , user[0].password , (err , result)=>{
               if(err){
                   return res.status(401).json({
                       message : "Auth failed"
                   })
               }if(result){
                   const token = jwt.sign({
                        email : user[0].email,
                        userId : user[0]._id
                   } , "Secret_Key" , { expiresIn : "1h"})
                   return res.status(200).json({
                       message : "Auth successfully",
                       token : token
                   })
               }
               res.status(401).json({
                   message : "Auth Failed"
               })
           })
        }).catch(err=>{
            res.status(500).json({
                message : "Something went wrong"
            })
        })
}
exports.forgot =(req,res,next)=>{
    UserModel
        .find({email : req.body.email})
        .exec()
        .then(user=>{
            if(user.length < 1){
                return res.status(401).json({
                    message : "User doesn't found"        
                })
           }
           
        })
        .catch(err=>{
            res.status(500).json({
                message : "Something went wrong"
            })
        })
}
exports.verify =(req,res,next)=>{

}
exports.resend =(req,res,next)=>{
    
}