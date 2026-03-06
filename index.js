require('dotenv').config()
const express = require("express");
const cors = require("cors");

const { userRoute } = require("./routes/user");
const { blogRoute } = require("./routes/blog");
const { authRoute } = require("./routes/auth");

const mongoose = require("mongoose");

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);

async function main(){

   await mongoose.connect(process.env.MONGO_URL);
   console.log("The server is running on $3000");
}
main();

app.listen(3000);
