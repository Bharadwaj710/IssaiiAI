import express from 'express';
import { getDispatches, createDispatch, updateDispatchStatus, reportIncident } from '../controllers/dispatchController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getDispatches).post(protect, createDispatch);
router.route('/:id/status').put(protect, updateDispatchStatus);
router.route('/:id/incident').post(protect, reportIncident);

export default router;
