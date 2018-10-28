const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const apiRoute = require('./api/routes')
const mongoose = require('mongoose')


app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin' , '*'); // Any Host can use API , Parameter 2 is URL you want to allow CORS
    res.header(
        'Access-Control-Allow-Headers' , 
        'Origin , X-Requested-With , Content-Type , Accept , Authorization'
    ) // Allow Any Header
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods' , 'PUT, POST, PATCH, DELETE , GET')
        return res.status(200).json({})
    }
    next();
})
app.use("/api" , apiRoute)
app.use((req,res,next)=>{
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error , req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error : {
            message: error.message
        }
    })
})

module.exports = app;