import express from 'express';
import { getDispatches, createDispatch, updateDispatchStatus, reportIncident } from '../controllers/dispatchController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

router.route('/').get(protect, getDispatches).post(protect, validateRequest('dispatch'), createDispatch);
router.route('/:id/status').put(protect, validateRequest('status'), updateDispatchStatus);
router.route('/:id/incident').post(protect, validateRequest('incident'), reportIncident);

export default router;
