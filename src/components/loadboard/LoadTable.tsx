
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, Calendar, Truck } from 'lucide-react';
import { format } from 'date-fns';

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

interface LoadTableProps {
  loads: LoadData[];
  onLoadClick: (load: LoadData) => void;
  isLoading: boolean;
}

export function LoadTable({ loads, onLoadClick, isLoading }: LoadTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 animate-pulse rounded" />
        ))}
      </div>
    );
  }

  if (loads.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Truck className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No loads found matching your criteria</p>
        <p className="text-sm">Try adjusting your filters or refresh from DOFT</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Origin → Destination</TableHead>
            <TableHead>Equipment</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Pickup Date</TableHead>
            <TableHead>Broker</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loads.map((load) => (
            <TableRow 
              key={load.id} 
              className="cursor-pointer hover:bg-vintage-cream/50"
              onClick={() => onLoadClick(load)}
            >
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-vintage-brown" />
                    <span className="font-medium">
                      {load.origin_city}, {load.origin_state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>→</span>
                    <span>
                      {load.destination_city}, {load.destination_state}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="bg-vintage-gold/20 text-vintage-brown">
                  {load.equipment_type}
                </Badge>
              </TableCell>
              <TableCell>
                {load.rate ? (
                  <span className="font-semibold text-vintage-brown">
                    ${load.rate.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-gray-400">TBD</span>
                )}
              </TableCell>
              <TableCell>
                {load.distance ? `${load.distance} mi` : 'N/A'}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-vintage-brown" />
                  {format(new Date(load.pickup_date), 'MMM dd, yyyy')}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {load.broker_name && (
                    <div className="font-medium text-sm">{load.broker_name}</div>
                  )}
                  <div className="flex gap-2">
                    {load.broker_phone && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="p-1 h-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`tel:${load.broker_phone}`, '_self');
                        }}
                      >
                        <Phone className="w-3 h-3" />
                      </Button>
                    )}
                    {load.broker_email && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="p-1 h-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`mailto:${load.broker_email}`, '_self');
                        }}
                      >
                        <Mail className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="default"
                  className="bg-vintage-brown hover:bg-vintage-brown/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLoadClick(load);
                  }}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
