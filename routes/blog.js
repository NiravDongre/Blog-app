const { Router } = require("express");
const { blog } = require("../controllers/blog.controller");

const blogRoute = Router();

blogRoute.get("/", blog)

blogRoute.post("/blog", userMiddleware, )

blogRoute.put("/blog", userMiddleware,)

blogRoute.delete("/blog", (req, res) => {

})

blogRoute.get("/blog", userMiddleware, )

module.exports = {
    blogRoute
}