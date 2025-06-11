
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@msrfreight.com',
    password: 'admin123',
    name: 'MSR Admin',
    role: 'admin',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'dispatcher@msrfreight.com',
    password: 'dispatch123',
    name: 'John Dispatcher',
    role: 'dispatcher',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'carrier@msrfreight.com',
    password: 'carrier123',
    name: 'ABC Logistics',
    role: 'carrier',
    companyName: 'ABC Logistics Inc.',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    email: 'driver@msrfreight.com',
    password: 'driver123',
    name: 'Mike Driver',
    role: 'driver',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('msrFreightUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('msrFreightUser', JSON.stringify(userWithoutPassword));
    
    setAuthState({
      user: userWithoutPassword,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('msrFreightUser');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email!,
      name: userData.name!,
      role: userData.role || 'carrier',
      status: 'active',
      createdAt: new Date().toISOString(),
      ...userData,
    };

    localStorage.setItem('msrFreightUser', JSON.stringify(newUser));
    
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
