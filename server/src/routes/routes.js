const router = require('express').Router();
const authController = require('../controllers/authController.js');
const homeServicesController = require('../controllers/homeServicesController.js');


router.use("/users", authController);
router.use('/home-services', homeServicesController)


module.exports = router;