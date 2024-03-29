const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware.js')
const homeServicesService = require('../services/homeServicesService.js');

router.get('/', async (req, res) => {
    try {
        let result = await homeServicesService.getAll();

        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
    
});

router.post('/create',isAuth, async (req, res) => {
    let homeService = req.body;

    if(res.locals.user) {
        try {
            let result = await homeServicesService.create(homeService);

            res.json(result); 
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(401).json({ code: 401, message: 'Unauthorized request' });
    }
});


router.get('/search', async (req, res) => {
    const { typeOfService, cityOfOperation } = req.query;

    try {
        let result = await homeServicesService.search(typeOfService, cityOfOperation);

        res.json(result); 
    } catch (error) {
        res.status(500).json(error);
    }

    res.end();
});


router.get('/:homeServiceId', async (req, res) => {
    let homeServiceId = req.params.homeServiceId;
    try {
        let result = await homeServicesService.getOne(homeServiceId);

        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.put('/:homeServiceId', isAuth, async (req, res) => {
    let homeServiceId = req.params.homeServiceId;
    let homeService = req.body;

    try {
        let actualHomeServiceFromDb = await homeServicesService.getOne(homeServiceId);

        if(actualHomeServiceFromDb.creator == res.locals.user.userId ){
            try {
                let result = await homeServicesService.updateOne(homeServiceId, homeService);

                res.json(result);
            } catch (error) {
                throw { code: 500, message: error };
            }
        } else {
            throw { code: 401, message: 'Unauthorized request' };
        }
    } catch (error) {
        if(error.code) {
            res.status(error.code).json(error);
        } else {
            res.status(500).json(error);
        }
    }
});

router.delete('/:homeServiceId', isAuth, async (req, res) => {
    let homeServiceId = req.params.homeServiceId;

    try {
        let service = await homeServicesService.getOne(homeServiceId);

        if(service.creator == req.user.userId) {
            let result = await homeServicesService.deleteOne(homeServiceId);

            res.json(result);
        } else {
            throw { code: 401, message: 'Unauthorized request' };
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;
