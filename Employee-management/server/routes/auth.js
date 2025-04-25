// auth.js (Backend Route)
import express from 'express';
import { loginUser, verify } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/verify', authMiddleware, verify);  // Make sure this is correct

export default router;
