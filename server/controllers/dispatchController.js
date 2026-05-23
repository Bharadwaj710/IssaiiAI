import Dispatch from '../models/Dispatch.js';
import Vehicle from '../models/Vehicle.js';
import Activity from '../models/Activity.js';
import { analyzeIncident } from '../utils/incidentLogic.js';

export const getDispatches = async (req, res) => {
  try {
    const dispatches = await Dispatch.find({}).populate('assignedVehicle', 'vehicleId driver');
    res.json(dispatches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDispatch = async (req, res) => {
  try {
    const dispatch = await Dispatch.create(req.body);
    await Activity.create({ action: `Created dispatch: ${dispatch.title}`, performedBy: req.user._id });
    if (dispatch.assignedVehicle) {
      await Vehicle.findByIdAndUpdate(dispatch.assignedVehicle, { status: 'In Transit' });
    }
    res.status(201).json(dispatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDispatchStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const dispatch = await Dispatch.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('assignedVehicle');
    if (!dispatch) return res.status(404).json({ message: 'Dispatch not found' });
    
    await Activity.create({ action: `Updated dispatch ${dispatch.title} status to ${status}`, performedBy: req.user._id });
    
    if (status === 'Delivered' && dispatch.assignedVehicle) {
       await Vehicle.findByIdAndUpdate(dispatch.assignedVehicle._id, { 
         status: 'Available',
         $inc: { wearAndTear: 10 }
       });
    }
    
    res.json(dispatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const reportIncident = async (req, res) => {
  try {
    const { incidentDescription } = req.body;
    const { category, riskLevel } = analyzeIncident(incidentDescription);
    
    const dispatch = await Dispatch.findByIdAndUpdate(req.params.id, {
      incidentDescription,
      semanticCategory: category,
      riskLevel,
      status: 'Delayed'
    }, { new: true }).populate('assignedVehicle');
    
    if (!dispatch) return res.status(404).json({ message: 'Dispatch not found' });
    
    if (dispatch.assignedVehicle) {
      await Vehicle.findByIdAndUpdate(dispatch.assignedVehicle._id, { status: 'Delayed' });
    }
    
    await Activity.create({ action: `Reported ${riskLevel} incident for dispatch ${dispatch.title}`, performedBy: req.user._id });
    
    res.json(dispatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
