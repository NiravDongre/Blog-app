const express = require("express");
const cors = require("cors")
const { userRoute } = require("./routes/user");
const { blogRoute } = require("./routes/blog");
const mongoose = require("mongoose");

const app = express()
app.use(express.json())
app.use(cors())
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute)

async function main(){
   
   await mongoose.connect("mongodb+srv://nsd3284_db_user:mIaNJ6XD7yV9yLWN@cluster59.yl96cv3.mongodb.net/blog-posting-app");
   console.log("The server is running on $3000");

}
main();

app.listen(3000);
