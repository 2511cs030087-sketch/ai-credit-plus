import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { mockUser, mockAdmin } from '../data/mockData';
import { apiService } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ai_credit_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });
  const [isDemoMode, setIsDemoMode] = useState(() => {
    return localStorage.getItem('ai_credit_demo') === 'true';
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('ai_credit_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ai_credit_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ai_credit_demo', isDemoMode ? 'true' : 'false');
  }, [isDemoMode]);

  const login = useCallback(async (email, password, role = 'customer') => {
    setIsLoading(true);
    try {
      const res = await apiService.login(email, password);
      let userData = { ...mockUser, email, role };
      if (role === 'admin') {
        userData = { ...mockAdmin, role: 'admin' };
      }
      setUser(userData);
      setIsLoading(false);
      return true;
    } catch (err) {
      setIsLoading(false);
      return false;
    }
  }, []);

  const register = useCallback(async (formData) => {
    setIsLoading(true);
    try {
      await apiService.register(formData);
      const newUser = {
        ...mockUser,
        name: formData.fullName || 'User',
        email: formData.email,
        phone: formData.phone || mockUser.phone,
        occupation: formData.userType || 'Individual',
        role: 'customer'
      };
      setUser(newUser);
      setIsLoading(false);
      return true;
    } catch (err) {
      setIsLoading(false);
      return false;
    }
  }, []);

  const googleLogin = useCallback(async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setUser({ ...mockUser, role: 'customer' });
    setIsLoading(false);
    return true;
  }, []);

  const toggleDemoMode = useCallback(() => {
    setIsDemoMode(prev => {
      const next = !prev;
      if (next && !user) {
        setUser({ ...mockUser, isDemo: true });
      }
      return next;
    });
  }, [user]);

  const enableDemoUser = useCallback(() => {
    setIsDemoMode(true);
    setUser({ ...mockUser, isDemo: true });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsDemoMode(false);
    localStorage.removeItem('ai_credit_user');
    localStorage.removeItem('ai_credit_demo');
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user || isDemoMode,
      isDemoMode,
      login,
      register,
      googleLogin,
      toggleDemoMode,
      enableDemoUser,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
