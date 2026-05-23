import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Truck, ClipboardList, BarChart3, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const links = [
    { name: 'Overview', path: '/', icon: LayoutDashboard },
    { name: 'Fleet', path: '/fleet', icon: Truck },
    { name: 'Dispatch', path: '/dispatch', icon: ClipboardList },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col z-20">
      <div className="h-20 flex items-center px-6 border-b border-slate-200">
        <div className="flex items-center gap-3 text-2xl font-bold text-slate-900 tracking-tight">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Truck size={20} className="text-white" />
          </div>
          OpsPulse
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-8 px-4 flex flex-col gap-2">
        <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 px-3">Main Menu</div>
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${
                isActive 
                  ? 'text-primary bg-indigo-50 font-semibold' 
                  : 'text-muted hover:text-slate-900 hover:bg-slate-50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-r-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <link.icon size={20} className={isActive ? 'text-primary' : 'group-hover:text-primary transition-colors'} />
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
