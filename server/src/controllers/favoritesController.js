const router = require('express').Router();

const favoritesService = require('../services/favoritesService.js')
const {isAuth} = require('../middlewares/authMiddleware.js')

router.put('/:homeServiceId/add', isAuth, async (req, res) => {
    let homeServiceId = req.params.homeServiceId;
    let userId = req.body['userId'];

    try {
        let result = await favoritesService.addToFavorites(homeServiceId, userId);

        res.json(result);
    } catch (error) {
        if (error.code) {
            res.status(error.code).json(error);
        } else {
            res.status(500).json(error);
        }
    }
});

router.put('/:homeServiceId/remove', isAuth, async (req, res) => {
    let homeServiceId = req.params.homeServiceId;
    let userId = req.body['userId'];

    try {
        let result = await favoritesService.removeFromFavorites(homeServiceId, userId);

        res.json(result);
    } catch (error) {
        if (error.code) {
            res.status(error.code).json(error);
        } else {
            res.status(500).json(error);
        }
    }
});


module.exports = router;