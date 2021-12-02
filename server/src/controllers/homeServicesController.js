const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware.js')
const homeServicesService = require('../services/homeServicesService.js');

router.get('/', async (req, res) => {
    let result = await homeServicesService.getAll();

    res.json(result);
});

router.post('/create',isAuth, async (req, res) => {
    let homeService = req.body;

    if(res.locals.user) {
        console.log(homeService)
        try {
            let result = await homeServicesService.create();

            res.json(result); 
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(401).json({ code: 401, message: 'Unauthorized request' });
    }
});

router.get('/:homeServiceId', async (req, res) => {
    let homeServiceId = req.params.homeServiceId;

    let result = await homeServicesService.getOne(homeServiceId);

    res.json(result);
});

router.put('/:homeServiceId', isAuth, async (req, res) => {
    let homeServiceId = req.params.homeServiceId;
    let homeService = req.body;

    let result = await homeServicesService.updateOne(homeServiceId, homeService);

    res.json(result);
});

router.delete('/:homeServiceId', isAuth, async (req, res) => {
    let homeServiceId = req.params.homeServiceId;

    let result = await homeServicesService.deleteOne(homeServiceId);

    res.json(result);
});

module.exports = router;
