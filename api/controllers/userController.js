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
    
     // create reusable transporter object using the default SMTP transport
     let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'rendezvarify@gmail.com',
            pass: 'sese59050'
    },   
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Rendez Contect" <rendezvarify@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Verify Your Email For Rendez', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Link For Verify</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}