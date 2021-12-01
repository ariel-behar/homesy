const homeServicesService = require('../services/homeServicesService.js')

const router = require('express').Router();


router.get('/', async (req, res) => {
    let result = await homeServicesService.getAll();

    res.json(result);
})

router.post('/create', async (req, res) => {
    let homeService = req.body;
    
    let result = await homeServicesService.create(homeService);
    
    res.json(result);
});


router.get('/:homeServiceId', async (req, res) => {
    let homeServiceId = req.params.homeServiceId;
    
    let result = await homeServicesService.getOne(homeServiceId);

    res.json(result);
});

router.put('/:homeServiceId', async (req, res) => {
    let homeServiceId = req.params.homeServiceId;
    let homeService = req.body;

    let result = await homeServicesService.updateOne(homeServiceId, homeService);

    res.json(result);
});

router.delete('/:homeServiceId', async (req, res) => {
    let homeServiceId = req.params.homeServiceId;

    let result = await homeServicesService.deleteOne(homeServiceId);

    res.json(result);
});


module.exports = router;