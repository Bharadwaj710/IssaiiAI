import Dispatch from '../models/Dispatch.js';
import Vehicle from '../models/Vehicle.js';
import Activity from '../models/Activity.js';

export const getDashboardData = async (req, res) => {
  try {
    const activeDispatchesCount = await Dispatch.countDocuments({ status: { $in: ['In Transit', 'Assigned'] } });
    const delayedDeliveriesCount = await Dispatch.countDocuments({ status: 'Delayed' });
    
    const totalVehicles = await Vehicle.countDocuments();
    const activeVehicles = await Vehicle.countDocuments({ status: 'In Transit' });
    const fleetUtilization = totalVehicles > 0 ? ((activeVehicles / totalVehicles) * 100).toFixed(1) : 0;
    
    const criticalIncidentsCount = await Dispatch.countDocuments({ riskLevel: 'Critical' });
    const completedDeliveriesCount = await Dispatch.countDocuments({ status: 'Delivered' });

    const recentActivities = await Activity.find({}).sort({ timestamp: -1 }).limit(10).populate('performedBy', 'name');
    
    // Analytics
    const incidentDistribution = await Dispatch.aggregate([
      { $match: { semanticCategory: { $exists: true, $ne: null } } },
      { $group: { _id: '$semanticCategory', count: { $sum: 1 } } }
    ]);

    const deliveryTrends = await Dispatch.aggregate([
      { $match: { status: 'Delivered' } },
      { $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 7 }
    ]);

    res.json({
      metrics: {
        activeDispatches: activeDispatchesCount,
        delayedDeliveries: delayedDeliveriesCount,
        fleetUtilization,
        criticalIncidents: criticalIncidentsCount,
        completedDeliveries: completedDeliveriesCount
      },
      recentActivities,
      analytics: {
        incidentDistribution,
        deliveryTrends
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
