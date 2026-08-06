import React, { createContext, useContext, useState } from 'react';
import api from '../api/axios.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('9ex_admin_info');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    const { token, ...info } = data;
    localStorage.setItem('9ex_admin_token', token);
    localStorage.setItem('9ex_admin_info', JSON.stringify(info));
    setAdmin(info);
    return info;
  };

  const logout = () => {
    localStorage.removeItem('9ex_admin_token');
    localStorage.removeItem('9ex_admin_info');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
