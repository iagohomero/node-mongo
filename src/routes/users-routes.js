const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
const userController = new UserController();
const userRoutes = UserController.routes();
const userValidations = UserController.validations();

const authMiddleware = require('../middlewares/auth-middleware');

router.get(userRoutes.index, authMiddleware(), userController.index());
router.get(userRoutes.new, authMiddleware(), userController.new());
router.post(userRoutes.create, authMiddleware(), userValidations, userController.create());
router.get(userRoutes.edit, authMiddleware(), userController.edit());
router.put(userRoutes.update, authMiddleware(), userController.update());
router.delete(userRoutes.delete, authMiddleware(), userController.delete());

module.exports = router;
