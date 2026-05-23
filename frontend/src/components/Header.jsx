import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Bell, Search, LogOut } from 'lucide-react';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
      <div className="flex items-center flex-1">
        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search shipments, orders, assets..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 placeholder-muted transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-muted hover:text-slate-900 transition-all duration-300 bg-slate-50 rounded-full border border-slate-200 hover:shadow-sm">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200"></div>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors">{user?.name || 'Operator'}</span>
            <span className="text-xs text-muted capitalize tracking-wide">{user?.role || 'Staff'}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-primary font-bold transition-all duration-300">
            {user?.name?.charAt(0) || 'O'}
          </div>
        </div>
        
        <button onClick={logout} className="p-2 text-muted hover:text-danger hover:bg-danger/5 rounded-full transition-all duration-300 ml-2" title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
