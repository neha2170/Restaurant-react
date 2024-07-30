import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem('authToken') || null);

  const login = async (username, password) => {
    try {
      const resp  = await axios.post('https://test-api.achilyon.in/v1/rest-auth/login', { username, password });
      localStorage.setItem('authToken',resp.data.data.access_token);
      setAuth(resp.data.data.access_token);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
