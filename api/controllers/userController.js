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
                            message : "Something went wrong",
                            error : err
                        })
                    }else{
                        let pass = Math.floor(1000 + Math.random() * 9000);
                        const User = new UserModel({
                            _id : new mongoose.Types.ObjectId(),
                            studentCode : req.body.studentCode,
                            fullName : req.body.fullName,
                            email : req.body.email,
                            age : req.body.age,
                            password : hash, 
                            events : [],
                            sex : req.body.sex,
                            confirmationToken : false,
                            notifications : [],
                            otp : pass
                        })
                        User
                            .save()
                            .then(result =>{

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
                                    // text: ""+result.otp, // plain text body
                                    html: '<p>'+result.otp+'</p>'// html body
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

                                res.status(201).json({
                                    message : "Create user successfully",
                                    result  
                                })
                            }).catch(err=>{
                                console.log(err)
                                res.status(500).json({
                                    message : "Something went wrong",
                                    error : err
                                })
                            })
                    }
                })
            }
        })
        .catch(err=>{
            
            res.status(500).json({
                message : "Something went wrong",
                error : err
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
                    message : "User not found"        
                })
           }
           bcrypt.compare(req.body.password , user[0].password , (err , result)=>{
               if(err){
                   return res.status(401).json({
                       message : "Wrong Password"
                   })
               }if(result){
                   const token = jwt.sign({
                        email : user[0].email,
                        userId : user[0]._id
                   } , "Secret_Key" , { expiresIn : "1h"})
                   return res.status(200).json({
                       message : "Auth successfully",
                       confirmationToken : user[0].confirmationToken,
                       myJoinEvent : user[0].myJoinEvent,
                       myCreateEvent : user[0].myCreateEvent,
                       token : token,
                       fullName : user[0].fullName,
                        _id : user[0]._id
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
                 res.status(401).json({
                    message : "Email doesn't found"
                })
           }else{
            
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
                            subject: 'Forgot Password', // Subject line
                            //text: 'Hello world?', // plain text body
                            html: '<p>'+user[0].password+'</p>' // html body
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
                        res.status(200).json({
                            message : "Check Your Email"
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
    UserModel
    .find({otp : req.body.otp , _id : req.body._id})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(404).json({
                message : "User doesn't found"
            })
        }
            // else{
            //     UserModel
            //     .findAndUpdate({otp : req.body.otp , _id : req.body._id})
            //     .exec()
            //     .then(user=>{
            //         if(user.length < 0){
            //             return res.status(404).json({
            //                 meesage : "OTP Not Found!!"
            //             })
            //          }
                        else{
                          UserModel.findByIdAndUpdate(req.body._id,{$set:{confirmationToken:true}})
                          .exec()
                          .then(result=>{
                            res.status(201).json({
                                message : "Verify Success",
                                confirmationToken : true
                            })
                          })
                          .catch(err=>{
                              console.log(err)
                          })
                        }
                })
                .catch(err=>{
                    res.status(500).json({
                        error : err
                    })
                })
               
             }
    //  })
//     .catch(err=>{
//         res.status(500).json({
//             error : err
//         })
//     })
// }

exports.resend =(req,res,next)=>{
    
    UserModel
    .find({_id : req.body._id})
    .exec()
    .then(user=>{
       
        if(user.length < 1){
            return res.status(404).json({
                message : "User Not Found"
            })
        }
        else{
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
                    to: user[0].email, // list of receivers
                    subject: 'Verify Your Email For Rendez', // Subject line
                    // text: 'Hello world?', // plain text body
                    html: '<p>'+user[0].otp+'</p>' // html body
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
                res.status(200).json({
                    message : "OTP has been sent"
                })
            }
                })
                .catch(err=>{
                    res.status(500).json({
                        message : "Something went wrong"
                    })
                })
}

exports.profile = (req, res, next)=>{
    UserModel
        .findById(req.body.userId)
        .select("fullName age sex email " + (  req.body.typeEvent == 1 ? " myCreateEvent" : " myJoinEvent") )
        .populate( (  req.body.typeEvent == 1 ? " myCreateEvent" : " myJoinEvent") )
        .exec()
        .then(result=>{
            res.status(200).json({
                result
            })
        })
        .catch(err=>{
            res.status(500).json({
                message : "Internal Server Error",
                error: err
            })
        })
}