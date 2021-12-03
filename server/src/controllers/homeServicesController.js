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

router.get('/:homeServiceId', async (req, res) => {
    let homeServiceId = req.params.homeServiceId;

    let result = await homeServicesService.getOne(homeServiceId);

    res.json(result);
});

router.put('/:homeServiceId', isAuth, async (req, res) => {
    let homeServiceId = req.params.homeServiceId;
    let homeService = req.body;

    try {
        let actualHomeServiceFromDb = await homeServicesService.getOne(homeServiceId);
            console.log('actualHomeServiceFromDb.creator', actualHomeServiceFromDb.creator);
            console.log(res.locals.userId);
        if(actualHomeServiceFromDb.creator == res.locals.userId ){
            console.log('actualHomeServiceFromDb.creator', actualHomeServiceFromDb.creator);
            console.log(res.locals.userId);
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
        }
        res.status(500).json(error);
        
    }

});

router.delete('/:homeServiceId', isAuth, async (req, res) => {
    let homeServiceId = req.params.homeServiceId;

    let result = await homeServicesService.deleteOne(homeServiceId);

    res.json(result);
});

module.exports = router;
