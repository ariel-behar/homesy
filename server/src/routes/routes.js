const router = require('express').Router();
const userController = require('../controllers/userController.js')


router.use(userController);


module.exports = router;