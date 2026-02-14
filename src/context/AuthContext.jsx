import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('festfiti_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('festfiti_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, name = null) => {
    // Determine role based on email
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'user';
    
    const userData = {
      email,
      name: name || email.split('@')[0], // Use email prefix as name if not provided
      role,
      loginTime: new Date().toISOString()
    };

    setUser(userData);
    localStorage.setItem('festfiti_user', JSON.stringify(userData));
    
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('festfiti_user');
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isUser = () => {
    return user?.role === 'user';
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    isUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
