import { useState, useEffect } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Plus, AlertCircle, CheckCircle2, ChevronRight, Navigation } from 'lucide-react';

const Dispatch = () => {
  const [dispatches, setDispatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [selectedDispatch, setSelectedDispatch] = useState(null);
  
  const [newDispatch, setNewDispatch] = useState({
    title: '', source: '', destination: '', expectedDelivery: '', assignedVehicle: '', priority: 'Medium'
  });
  const [incidentText, setIncidentText] = useState('');

  const fetchData = async () => {
    try {
      const [dRes, vRes] = await Promise.all([
        api.get('/dispatches'),
        api.get('/vehicles')
      ]);
      setDispatches(dRes.data);
      setVehicles(vRes.data.filter(v => v.status === 'Available'));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddDispatch = async (e) => {
    e.preventDefault();
    try {
      await api.post('/dispatches', newDispatch);
      setShowAddModal(false);
      fetchData();
    } catch {
      alert('Failed to create dispatch');
    }
  };

  const handleReportIncident = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/dispatches/${selectedDispatch._id}/incident`, { incidentDescription: incidentText });
      setShowIncidentModal(false);
      setIncidentText('');
      fetchData();
    } catch {
      alert('Failed to report incident');
    }
  };
  
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/dispatches/${id}/status`, { status });
      fetchData();
    } catch {
      alert('Failed to update status');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="card flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Dispatch Workflow</h1>
          <p className="text-sm text-muted">Manage routes and operational intelligence</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn btn-primary gap-2">
          <Plus size={18} /> New Dispatch
        </button>
      </div>

      <div className="card !p-0 overflow-x-auto">
        <table className="w-full text-left text-sm text-text">
          <thead className="bg-[#0B0F19] text-muted uppercase text-xs border-b border-borderline font-semibold">
            <tr>
              <th className="px-6 py-4 font-medium">Route / ID</th>
              <th className="px-6 py-4 font-medium">Vehicle</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Intelligence Data</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderline">
            {dispatches.map((d) => (
              <tr key={d._id} className="hover:bg-[#0B0F19]/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-white mb-1">{d.title}</div>
                  <div className="flex items-center text-xs text-muted gap-2">
                    {d.source} <ChevronRight size={12} className="text-primary"/> {d.destination}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-white">{d.assignedVehicle?.vehicleId || 'Unassigned'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    d.status === 'Delivered' ? 'bg-success/20 text-success' : 
                    d.status === 'Delayed' ? 'bg-warning/20 text-warning' : 
                    'bg-primary/20 text-primary'
                  }`}>
                    {d.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {d.semanticCategory ? (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-danger flex items-center gap-1">
                        <AlertCircle size={12} /> {d.semanticCategory}
                      </span>
                      <span className="text-[10px] bg-[#0B0F19] px-2 py-0.5 rounded w-max text-muted border border-borderline shadow-sm">Risk: {d.riskLevel}</span>
                      {d.recommendedAction && (
                        <span className="text-[11px] text-muted max-w-xs">{d.recommendedAction}</span>
                      )}
                    </div>
                  ) : <span className="text-xs text-muted">No issues</span>}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {d.status === 'Assigned' && (
                      <button
                        onClick={() => updateStatus(d._id, 'In Transit')}
                        className="px-2 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded transition text-xs font-semibold"
                        title="Start Transit"
                      >
                        Start
                      </button>
                    )}
                    {d.status !== 'Delivered' && (
                      <button 
                        onClick={() => updateStatus(d._id, 'Delivered')}
                        className="p-1.5 bg-success/10 text-success hover:bg-success hover:text-white rounded transition"
                        title="Mark Delivered"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    )}
                    {d.status !== 'Delivered' && (
                      <button 
                        onClick={() => { setSelectedDispatch(d); setShowIncidentModal(true); }}
                        className="p-1.5 bg-warning/10 text-warning hover:bg-warning hover:text-white rounded transition"
                        title="Report Incident"
                      >
                        <AlertCircle size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card bg-card w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h2 className="text-xl font-bold text-white mb-4">Create Dispatch</h2>
            <form onSubmit={handleAddDispatch} className="space-y-4">
              <input required className="input" placeholder="Dispatch Title" onChange={e => setNewDispatch({...newDispatch, title: e.target.value})} />
              <div className="flex items-center gap-3">
                <input required className="input" placeholder="Source Location" onChange={e => setNewDispatch({...newDispatch, source: e.target.value})} />
                <Navigation size={20} className="text-muted shrink-0" />
                <input required className="input" placeholder="Destination" onChange={e => setNewDispatch({...newDispatch, destination: e.target.value})} />
              </div>
              <input required type="date" className="input" onChange={e => setNewDispatch({...newDispatch, expectedDelivery: e.target.value})} />
              <select className="input" required onChange={e => setNewDispatch({...newDispatch, assignedVehicle: e.target.value})}>
                <option value="">Select Available Vehicle</option>
                {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleId} ({v.driver})</option>)}
              </select>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1">Create Route</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {showIncidentModal && (
        <div className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card bg-card w-full max-w-md border-danger/30 border shadow-[0_20px_50px_rgba(244,63,94,0.15)]">
            <h2 className="text-xl font-bold text-danger mb-2 flex items-center gap-2"><AlertCircle /> Report Incident</h2>
            <p className="text-xs text-muted mb-4">The intelligent engine will automatically categorize this incident and assess risk levels.</p>
            <form onSubmit={handleReportIncident} className="space-y-4">
              <textarea 
                required className="input min-h-[100px]" 
                placeholder="E.g. Engine overheating during route near warehouse sector 4..."
                value={incidentText} onChange={e => setIncidentText(e.target.value)}
              />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowIncidentModal(false)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn bg-danger text-white hover:bg-red-600 flex-1">Submit Intelligence</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dispatch;
