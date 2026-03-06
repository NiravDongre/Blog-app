const { Router } = require("express");
const { blog, userblog, postblog, putblog, deleteblog } = require("../controllers/blog.controller");
const { userMiddleware } = require("../middleware/userMiddlerware");

const blogRoute = Router();

blogRoute.get("/", blog)

blogRoute.get("/blog", userMiddleware, userblog)

blogRoute.post("/blog", userMiddleware, postblog)

blogRoute.put("/blog", userMiddleware, putblog)

blogRoute.delete("/blog", userMiddleware, deleteblog)


module.exports = {
    blogRoute
}