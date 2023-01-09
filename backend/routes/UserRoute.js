const router = require('express').Router();
const authJwt = require("../middleware/auth.js");
const { register, login, logout, allAccess, userBoard } = require("../controllers/UserController.js");

module.exports = 
    router.post('/api/auth/register', register);
    router.post('/api/auth/login', login);
    router.get('/api/auth/logout',[authJwt], logout);
    router.get('/api/test/all', allAccess);
    router.get('/api/test/user', [authJwt], userBoard);
;