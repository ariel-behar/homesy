const router = require('express').Router();
const userController = require('../controllers/userController.js')
const homeServicesController = require('../controllers/homeServicesController.js');


router.use("/users", userController);
router.use('/home-services', homeServicesController)


module.exports = router;