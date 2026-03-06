const { Usermodel } = require("../models/user");
const { zodusern } = require("../schema/schema");


const profile = async (req, res, next)  => {
    try{
        const userme = req.userid;

        const profile = await Usermodel.findById(userme).select("-__v -password");

        if(!profile){
            return res.status(404).json({
                message: "User not Found"
            }
            )
        }

        return res.status(200).json({
            User: "Profile fetched",
            profile: profile
        })
        
    }catch(e){
        next(e)
    }
}

const profiledit = async(req, res, next) => {
    try{
        const userme = req.userid;
        const user = req.body;

        const postload = zodusern.safeParse(user);

        if(!postload.success){
            return res.status(404).json({
                message: "Incorrect Credential"
            })
        }

        const { bio, image, username } = postload.data

        const profile = await Usermodel.findOneAndUpdate(
            { _id: userme },
            {
                bio: bio,
                image: image,
                username: username
            },
            {new: true}
        ).select("-__v -password");

        if(!profile){
            return res.status(403).json({
                message: ""
            })
        }

        return res.status(201).json({
            User: "Profile Updated",
            profile: profile
        })
        
    }catch(e){
        next(e)
    }
}

module.exports = {
    profile, profiledit
}