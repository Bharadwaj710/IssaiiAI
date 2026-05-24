import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, ArrowLeft, Quote } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      
      {/* LEFT SIDE - Brand & Testimonial/Info */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900 text-white flex-col justify-between p-12">
        <div className="absolute inset-0 z-0">
          <img src="/auth-bg.png" alt="Background" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B00]/20 via-gray-900/60 to-gray-900" />
        </div>
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg">
                <Truck size={20} className="text-[#FF6B00]" />
              </div>
              <span className="text-2xl font-black tracking-tight">OpsPulse</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-black leading-tight mb-4">
              Welcome back to<br/>your command center.
            </h1>
            <p className="text-gray-400 text-lg max-w-md">
              Sign in to manage active shipments, review analytical insights, and maintain operational superiority.
            </p>
          </div>
        </div>

        <div className="relative z-10 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden"
          >
            <Quote size={80} className="absolute -top-4 -left-4 text-white/5" />
            <p className="text-xl font-medium leading-relaxed text-gray-200 mb-6 relative z-10">
              "Since implementing OpsPulse, our dispatch efficiency increased by 40%, and we eliminated critical bottlenecks in our supply chain entirely."
            </p>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center font-bold text-[#FF6B00]">MS</div>
              <div>
                <p className="font-bold text-white text-sm">Marcus Sterling</p>
                <p className="text-gray-400 text-xs">Director of Logistics, NextGen Mfg</p>
              </div>
            </div>
          </motion.div>
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
            <h2 className="text-3xl font-black text-gray-900 mb-2">Operator Login</h2>
            <p className="text-gray-500">Enter your credentials to access the dashboard.</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
              <input type="email" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all outline-none text-gray-900" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="operator@opspulse.com" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-bold text-gray-700">Password</label>
                <a href="#" className="text-xs font-semibold text-[#FF6B00] hover:text-orange-700">Forgot password?</a>
              </div>
              <input type="password" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all outline-none text-gray-900" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full py-4 mt-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-200 transition-all hover:-translate-y-px text-lg">
              Authenticate
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm font-medium text-gray-500">
            Don't have an account yet? <Link to="/register" className="text-[#FF6B00] hover:text-orange-700 transition-colors">Request access</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
