const { Router } = require("express");
const { userMiddleware } = require("../middleware/userMiddlerware");
const { profile, profiledit } = require("../controllers/user.controller");

const userRoute = Router();

userRoute.get("/profile", userMiddleware, profile);
userRoute.get("/profile", userMiddleware, profiledit);


module.exports = {
    userRoute
}