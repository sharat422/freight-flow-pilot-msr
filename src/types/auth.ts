
export type UserRole = 'admin' | 'dispatcher' | 'carrier' | 'driver';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phoneNumber?: string;
  address?: string;
  companyName?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
