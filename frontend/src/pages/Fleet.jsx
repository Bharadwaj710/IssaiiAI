import { useState, useEffect } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Plus, Search, Fuel, Package, Truck, Wrench } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const styles = {
    'Available': 'bg-success/10 text-success border-success/20',
    'In Transit': 'bg-primary/10 text-primary border-primary/20',
    'Delayed': 'bg-warning/10 text-warning border-warning/20',
    'Maintenance': 'bg-danger/10 text-danger border-danger/20'
  };
  
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-card text-muted border-borderline'}`}>
      {status}
    </span>
  );
};

const Fleet = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ vehicleId: '', driver: '', fuelLevel: '', capacity: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchVehicles = async () => {
    try {
      const res = await api.get('/vehicles');
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    try {
      await api.post('/vehicles', newVehicle);
      setShowAddModal(false);
      setNewVehicle({ vehicleId: '', driver: '', fuelLevel: '', capacity: '' });
      fetchVehicles();
    } catch (err) {
      console.error(err);
      alert('Failed to add vehicle');
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  const filteredVehicles = vehicles.filter((vehicle) => {
    const search = searchTerm.toLowerCase();
    return vehicle.vehicleId.toLowerCase().includes(search) || vehicle.driver.toLowerCase().includes(search);
  });

  return (
    <div className="space-y-6 relative">
      <div className="card flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Fleet Management</h1>
          <p className="text-sm text-muted">Monitor and deploy your transport assets</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary gap-2"
        >
          <Plus size={18} />
          Register Vehicle
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search vehicles..." 
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full bg-card border border-borderline rounded-full pl-11 pr-4 py-2 text-sm focus:outline-none focus:border-primary text-white"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          <button className="px-4 py-1.5 text-sm bg-card border border-borderline rounded-full text-muted hover:bg-[#0B0F19] transition font-medium shadow-sm">All Status</button>
          <button className="px-4 py-1.5 text-sm bg-card border border-borderline rounded-full text-muted hover:bg-[#0B0F19] transition font-medium shadow-sm">Sort by ID</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVehicles.map((v, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            key={v._id} 
            className="card card-hover group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors">
                  <Truck size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg tracking-tight">{v.vehicleId}</h3>
                  <p className="text-xs text-muted font-medium">Operator: {v.driver}</p>
                </div>
              </div>
              <StatusBadge status={v.status} />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-[#0B0F19] rounded-xl p-3 border border-borderline">
                <div className="flex items-center gap-2 text-xs text-muted font-medium mb-1">
                  <Fuel size={14} className="text-accent" /> Fuel Level
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-lg font-bold text-white">{v.fuelLevel}%</span>
                  <div className="flex-1 h-1.5 bg-borderline rounded-full mb-1.5 overflow-hidden">
                    <div className={`h-full ${v.fuelLevel < 20 ? 'bg-danger' : 'bg-accent'}`} style={{ width: `${v.fuelLevel}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="bg-[#0B0F19] rounded-xl p-3 border border-borderline">
                <div className="flex items-center gap-2 text-xs text-muted font-medium mb-1">
                  <Wrench size={14} className={v.wearAndTear >= 80 ? "text-warning" : "text-primary"} /> Wear & Tear
                </div>
                <div className="flex items-end gap-2">
                  <span className={`text-lg font-bold ${v.wearAndTear >= 80 ? "text-warning" : "text-white"}`}>{v.wearAndTear || 0}%</span>
                  {v.wearAndTear >= 80 && <span className="text-[10px] bg-warning/10 text-warning border border-warning/20 px-1.5 py-0.5 rounded">Service</span>}
                </div>
              </div>
              <div className="bg-[#0B0F19] rounded-xl p-3 border border-borderline">
                <div className="flex items-center gap-2 text-xs text-muted font-medium mb-1">
                  <Package size={14} className="text-primary" /> Capacity
                </div>
                <div className="text-lg font-bold text-white">{v.capacity} <span className="text-xs font-normal text-muted">tons</span></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="card bg-card w-full max-w-md shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Register New Vehicle</h2>
              <button onClick={() => setShowAddModal(false)} className="text-muted hover:text-white">&times;</button>
            </div>
            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Vehicle ID</label>
                <input required type="text" className="input" value={newVehicle.vehicleId} onChange={e => setNewVehicle({...newVehicle, vehicleId: e.target.value})} placeholder="e.g. TRK-001" />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Driver Name</label>
                <input required type="text" className="input" value={newVehicle.driver} onChange={e => setNewVehicle({...newVehicle, driver: e.target.value})} placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Fuel Level (%)</label>
                  <input required type="number" min="0" max="100" className="input" value={newVehicle.fuelLevel} onChange={e => setNewVehicle({...newVehicle, fuelLevel: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Capacity (tons)</label>
                  <input required type="number" min="1" className="input" value={newVehicle.capacity} onChange={e => setNewVehicle({...newVehicle, capacity: e.target.value})} />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1">Register</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Fleet;
