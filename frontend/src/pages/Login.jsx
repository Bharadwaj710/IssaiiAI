import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';

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
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4 border border-indigo-100">
            <Truck size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">OpsPulse</h1>
          <p className="text-muted">Intelligent Manufacturing Operations</p>
        </div>

        <div className="card bg-white shadow-2xl relative z-10 border-borderline">
          <h2 className="text-xl font-bold mb-6 text-slate-900">Operator Login</h2>
          
          {error && (
            <div className="bg-danger/10 border border-danger/20 text-danger p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <input 
                type="email" 
                className="input bg-slate-50 border-borderline text-slate-900" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="operator@opspulse.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input 
                type="password" 
                className="input bg-slate-50 border-borderline text-slate-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full mt-2">
              Authenticate
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted">
            New operator? <Link to="/register" className="text-primary hover:text-indigo-600 hover:underline transition-colors">Request access</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
