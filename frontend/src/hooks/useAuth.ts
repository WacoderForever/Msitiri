import { useState, useEffect, useCallback } from 'react';
import { getUser, isAuthenticated, authAPI, User } from '@/services/api';
import { toast } from 'sonner';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(getUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = async () => {
      const authenticated = isAuthenticated();
      
      if (authenticated && user) {
        // Try to get fresh user data
        try {
          const freshUser = await authAPI.getProfile();
          setUser(freshUser);
          localStorage.setItem('user', JSON.stringify(freshUser));
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await authAPI.login({ email, password });
      setUser(data.user);
      toast.success('Login successful!', {
        description: `Welcome back, ${data.user.first_name}!`,
      });
      return data;
    } catch (error: any) {
      toast.error('Login failed', {
        description: error.response?.data?.detail || 'Invalid credentials',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: any) => {
    setIsLoading(true);
    try {
      const data = await authAPI.register(userData);
      setUser(data.user);
      toast.success('Registration successful!', {
        description: `Welcome to Msitiri, ${data.user.first_name}!`,
      });
      return data;
    } catch (error: any) {
      toast.error('Registration failed', {
        description: error.response?.data?.detail || 'Please check your information',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authAPI.logout();
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user && isAuthenticated(),
    login,
    register,
    logout,
  };
};