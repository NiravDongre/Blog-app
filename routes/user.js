const { Router } = require("express");
const jwt = require("jsonwebtoken")
const { JWT_USER_SECRET } = require("../config/config.js")
const bcrypt = require("bcrypt");
const { Usermodel, Blogmodel } = require("../models/user.js");
const { userMiddleware } = require("../middleware/userMiddlerware.js");
const { z, readonly } = require("zod")

const userRoute = Router();


userRoute.post("/signup", async (req, res) => {
    const requiredbody = z.object({
        email: z
        .trim()
        .email({message: "Please enter Valid email address"})
        .max(100, {meassage: "Email must be no more than 100 Characters."})
        , 
        password: z
        .string()
        .min(3, {message: "Name must be at least 3 character long."})
        .max(8,  {message: "Name must be no more than 8 characters."})
        .toUpperCase(1).toLowerCase(1).length(8).includes("@")
    })

    const parsedData = requiredbody.safeParse(req.body)

    if(!parsedData){
        return res.json({
            message: "Put correct Credentials"
        })
    }

    const { email, password } = req.body;
    
    const existemail = await Usermodel.findOne({ email })

    if(existemail){
       return res.json({
            message: "Email already registered"
        })
    }

    const passwordlocker =  await bcrypt.hash(password, 5);

    try{
    await Usermodel.create({
        email: email,
        password: passwordlocker
    })
    return res.json({
        message: "You have Signed Up"
    });
    }catch(e){
        res.json({
            message: "Something Broke"
        })
    }

})

userRoute.post("/signin", async (req, res) => {
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

    if(passwordmatcher){
        const token = jwt.sign({
            _id : protect._id.toString()
        }, JWT_USER_SECRET);

        return  res.json({
            token: token,
            message: "User has Sign IN"
        })
    } else{
        return res.json(
            console.log("Did you really think this is Your account")
        )
    }
})

userRoute.post("/blog", userMiddleware, async (req, res) => {
    const userme = req.userid;
    const { title, blog } = req.body;

    const course = await Blogmodel.create({
        title,
        blog,
        creatorid: userme
    })

    return res.json({
        message: "The Blog got created",
        course
    })
})

userRoute.put("/blog", userMiddleware,async (req, res) => {
    const userme = req.userid;
    const { title, blog } = req.body;
    const creatorid = req.body.creatorid;

    const course = await Blogmodel.updateOne({
        _id: creatorid,
        creatorid: userme
    },{
        title: title, blog: blog
    });

    return res.json({
        message: "The Blog got Updated",
        course: course._id
    })
})

userRoute.delete("/blog", (req, res) => {

})

userRoute.get("/blog", userMiddleware, async (req, res) => {
    const userme = req.userid;

    const course = await Blogmodel.find({
        creatorid: userme
    })

    if(!course){
        return res.json({
            message: "Something went wrong"
        })
    }
    res.json({
        message: "Here is the blog you created",
        course
    })
})

module.exports = {
    userRoute,
    JWT_USER_SECRET
}