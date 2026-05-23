import mongoose from 'mongoose';

const dispatchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  assignedVehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  status: { type: String, enum: ['Pending', 'Assigned', 'In Transit', 'Delivered', 'Delayed'], default: 'Pending' },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  expectedDelivery: { type: Date, required: true },
  incidentDescription: { type: String },
  semanticCategory: { type: String },
  riskLevel: { type: String }
}, { timestamps: true });

export default mongoose.model('Dispatch', dispatchSchema);
