
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Phone, Mail, MapPin, Calendar, Truck, DollarSign, Route } from 'lucide-react';
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

interface LoadModalProps {
  load: LoadData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function LoadModal({ load, isOpen, onClose }: LoadModalProps) {
  if (!load) return null;

  const handleCallBroker = () => {
    if (load.broker_phone) {
      window.open(`tel:${load.broker_phone}`, '_self');
    }
  };

  const handleEmailBroker = () => {
    if (load.broker_email) {
      window.open(`mailto:${load.broker_email}?subject=Inquiry about Load ${load.doft_load_id}`, '_self');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-vintage-brown" />
            Load Details - {load.doft_load_id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Route Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-vintage-brown flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Pickup Location
              </h3>
              <div className="pl-6">
                <p className="font-medium">{load.origin_city}, {load.origin_state}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(load.pickup_date), 'MMMM dd, yyyy')}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-vintage-brown flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Delivery Location
              </h3>
              <div className="pl-6">
                <p className="font-medium">{load.destination_city}, {load.destination_state}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Load Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-vintage-brown flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Equipment
              </h4>
              <Badge variant="secondary" className="bg-vintage-gold/20 text-vintage-brown">
                {load.equipment_type}
              </Badge>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-vintage-brown flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Rate
              </h4>
              <p className="text-lg font-semibold">
                {load.rate ? `$${load.rate.toLocaleString()}` : 'Rate TBD'}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-vintage-brown flex items-center gap-2">
                <Route className="w-4 h-4" />
                Distance
              </h4>
              <p className="text-lg font-semibold">
                {load.distance ? `${load.distance} miles` : 'N/A'}
              </p>
            </div>
          </div>

          <Separator />

          {/* Broker Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-vintage-brown">Broker Contact</h3>
            
            {load.broker_name && (
              <p className="font-medium">{load.broker_name}</p>
            )}

            <div className="flex gap-3">
              {load.broker_phone && (
                <Button
                  onClick={handleCallBroker}
                  className="bg-vintage-brown hover:bg-vintage-brown/90 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Broker
                </Button>
              )}
              
              {load.broker_email && (
                <Button
                  onClick={handleEmailBroker}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email Broker
                </Button>
              )}
            </div>

            {load.broker_phone && (
              <p className="text-sm text-gray-600">Phone: {load.broker_phone}</p>
            )}
            {load.broker_email && (
              <p className="text-sm text-gray-600">Email: {load.broker_email}</p>
            )}
          </div>

          {/* Additional Details */}
          {load.load_details && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold text-vintage-brown">Additional Information</h3>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(load.load_details, null, 2)}
                  </pre>
                </div>
              </div>
            </>
          )}

          {/* Timestamps */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>Last updated: {format(new Date(load.updated_at), 'PPpp')}</p>
            <p>Load ID: {load.doft_load_id}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
