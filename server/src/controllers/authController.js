const jwt = require('jsonwebtoken');
require('dotenv').config()

const router = require('express').Router();

const authService = require('../services/authService.js');
const { isAuth } = require('../middlewares/authMiddleware.js')
const logUserIn = require('../utils/logUserIn.js')

router.post('/register', async (req, res) => {
    let { firstName, lastName, email, password, gender } = req.body;

    try {
        let userResponse = await authService.register({firstName, lastName, email, password, gender});

        if (userResponse) {
            let user = {
                userId: userResponse._id,
                firstName: userResponse.firstName,
                lastName: userResponse.lastName,
                email: userResponse.email,
                gender: userResponse.gender,
            };

            let AUTH_TOKEN = logUserIn(user);

            return res.json({ ...user, AUTH_TOKEN });
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

router.post('/login', async (req, res) => {
    let {email, password} = req.body;

    try {
        let user = await authService.login(email, password);   
        
        if (user) {
           let AUTH_TOKEN = logUserIn(user);

           return res.json({ ...user, AUTH_TOKEN });
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/logout', isAuth, (req, res) => {
    delete res.locals.user

    res.json({ok:true})
})

module.exports = router;
