import { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Download } from 'lucide-react';

const COLORS = ['#FF6B00', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

const Analytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/dashboard');
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDashboard();
  }, []);

  if (!data) return <div>Loading Analytics...</div>;

  const incidentData = data.analytics?.incidentDistribution || [];
  const trendData = data.analytics?.deliveryTrends || [];

  const handleExportCSV = async () => {
    try {
      const res = await api.get('/dispatches');
      const dispatches = res.data;
      if (!dispatches || dispatches.length === 0) return alert('No data to export');
      
      const headers = ['Route/Title', 'Source', 'Destination', 'Status', 'Risk Level', 'Category'];
      const csvData = dispatches.map(d => [
        d.title, d.source, d.destination, d.status, d.riskLevel || 'Low', d.semanticCategory || 'None'
      ].join(','));
      
      const csvContent = [headers.join(','), ...csvData].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `OpsPulse_Dispatch_Report_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Operational Analytics</h1>
          <p className="text-sm text-muted">Deep dive into logistics performance and incident metrics</p>
        </div>
        <button onClick={handleExportCSV} className="btn btn-outline gap-2 text-sm bg-card border-borderline hover:bg-[#0B0F19]">
          <Download size={16} /> Export Report (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-6">Delivery Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="_id" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <RechartsTooltip cursor={{ fill: '#1f2937', opacity: 0.4 }} contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '8px', color: '#ffffff' }} />
                <Bar dataKey="count" fill="#FF6B00" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-6">Semantic Incident Distribution</h2>
          <div className="h-80">
            {incidentData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incidentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="_id"
                  >
                    {incidentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '8px', color: '#ffffff' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: '#9ca3af' }}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted">No incidents recorded yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
