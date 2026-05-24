import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Vehicle from '../models/Vehicle.js';
import Dispatch from '../models/Dispatch.js';
import Activity from '../models/Activity.js';
import { analyzeIncident } from './incidentLogic.js';

dotenv.config();

const demoUser = {
  name: 'Demo Operations Manager',
  email: 'demo@opspulse.com',
  password: 'OpsPulse@123',
  role: 'manager',
};

const addDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const seed = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required to seed demo data.');
  }

  await mongoose.connect(process.env.MONGO_URI);

  await Promise.all([
    User.deleteMany({}),
    Vehicle.deleteMany({}),
    Dispatch.deleteMany({}),
    Activity.deleteMany({}),
  ]);

  const hashedPassword = await bcrypt.hash(demoUser.password, 10);
  const user = await User.create({
    name: demoUser.name,
    email: demoUser.email,
    password: hashedPassword,
    role: demoUser.role,
  });

  const vehicles = await Vehicle.insertMany([
    { vehicleId: 'TRK-1024', driver: 'Aarav Mehta', fuelLevel: 82, capacity: 18, status: 'In Transit', wearAndTear: 34 },
    { vehicleId: 'TRK-1148', driver: 'Priya Nair', fuelLevel: 64, capacity: 22, status: 'Delayed', wearAndTear: 71 },
    { vehicleId: 'TRK-1287', driver: 'Kabir Sharma', fuelLevel: 91, capacity: 16, status: 'Available', wearAndTear: 22 },
    { vehicleId: 'TRK-1392', driver: 'Neha Rao', fuelLevel: 38, capacity: 20, status: 'Maintenance', wearAndTear: 88 },
    { vehicleId: 'TRK-1450', driver: 'Imran Khan', fuelLevel: 57, capacity: 24, status: 'In Transit', wearAndTear: 49 },
    { vehicleId: 'TRK-1511', driver: 'Maya Iyer', fuelLevel: 76, capacity: 14, status: 'Available', wearAndTear: 18 },
  ]);

  const routeDelay = analyzeIncident('Heavy traffic and road closure near the industrial corridor.');
  const mechanical = analyzeIncident('Engine overheating and coolant leakage reported during route.');
  const operationsDelay = analyzeIncident('Loading dock queue is blocking scheduled warehouse pickup.');
  const critical = analyzeIncident('Minor crash reported near plant gate, emergency response requested.');

  await Dispatch.insertMany([
    {
      title: 'Raw Material Transfer - Plant A',
      source: 'Supplier Hub, Pune',
      destination: 'Plant A Assembly Dock',
      assignedVehicle: vehicles[0]._id,
      status: 'In Transit',
      priority: 'High',
      expectedDelivery: addDays(1),
    },
    {
      title: 'Finished Goods Dispatch - North Zone',
      source: 'Plant B Warehouse',
      destination: 'Regional DC, Delhi',
      assignedVehicle: vehicles[1]._id,
      status: 'Delayed',
      priority: 'Critical',
      expectedDelivery: addDays(0),
      incidentDescription: 'Heavy traffic and road closure near the industrial corridor.',
      semanticCategory: routeDelay.category,
      riskLevel: routeDelay.riskLevel,
      recommendedAction: routeDelay.recommendedAction,
      operationalImpact: routeDelay.operationalImpact,
    },
    {
      title: 'Spare Parts Emergency Run',
      source: 'Central Stores',
      destination: 'Line 4 Maintenance Bay',
      assignedVehicle: vehicles[4]._id,
      status: 'In Transit',
      priority: 'Critical',
      expectedDelivery: addDays(0),
    },
    {
      title: 'Packaging Material Replenishment',
      source: 'Vendor Yard 7',
      destination: 'Plant C Packaging Unit',
      assignedVehicle: vehicles[2]._id,
      status: 'Assigned',
      priority: 'Medium',
      expectedDelivery: addDays(2),
    },
    {
      title: 'Export Container Transfer',
      source: 'Plant A Export Bay',
      destination: 'Nhava Sheva Port',
      assignedVehicle: vehicles[3]._id,
      status: 'Delayed',
      priority: 'High',
      expectedDelivery: addDays(1),
      incidentDescription: 'Engine overheating and coolant leakage reported during route.',
      semanticCategory: mechanical.category,
      riskLevel: mechanical.riskLevel,
      recommendedAction: mechanical.recommendedAction,
      operationalImpact: mechanical.operationalImpact,
    },
    {
      title: 'Warehouse Resupply Loop',
      source: 'Warehouse 2',
      destination: 'Plant B Staging Area',
      status: 'Pending',
      priority: 'Low',
      expectedDelivery: addDays(3),
    },
    {
      title: 'Assembly Line Buffer Stock',
      source: 'Vendor Cluster East',
      destination: 'Plant D Receiving',
      status: 'Delivered',
      priority: 'Medium',
      expectedDelivery: addDays(-1),
      updatedAt: addDays(-1),
    },
    {
      title: 'Dock Congestion Recovery',
      source: 'Inbound Yard',
      destination: 'Warehouse 1',
      status: 'Delayed',
      priority: 'High',
      expectedDelivery: addDays(0),
      incidentDescription: 'Loading dock queue is blocking scheduled warehouse pickup.',
      semanticCategory: operationsDelay.category,
      riskLevel: operationsDelay.riskLevel,
      recommendedAction: operationsDelay.recommendedAction,
      operationalImpact: operationsDelay.operationalImpact,
    },
    {
      title: 'Plant Gate Incident Response',
      source: 'Plant Gate 3',
      destination: 'Safety Control Center',
      status: 'Delayed',
      priority: 'Critical',
      expectedDelivery: addDays(0),
      incidentDescription: 'Minor crash reported near plant gate, emergency response requested.',
      semanticCategory: critical.category,
      riskLevel: critical.riskLevel,
      recommendedAction: critical.recommendedAction,
      operationalImpact: critical.operationalImpact,
    },
  ]);

  await Activity.insertMany([
    { action: 'Created dispatch: Raw Material Transfer - Plant A', performedBy: user._id, timestamp: addDays(-2) },
    { action: 'Updated dispatch Spare Parts Emergency Run status to In Transit', performedBy: user._id, timestamp: addDays(-1) },
    { action: 'Reported Medium incident for dispatch Finished Goods Dispatch - North Zone', performedBy: user._id, timestamp: new Date(Date.now() - 1000 * 60 * 85) },
    { action: 'Added vehicle TRK-1511', performedBy: user._id, timestamp: new Date(Date.now() - 1000 * 60 * 55) },
    { action: 'Reported High incident for dispatch Export Container Transfer', performedBy: user._id, timestamp: new Date(Date.now() - 1000 * 60 * 35) },
    { action: 'Reported Critical incident for dispatch Plant Gate Incident Response', performedBy: user._id, timestamp: new Date(Date.now() - 1000 * 60 * 12) },
  ]);

  console.log('Demo data seeded successfully.');
  console.log(`Email: ${demoUser.email}`);
  console.log(`Password: ${demoUser.password}`);

  await mongoose.disconnect();
};

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
