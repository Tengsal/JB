import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'http://localhost:5000'; // Set your backend URL here

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'employer' | 'jobseeker';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'employer' | 'jobseeker') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;

      try {
        setIsLoading(true);
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Auth verification error:', error);
        localStorage.removeItem('token');
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);

      toast.success('Login successful!');

      if (user.role === 'employer') {
        navigate('/dashboard/employer');
      } else {
        navigate('/dashboard/jobseeker');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: 'employer' | 'jobseeker') => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/auth/register', { name, email, password, role });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);

      toast.success('Registration successful!');

      if (user.role === 'employer') {
        navigate('/dashboard/employer');
      } else {
        navigate('/dashboard/jobseeker');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
