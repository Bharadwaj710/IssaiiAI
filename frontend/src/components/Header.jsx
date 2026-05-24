import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Bell, Search, LogOut } from 'lucide-react';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="h-20 bg-card border-b border-borderline flex items-center justify-between px-8 sticky top-0 z-10 backdrop-blur-md bg-opacity-90">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Command Center</h2>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search shipments, vehicles..." 
            className="pl-10 pr-4 py-2.5 bg-[#0B0F19] border border-borderline rounded-full text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all focus:w-80 text-white placeholder-muted"
          />
        </div>
        
        <button className="relative p-2.5 text-muted hover:text-white hover:bg-white/5 rounded-full transition-colors border border-transparent hover:border-borderline">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(255,107,0,0.8)]"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-borderline">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-white">{user?.name || 'Operator'}</p>
            <p className="text-xs text-primary font-medium uppercase tracking-wider">{user?.role || 'Dispatcher'}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20 border border-white/10">
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
