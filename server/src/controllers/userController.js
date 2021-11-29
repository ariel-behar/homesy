const router = require('express').Router();
const cors = require('cors')
const authService = require('../services/authService.js');

router.post('/register', async (req, res) => {
    let {username, password} = req.body;
    
    try {
        let response = await authService.register(username, password);
        res.json(response);
    } catch (error) {
        console.log(error)
    }  
})


module.exports = router;