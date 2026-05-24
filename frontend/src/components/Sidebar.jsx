import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Truck, ClipboardList, BarChart3, Settings, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const links = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Fleet', path: '/dashboard/fleet', icon: Truck },
    { name: 'Dispatch', path: '/dashboard/dispatch', icon: ClipboardList },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={onClose}></div>}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-card border-r border-borderline flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-borderline">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Truck size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">OpsPulse</span>
          </div>
          <button className="md:hidden text-muted hover:text-white" onClick={onClose} aria-label="Close navigation">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-bold text-muted mb-4 ml-4 tracking-wider">OPERATIONS</div>
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={onClose}
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

        <div className="p-4 border-t border-borderline">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-muted hover:text-white hover:bg-white/5 transition-all duration-300 group">
            <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            <span className="font-medium tracking-wide">Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
