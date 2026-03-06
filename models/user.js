const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    email: {type: String, unique : true},
    password: String,
    bio: String,
    image: String,
    username: {type: String, unique: true}
});


const Usermodel = mongoose.model("user", User);


module.exports = {
    Usermodel
}