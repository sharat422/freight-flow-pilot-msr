
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EQUIPMENT_TYPES = [
  'Box Truck',
  'Dry Van',
  'Reefer',
  'Flatbed',
  'Step Deck',
  'Lowboy',
  'Tanker',
  'Car Carrier',
  'Conestoga',
  'Power Only',
];

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

interface LoadFiltersProps {
  filters: {
    equipmentType: string;
    pickupCity: string;
    pickupState: string;
    dropoffCity: string;
    dropoffState: string;
    pickupDate: Date | null;
  };
  setFilters: (filters: any) => void;
}

export function LoadFilters({ filters, setFilters }: LoadFiltersProps) {
  const clearFilters = () => {
    setFilters({
      equipmentType: '',
      pickupCity: '',
      pickupState: '',
      dropoffCity: '',
      dropoffState: '',
      pickupDate: null,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Search Filters</CardTitle>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Equipment Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Equipment Type</label>
            <Select
              value={filters.equipmentType}
              onValueChange={(value) => setFilters({ ...filters, equipmentType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select equipment" />
              </SelectTrigger>
              <SelectContent>
                {EQUIPMENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pickup City */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Pickup City</label>
            <Input
              placeholder="Enter city"
              value={filters.pickupCity}
              onChange={(e) => setFilters({ ...filters, pickupCity: e.target.value })}
            />
          </div>

          {/* Pickup State */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Pickup State</label>
            <Select
              value={filters.pickupState}
              onValueChange={(value) => setFilters({ ...filters, pickupState: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {US_STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Drop-off City */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Drop-off City</label>
            <Input
              placeholder="Enter city"
              value={filters.dropoffCity}
              onChange={(e) => setFilters({ ...filters, dropoffCity: e.target.value })}
            />
          </div>

          {/* Drop-off State */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Drop-off State</label>
            <Select
              value={filters.dropoffState}
              onValueChange={(value) => setFilters({ ...filters, dropoffState: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {US_STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pickup Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Pickup Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.pickupDate ? format(filters.pickupDate, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.pickupDate || undefined}
                  onSelect={(date) => setFilters({ ...filters, pickupDate: date || null })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
