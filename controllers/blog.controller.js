const { Blogmodel } = require("../models/blog")

const userblog = async (req, res, next) => {
    try{
    const userme = req.userid;
    const course = await Blogmodel.find({
        creatorid: userme
    }).select("-__v")

    if(!course){
        return res.json({
            message: "Something went wrong"
        })
    }
    res.json({
        message: "Here is the blog you created",
        course
    })
  } catch(e){
    next(e)
  }
}

const blog = async (req, res, next) => {
    
    try{
    const course = await Blogmodel.find({}).select("-__v")

    if(!course){
        return res.status(404).josn({
            message: "Pls add blog here -->"
        })
    }

    return res.json({
        message:"All the Blogs of Various creator",
        course
    })

    }catch{
        next(e)
    }

}

const postblog = async (req, res) => {
    try{
    const userme = req.userid;
    const { title, blog } = req.body;

    if(!title || !blog){
        return res.status(404).json({
            message: "Pls put correct Inputs"
        })
    }

    const course = await Blogmodel.create({
        title,
        blog,
        creatorid: userme
    })

    if(!course){
        return res.json({
            message: "The Blog have not Created"
        })
    }

    return res.status(201).json({
        message: "The Blog got created"
    })

} catch(e){
    next(e)
 }
}

const putblog = async (req, res, next) => {
    try{
    const userme = req.userid;
    const creatorid = req.params.id;
    const { title, blog } = req.body;

    const course = await Blogmodel.findOneAndUpdate({
    _id: creatorid,
    creatorid: userme
    },{
        title: title, blog: blog
    }, {new: true}).select("-__v");

    if(!course){
    return res.status(403).json({
        message: "Unauthrized or blog not found"
    })
    }

    return res.json({
        message: "The Blog got Updated",
        course: course
    })
} catch(e){
    next(e)
}
}

const deleteblog = async (req, res, next) => {
    try{
    const userme = req.userid;
    const creatorid = req.params.id;
    
    const course = await Blogmodel.findOneAndDelete({
    _id: creatorid,
    creatorid: userme
    }).select("-__v")

    if(!course){
        return res.status(403).json({
            message: "Unauthrized or blog not found"
        })
    }

    return res.status(200).json({
        message: "Blog got deleted"
    })
    } catch(e){
        next(e)
    }
}




module.exports = {
    blog, userblog, postblog, putblog, deleteblog
 
}