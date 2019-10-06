const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth-controller');
const authController = new AuthController();
const authRoutes = AuthController.routes();
const loginMiddleware = require('../middlewares/login-middleware');

router.get(authRoutes.login, loginMiddleware(), authController.login());
router.post(authRoutes.login, authController.loginAction());
router.get(authRoutes.logout, authController.logout());

module.exports = router;
