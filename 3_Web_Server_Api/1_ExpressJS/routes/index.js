import { Router } from "express";
import { authMiddleware } from "../http/middleware/auth.js";
// Controllers
import { AuthController } from "../http/controllers/AuthController.js";
import { UsersController } from "../http/controllers/UsersController.js";

const router = Router();

// Authentication
router.post('/login', AuthController.login);
router.post('/logout', authMiddleware, AuthController.logout);
// User actions
router.get('/user', authMiddleware, UsersController.getUsers);
router.post('/user', authMiddleware, UsersController.createUser);
router.patch('/user/:identifier', authMiddleware, UsersController.updateUser);
router.delete('/user/:identifier', authMiddleware, UsersController.deleteUser);

export { router }