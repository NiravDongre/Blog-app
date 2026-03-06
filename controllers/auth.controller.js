const { JWT_USER_SECRET } = require("../config/config");
const { Usermodel } = require("../models/user");
const { requiredbody } = require("../schema/schema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const signup = async (req, res, next) => {

    try{
    const protected = req.body
    const parsedData = requiredbody.safeParse(protected)

    if(!parsedData.success){
        return res.json({
            message: "Put correct Credentials"
        })
    }

    const { email, password } = parsedData.data;
    
    const existemail = await Usermodel.findOne({ email })

    if(existemail){
       return res.json({
            message: "Email already registered"
        })
    }

    const passwordlocker =  await bcrypt.hash(password, 5);

    await Usermodel.create({
        email: email,
        password: passwordlocker
    })
    return res.json({
        message: "You have Signed Up"
    });
    }catch(e){
        next(e)
        return res.status(404).json({
            message: "Something Broke"
        })
    }

}


const signin = async (req, res, next) => {

    try{

    const protected = req.body;
    const parsedData = requiredbody.safeParse(protected)

    if(!parsedData.success){
        return res.json({message: "Incorrect Credentials"})
    }

    const { email, password } = req.body;

    const protect = await Usermodel.findOne({
        email: email
    });

    if(!protect){
        return res.json({
            message: "You are not Signed IN"
        })
    }

    const passwordmatcher = await bcrypt.compare(password, protect.password);

    if(!passwordmatcher){
        return res.status(403).json({
            message: "Incorrect password"
        })
    }
        const token = jwt.sign({
            _id : protect._id.toString()
        }, JWT_USER_SECRET);

        return  res.json({
            token: token,
            message: "User has Sign IN"
        })

    } catch(e) {

        next(e)
        return res.status(403).json({
        message: "Unauthrized or User not Found"});
    }
}

module.exports = {
    signup, signin
}