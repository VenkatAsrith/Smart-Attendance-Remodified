import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { authService } from '../services/api';

interface AuthContextType {
  user: User | null;
  role: Role;
  isAuthenticated: boolean;
  login: (identifier: string, pass: string, targetRole: Role) => Promise<boolean>;
  logout: () => void;
  setRole: (role: Role) => void;
  updateUserProfile: (updatedFields: Partial<any>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('aura_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [role, setRoleState] = useState<Role>(() => {
    return user?.role || 'FACULTY';
  });

  const isAuthenticated = !!user;

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
  };

  const login = async (identifier: string, pass: string, targetRole: Role): Promise<boolean> => {
    try {
      const res = await authService.login(identifier, pass, targetRole);
      if (res.success && res.user) {
        setUser(res.user);
        setRoleState(res.user.role);
        localStorage.setItem('aura_user', JSON.stringify(res.user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login Context Error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aura_token');
    localStorage.removeItem('aura_user');
  };

  const updateUserProfile = (updatedFields: Partial<any>) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        ...updatedFields
      }
    };
    setUser(updatedUser as User);
    localStorage.setItem('aura_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, login, logout, setRole, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
