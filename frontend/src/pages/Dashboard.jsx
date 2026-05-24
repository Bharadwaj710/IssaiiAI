import { useState, useEffect } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { 
  Truck, AlertTriangle, CheckCircle2, Clock, 
  TrendingUp, Activity, Package
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="card card-hover relative overflow-hidden group"
  >
    <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full bg-${color}/20 blur-3xl group-hover:bg-${color}/30 transition-all duration-500`}></div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`p-2 rounded-lg bg-${color}/10 text-${color}`}>
        <Icon size={20} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-medium text-success`}>
        <TrendingUp size={12} />
        <span>Stable</span>
      </div>
    </div>
    <div className="relative z-10">
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-sm font-medium text-muted">{title}</p>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiveMode, setIsLiveMode] = useState(false);

  const fetchDashboard = async () => {
    try {
      const res = await api.get('/dashboard');
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    let interval;
    if (isLiveMode) {
      interval = setInterval(fetchDashboard, 5000);
    }
    return () => clearInterval(interval);
  }, [isLiveMode]);

  if (loading) {
    return <div className="animate-pulse space-y-6">
      <div className="h-8 bg-borderline rounded w-1/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-borderline rounded-xl"></div>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-80 bg-borderline rounded-xl"></div>
        <div className="h-80 bg-borderline rounded-xl"></div>
      </div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Operational Overview</h1>
          <p className="text-sm text-muted">Real-time logistics and dispatch monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm font-medium text-muted">Live Mode</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={isLiveMode} onChange={(e) => setIsLiveMode(e.target.checked)} />
              <div className={`block w-10 h-6 rounded-full transition-colors ${isLiveMode ? 'bg-primary' : 'bg-slate-700'}`}></div>
              <div className={`absolute left-1 top-1 bg-card w-4 h-4 rounded-full transition-transform ${isLiveMode ? 'translate-x-4' : ''}`}></div>
            </div>
          </label>
          <div className="flex items-center gap-2 text-sm text-muted bg-card px-3 py-1.5 rounded-md border border-borderline font-medium shadow-sm">
            <div className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-success animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-slate-400'}`}></div>
            System Status: {isLiveMode ? 'Live' : 'Optimal'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Dispatches" value={data?.metrics?.activeDispatches || 0} icon={Package} color="primary" delay={0.1} />
        <StatCard title="Fleet Utilization" value={`${data?.metrics?.fleetUtilization || 0}%`} icon={Truck} color="accent" delay={0.2} />
        <StatCard title="Delayed Deliveries" value={data?.metrics?.delayedDeliveries || 0} icon={Clock} color="warning" delay={0.3} />
        <StatCard title="Critical Incidents" value={data?.metrics?.criticalIncidents || 0} icon={AlertTriangle} color="danger" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Main Chart Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="lg:col-span-2 card"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Delivery Trends (Last 7 Days)</h2>
            <select className="bg-[#0B0F19] border border-borderline text-sm rounded-xl px-3 py-1.5 outline-none focus:border-primary/50 text-white">
              <option>Completed</option>
              <option>Delayed</option>
            </select>
          </div>
          <div className="h-[300px] w-full" style={{ minWidth: 0, minHeight: 0 }}>
            {data?.analytics?.deliveryTrends?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={data.analytics.deliveryTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#FF6B00" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="_id" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', borderColor: '#1f2937', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
                    itemStyle={{ color: '#ffffff' }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#FF6B00" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted">No trend data available</div>
            )}
          </div>
        </motion.div>

        {/* Activity Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="card flex flex-col"
        >
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Activity size={18} className="text-accent" />
            Live Activity Feed
          </h2>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 relative">
            {data?.recentActivities?.length > 0 ? data.recentActivities.map((activity, idx) => (
              <div key={idx} className="flex gap-4 relative group">
                {idx !== data.recentActivities.length - 1 && (
                  <div className="absolute left-[11px] top-7 bottom-[-16px] w-px bg-borderline group-hover:bg-primary/30 transition-colors"></div>
                )}
                <div className="w-6 h-6 rounded-full bg-card border-2 border-borderline flex-shrink-0 mt-0.5 flex items-center justify-center z-10 shadow-sm group-hover:border-primary/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${activity.action.includes('Critical') ? 'bg-danger shadow-[0_0_8px_rgba(244,63,94,0.8)]' : 'bg-primary shadow-[0_0_8px_rgba(139,92,246,0.8)]'}`}></div>
                </div>
                <div>
                  <p className="text-sm text-white mb-0.5">{activity.action}</p>
                  <div className="flex gap-2 text-xs text-muted">
                    <span>{new Date(activity.timestamp).toLocaleString()}</span>
                    <span>Ã¢â‚¬Â¢</span>
                    <span>{activity.performedBy?.name || 'System'}</span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-sm text-muted text-center py-4">No recent activities</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
