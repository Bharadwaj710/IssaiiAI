import { useState } from 'react';
import api from '../services/api';
import { AuthContext } from './authContextValue';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  });

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('user', JSON.stringify(res.data));
    setUser(res.data);
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('user', JSON.stringify(res.data));
    setUser(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
};
