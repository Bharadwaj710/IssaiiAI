import express from 'express';
import { getVehicles, addVehicle, updateVehicle, deleteVehicle } from '../controllers/vehicleController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

router.route('/').get(protect, getVehicles).post(protect, validateRequest('vehicle'), addVehicle);
router.route('/:id').put(protect, updateVehicle).delete(protect, deleteVehicle);

export default router;
