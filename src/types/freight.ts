
export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  phoneNumber: string;
  email: string;
  status: 'available' | 'busy' | 'offline';
  location: {
    lat: number;
    lng: number;
    address: string;
    lastUpdated: string;
  };
  vehicleInfo: {
    truckNumber: string;
    trailerNumber: string;
    capacity: number;
  };
  rating: number;
  completedJobs: number;
  avatar?: string;
}

export interface Load {
  id: string;
  reference: string;
  status: 'pending' | 'assigned' | 'in_transit' | 'delivered' | 'cancelled';
  pickup: {
    address: string;
    date: string;
    time: string;
    contact: string;
    phone: string;
  };
  delivery: {
    address: string;
    date: string;
    time: string;
    contact: string;
    phone: string;
  };
  cargo: {
    description: string;
    weight: number;
    value: number;
    specialInstructions?: string;
  };
  assignedDriver?: Driver;
  carrier: {
    name: string;
    contact: string;
    phone: string;
  };
  rate: number;
  distance: number;
  estimatedDuration: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalLoads: number;
  activeLoads: number;
  completedLoads: number;
  availableDrivers: number;
  totalRevenue: number;
  monthlyGrowth: number;
}
