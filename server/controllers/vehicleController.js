import Vehicle from '../models/Vehicle.js';
import Activity from '../models/Activity.js';

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    await Activity.create({ action: `Added vehicle ${vehicle.vehicleId}`, performedBy: req.user._id });
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    await Activity.create({ action: `Updated vehicle ${vehicle.vehicleId}`, performedBy: req.user._id });
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    await Activity.create({ action: `Deleted vehicle ${vehicle.vehicleId}`, performedBy: req.user._id });
    res.json({ message: 'Vehicle removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
