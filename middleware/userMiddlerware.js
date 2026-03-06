const jwt = require("jsonwebtoken")
const { JWT_USER_SECRET } = require("../config/config.js");

const userMiddleware = (req, res, next) => {

    try{
    const token = req.headers.token;

    if(!token){
        return res.json({
            message: "Pls Input token"
        })
    }

    const response = jwt.verify(token, JWT_USER_SECRET);

    if(response){
        req.userid = response._id;
        next();
    } else{
        res.status(404).json({
        message: "Incorrect Cred"
        })
    }

} catch(e){
    next(e)
}

}

module.exports = {
    userMiddleware
}