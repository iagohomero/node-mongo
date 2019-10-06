const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/home-controller');
const homeController = new HomeController();
const homeRoutes = HomeController.routes();

router.get(homeRoutes.home, homeController.home());

module.exports = router;
