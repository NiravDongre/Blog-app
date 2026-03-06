const { Router } = require('express');
const { signup, signin } = require('../controllers/auth.controller');

const authRoute = Router()

authRoute.post("/signup", signup);

authRoute.post("/signin", signin);

module.exports = {
    authRoute
}

