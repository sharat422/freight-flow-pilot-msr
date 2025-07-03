
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, RefreshCw, Phone, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { LoadModal } from './LoadModal';
import { LoadFilters } from './LoadFilters';
import { LoadTable } from './LoadTable';

interface LoadData {
  id: string;
  doft_load_id: string;
  origin_city: string;
  origin_state: string;
  destination_city: string;
  destination_state: string;
  equipment_type: string;
  rate: number | null;
  distance: number | null;
  pickup_date: string;
  broker_name: string | null;
  broker_phone: string | null;
  broker_email: string | null;
  load_details: any;
  created_at: string;
  updated_at: string;
}

export function LoadBoard() {
  const [filters, setFilters] = useState({
    equipmentType: '',
    pickupCity: '',
    pickupState: '',
    dropoffCity: '',
    dropoffState: '',
    pickupDate: null as Date | null,
  });
  
  const [selectedLoad, setSelectedLoad] = useState<LoadData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch loads from our database (cached from DOFT)
  const { data: loads = [], isLoading, error, refetch } = useQuery({
    queryKey: ['loads', filters],
    queryFn: async () => {
      let query = supabase
        .from('freight_loads')
        .select('*')
        .order('updated_at', { ascending: false });

      if (filters.equipmentType) {
        query = query.eq('equipment_type', filters.equipmentType);
      }
      if (filters.pickupCity) {
        query = query.ilike('origin_city', `%${filters.pickupCity}%`);
      }
      if (filters.pickupState) {
        query = query.eq('origin_state', filters.pickupState);
      }
      if (filters.dropoffCity) {
        query = query.ilike('destination_city', `%${filters.dropoffCity}%`);
      }
      if (filters.dropoffState) {
        query = query.eq('destination_state', filters.dropoffState);
      }
      if (filters.pickupDate) {
        query = query.eq('pickup_date', format(filters.pickupDate, 'yyyy-MM-dd'));
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as LoadData[];
    },
    refetchInterval: 60000, // Auto-refresh every 60 seconds
  });

  // Function to fetch fresh data from DOFT API
  const fetchFromDOFT = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.equipmentType) queryParams.append('equipmentType', filters.equipmentType);
      if (filters.pickupCity) queryParams.append('pickupCity', filters.pickupCity);
      if (filters.pickupState) queryParams.append('pickupState', filters.pickupState);
      if (filters.dropoffCity) queryParams.append('dropoffCity', filters.dropoffCity);
      if (filters.dropoffState) queryParams.append('dropoffState', filters.dropoffState);
      if (filters.pickupDate) queryParams.append('pickupDate', format(filters.pickupDate, 'yyyy-MM-dd'));

      const response = await supabase.functions.invoke('fetch-doft-loads', {
        method: 'GET',
      });

      if (response.error) {
        console.error('Error fetching from DOFT:', response.error);
      } else {
        // Refetch our local data after updating from DOFT
        refetch();
      }
    } catch (error) {
      console.error('Error calling DOFT function:', error);
    }
  };

  const handleLoadClick = (load: LoadData) => {
    setSelectedLoad(load);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-vintage-brown">Load Board</h1>
        <Button 
          onClick={fetchFromDOFT}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh from DOFT
        </Button>
      </div>

      <LoadFilters filters={filters} setFilters={setFilters} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Available Loads ({loads.length})
            {isLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-red-600 mb-4">
              Error loading loads: {error.message}
            </div>
          )}
          
          <LoadTable 
            loads={loads} 
            onLoadClick={handleLoadClick}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      <LoadModal 
        load={selectedLoad}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
