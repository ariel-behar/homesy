const router = require('express').Router();
const authController = require('../controllers/authController.js');
const homeServicesController = require('../controllers/homeServicesController.js');
const favoritesController = require('../controllers/favoritesController.js');
const homeServicesService = require('../services/homeServicesService.js');
const { isAuth } = require('../middlewares/authMiddleware.js');


router.use('/users', authController);
router.use('/home-services', homeServicesController)
router.use('/home-services/favorites', favoritesController);

router.get('/my-profile', isAuth, async (req, res) => {
    let userId = req.user.userId;

    try {
        let result = await homeServicesService.getAllByUser(userId);

        res.json(result);
    } catch (error) {
        res.status(500).json({code: 500, message: 'An error occurred while processing your request'});
    }
});


module.exports = router;