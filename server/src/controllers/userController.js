const router = require('express').Router();
const cors = require('cors')
const authService = require('../services/authService.js');

//Get All
// router.get('/users', async (req,res) => {
//     let user = await authService.getAll();
//     console.log('users:', user)
    
//     res.send(user);
// })

router.post('/users', (req, res) => {
    let user = req.body;
    console.log('user:', user)
})


module.exports = router;