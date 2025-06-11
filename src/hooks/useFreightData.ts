
import { useState, useEffect } from 'react';
import { DashboardStats, Load, Driver } from '@/types/freight';

// Mock data generator
const generateMockStats = (): DashboardStats => ({
  totalLoads: 1247,
  activeLoads: 89,
  completedLoads: 1158,
  availableDrivers: 23,
  totalRevenue: 2567890,
  monthlyGrowth: 15.2,
});

const generateMockLoads = (): Load[] => [
  {
    id: '1',
    reference: 'MSR-2024-001',
    status: 'in_transit',
    pickup: {
      address: 'Los Angeles, CA',
      date: '2024-06-11',
      time: '08:00',
      contact: 'John Smith',
      phone: '(555) 123-4567',
    },
    delivery: {
      address: 'Phoenix, AZ',
      date: '2024-06-12',
      time: '14:00',
      contact: 'Sarah Johnson',
      phone: '(555) 987-6543',
    },
    cargo: {
      description: 'Electronics Equipment',
      weight: 15000,
      value: 250000,
    },
    carrier: {
      name: 'ABC Logistics',
      contact: 'Mike Wilson',
      phone: '(555) 456-7890',
    },
    rate: 2400,
    distance: 372,
    estimatedDuration: '6h 30m',
    createdAt: '2024-06-11T07:00:00Z',
    updatedAt: '2024-06-11T09:30:00Z',
    assignedDriver: {
      id: '1',
      name: 'Robert Garcia',
      licenseNumber: 'CDL-123456',
      phoneNumber: '(555) 234-5678',
      email: 'robert.garcia@email.com',
      status: 'busy',
      location: {
        lat: 34.0522,
        lng: -118.2437,
        address: 'Los Angeles, CA',
        lastUpdated: '2024-06-11T09:30:00Z',
      },
      vehicleInfo: {
        truckNumber: 'T-001',
        trailerNumber: 'TR-001',
        capacity: 20000,
      },
      rating: 4.8,
      completedJobs: 156,
    },
  },
  {
    id: '2',
    reference: 'MSR-2024-002',
    status: 'pending',
    pickup: {
      address: 'Houston, TX',
      date: '2024-06-12',
      time: '10:00',
      contact: 'David Brown',
      phone: '(555) 345-6789',
    },
    delivery: {
      address: 'Miami, FL',
      date: '2024-06-14',
      time: '16:00',
      contact: 'Lisa Davis',
      phone: '(555) 876-5432',
    },
    cargo: {
      description: 'Medical Supplies',
      weight: 8500,
      value: 180000,
      specialInstructions: 'Temperature controlled transport required',
    },
    carrier: {
      name: 'XYZ Transport',
      contact: 'Tom Anderson',
      phone: '(555) 567-8901',
    },
    rate: 3200,
    distance: 1190,
    estimatedDuration: '18h 45m',
    createdAt: '2024-06-11T10:15:00Z',
    updatedAt: '2024-06-11T10:15:00Z',
  },
  {
    id: '3',
    reference: 'MSR-2024-003',
    status: 'assigned',
    pickup: {
      address: 'Chicago, IL',
      date: '2024-06-13',
      time: '06:00',
      contact: 'Jennifer Wilson',
      phone: '(555) 456-7890',
    },
    delivery: {
      address: 'Denver, CO',
      date: '2024-06-14',
      time: '12:00',
      contact: 'Mark Thompson',
      phone: '(555) 789-0123',
    },
    cargo: {
      description: 'Automotive Parts',
      weight: 12000,
      value: 95000,
    },
    carrier: {
      name: 'FastTrack Logistics',
      contact: 'Emily Rodriguez',
      phone: '(555) 678-9012',
    },
    rate: 2800,
    distance: 920,
    estimatedDuration: '14h 20m',
    createdAt: '2024-06-11T11:30:00Z',
    updatedAt: '2024-06-11T14:20:00Z',
    assignedDriver: {
      id: '2',
      name: 'Maria Gonzalez',
      licenseNumber: 'CDL-234567',
      phoneNumber: '(555) 345-6789',
      email: 'maria.gonzalez@email.com',
      status: 'available',
      location: {
        lat: 41.8781,
        lng: -87.6298,
        address: 'Chicago, IL',
        lastUpdated: '2024-06-11T14:20:00Z',
      },
      vehicleInfo: {
        truckNumber: 'T-002',
        trailerNumber: 'TR-002',
        capacity: 18000,
      },
      rating: 4.9,
      completedJobs: 203,
    },
  },
];

export const useFreightData = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loads, setLoads] = useState<Load[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats(generateMockStats());
      setLoads(generateMockLoads());
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return {
    stats,
    loads,
    isLoading,
  };
};
