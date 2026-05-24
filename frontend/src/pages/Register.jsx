import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContextValue';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, Activity, Shield, ArrowLeft } from 'lucide-react';
import api from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('operator');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password, role });
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const benefits = [
    { icon: Activity, title: 'Real-time Visibility', desc: 'Track entire fleets and operational KPIs instantly.' },
    { icon: Shield, title: 'Enterprise Security', desc: 'Role-based access controls for secure data handling.' },
    { icon: Truck, title: 'Smart Dispatching', desc: 'Automate routes and increase on-time delivery rates.' }
  ];

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      
      {/* LEFT SIDE - Info & Benefits */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900 text-white flex-col justify-between p-12">
        <div className="absolute inset-0 z-0">
          <img src="/auth-bg.png" alt="Background" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        </div>
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00] flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Truck size={20} className="text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight">OpsPulse</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-black leading-tight mb-4">
              Join the future of<br/><span className="text-[#FF6B00]">logistics control.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md">
              Create an account to centralize your operations, optimize dispatching, and scale your manufacturing logistics.
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-12 space-y-4 max-w-md">
          {benefits.map((b, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <b.icon size={18} className="text-[#FF6B00]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm mb-1">{b.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white relative">
        <Link to="/" className="lg:hidden absolute top-8 left-8 text-gray-500 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-500">Sign up to get started as an operator.</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all outline-none text-gray-900" value={name} onChange={(e) => setName(e.target.value)} required placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all outline-none text-gray-900" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="operator@opspulse.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Role</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all outline-none text-gray-900 bg-white" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="operator">Operator</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
                <input type="password" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all outline-none text-gray-900" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
              </div>
            </div>
            <button type="submit" className="w-full py-3.5 mt-4 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-200 transition-all hover:-translate-y-px">
              Request Access
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm font-medium text-gray-500">
            Already have an account? <Link to="/login" className="text-[#FF6B00] hover:text-orange-700 transition-colors">Sign in here</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
