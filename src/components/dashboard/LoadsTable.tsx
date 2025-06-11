
import { Load } from '@/types/freight';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, MapPin } from 'lucide-react';

interface LoadsTableProps {
  loads: Load[];
  title: string;
}

export function LoadsTable({ loads, title }: LoadsTableProps) {
  const getStatusColor = (status: Load['status']) => {
    const colors = {
      pending: 'bg-warning text-black',
      assigned: 'bg-info text-white',
      in_transit: 'bg-primary text-white',
      delivered: 'bg-success text-white',
      cancelled: 'bg-destructive text-white',
    };
    return colors[status];
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loads.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No loads found</p>
          ) : (
            loads.map((load) => (
              <div key={load.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">#{load.reference}</h3>
                    <Badge className={getStatusColor(load.status)}>
                      {load.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      Track
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-success">Pickup</p>
                    <p className="text-muted-foreground">{load.pickup.address}</p>
                    <p className="text-muted-foreground">{load.pickup.date} at {load.pickup.time}</p>
                  </div>
                  <div>
                    <p className="font-medium text-destructive">Delivery</p>
                    <p className="text-muted-foreground">{load.delivery.address}</p>
                    <p className="text-muted-foreground">{load.delivery.date} at {load.delivery.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium">{load.cargo.description}</span>
                    <span className="text-muted-foreground ml-2">({load.cargo.weight} lbs)</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">${load.rate.toLocaleString()}</p>
                    <p className="text-muted-foreground">{load.distance} miles</p>
                  </div>
                </div>
                
                {load.assignedDriver && (
                  <div className="text-sm">
                    <span className="font-medium">Driver: </span>
                    <span className="text-muted-foreground">{load.assignedDriver.name}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
