import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true, unique: true },
  driver: { type: String, required: true },
  fuelLevel: { type: Number, required: true },
  capacity: { type: Number, required: true },
  status: { type: String, enum: ['Available', 'In Transit', 'Delayed', 'Maintenance'], default: 'Available' },
  maintenanceDue: { type: Date },
  wearAndTear: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Vehicle', vehicleSchema);
