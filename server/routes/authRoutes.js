import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { authRateLimit } from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/register', authRateLimit, validateRequest('register'), registerUser);
router.post('/login', authRateLimit, validateRequest('login'), loginUser);

export default router;
