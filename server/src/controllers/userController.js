const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const router = require('express').Router();

const authService = require('../services/authService.js');

router.post('/register', async (req, res) => {
    let { firstName, lastName, email, password } = req.body;

    try {
        let user = await authService.register(firstName, lastName, email, password);

        if (user) {
            let payload = {
                _id: user._id,
                firstName: user.firstName,
                email: user.email,
            };

            let AUTH_TOKEN = jwt.sign(payload, process.env.AUTH_TOKEN_SECRET);

            return res.send({ ...payload, AUTH_TOKEN });
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async (req, res) => {
    let {email, password} = req.body;

    try {
        let user = await authService.login(email, password);   
        
        if (user) {
            let payload = {
                userId: user._id,
                firstName: user.firstName,
                email: user.email
            };

            let AUTH_TOKEN = jwt.sign(payload, process.env.AUTH_TOKEN_SECRET);
            return res.send({ ...payload, AUTH_TOKEN });
        }
        
    } catch (error) {
        console.log(error);
    }
    
})

module.exports = router;
