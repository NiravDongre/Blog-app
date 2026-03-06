const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Blog = new Schema({
    title: String,
    blog: String,
    creatorid: ObjectId,
    createdAt: {type: Date, default: Date.now}
});

const Blogmodel = mongoose.model("blog", Blog);

module.exports = {
    Blogmodel
}