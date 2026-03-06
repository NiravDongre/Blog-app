const express = require('express')
const jwt = require("jsonwebtoken")
const { JWT_USER_SECRET } = require("../config/config.js");

function userMiddleware(req, res, next){
    const token = req.headers.token;

    const response = jwt.verify(token, JWT_USER_SECRET);

    if(response){
        req.userid = response._id;
        next();
    } else{
        res.json({
        message: "Incorrect Cred"
        })
    }


}

module.exports = {
    userMiddleware: userMiddleware
}