import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Truck, ClipboardList, BarChart3, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const links = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Fleet', path: '/dashboard/fleet', icon: Truck },
    { name: 'Dispatch', path: '/dashboard/dispatch', icon: ClipboardList },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-card border-r border-borderline flex flex-col transition-all duration-300">
      <div className="h-20 flex items-center px-6 border-b border-borderline">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Truck size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">OpsPulse</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-xs font-bold text-muted mb-4 ml-4 tracking-wider">OPERATIONS</div>
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-primary/15 text-primary font-semibold shadow-inner' 
                  : 'text-muted hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon size={20} className={isActive ? 'text-primary' : 'text-muted'} />
                <span className="tracking-wide">{link.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
      
      <div className="p-4 border-t border-slate-200">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-muted hover:text-slate-900 hover:bg-slate-50 transition-all duration-300 group">
          <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
          <span className="font-medium tracking-wide">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
