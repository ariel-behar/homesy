const HomeService = require('../models/HomeService.js');

const router = require('express').Router();

router.post('/create', async (req, res) => {
    let homeService = req.body;
    
    let result = await HomeService.create(homeService);
    
    res.json(result);
});

module.exports = router;