const { Usermodel } = require("../models/user");


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

const profiledit = async(req, res, next){
    try{
        const userme = req.userid;
        const { bio, image, username } = req.body

        if(!username){
            return res.status.json({
                message: "Atleast put username"
            })
        }
        
        const profile = await Usermodel.findOneAndUpdate(
            { _id: userme },
            {
                bio: bio,
                image: image,
                username: username
            },
            {new: true}
        ).select("-__v -password")

        if(!profile){
            return res.status(403).json({
                message: ""
            })
        }
    }catch(e){
        next(e)
    }
}