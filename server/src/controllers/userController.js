const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const router = require('express').Router();

const authService = require('../services/authService.js');

router.post('/register', async (req, res) => {
    let { username, password } = req.body;

    try {
        let user = await authService.register(username, password);

        if (user) {
            let payload = {
                userId: user._id,
                username: user.username,
            };

            let AUTH_TOKEN = jwt.sign(payload, process.env.AUTH_TOKEN_SECRET);

            return res.send({ ...payload, AUTH_TOKEN });
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async (req, res) => {
    let {username, password} = req.body;

    try {
        let user = await authService.login(username, password);   
        
        if (user) {
            let payload = {
                _id: user._id,
                username: user.username,
            };

            let AUTH_TOKEN = jwt.sign(payload, process.env.AUTH_TOKEN_SECRET);

            return res.send({ ...payload, AUTH_TOKEN });
        }
        
    } catch (error) {
        console.log(error);
    }
    
})

module.exports = router;
