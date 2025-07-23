import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Fuel, Truck, Navigation as NavigationIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/home/Navigation';

interface Location {
  latitude: number;
  longitude: number;
}

interface GasStation {
  id: string;
  name: string;
  address: string;
  distance: number;
  fuelTypes: string[];
  price?: number;
}

interface TruckStop {
  id: string;
  name: string;
  address: string;
  distance: number;
  amenities: string[];
  parkingSpaces?: number;
}

export default function TruckServices() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [gasStations, setGasStations] = useState<GasStation[]>([]);
  const [truckStops, setTruckStops] = useState<TruckStop[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'gas' | 'truck'>('main');
  const { toast } = useToast();
  const navigate = useNavigate();

  const requestLocation = async () => {
    setIsLoadingLocation(true);
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        });
      });

      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      setUserLocation(location);
      toast({
        title: "Location Found",
        description: "Successfully retrieved your current location"
      });

      return location;
    } catch (error) {
      toast({
        title: "Location Error",
        description: "Unable to access your location. Please enable location services.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const findGasStations = async () => {
    setIsLoadingServices(true);
    
    try {
      let location = userLocation;
      if (!location) {
        location = await requestLocation();
      }

      // Mock data for gas stations (replace with actual API call)
      const mockGasStations: GasStation[] = [
        {
          id: '1',
          name: 'Shell Station',
          address: '123 Main St, City, State',
          distance: 0.5,
          fuelTypes: ['Regular', 'Mid-Grade', 'Premium', 'Diesel'],
          price: 3.45
        },
        {
          id: '2',
          name: 'BP Express',
          address: '456 Highway 1, City, State',
          distance: 1.2,
          fuelTypes: ['Regular', 'Premium', 'Diesel'],
          price: 3.39
        },
        {
          id: '3',
          name: 'Chevron',
          address: '789 Interstate Dr, City, State',
          distance: 2.1,
          fuelTypes: ['Regular', 'Mid-Grade', 'Premium', 'Diesel'],
          price: 3.52
        }
      ];

      setGasStations(mockGasStations);
      setCurrentView('gas');
      
      toast({
        title: "Gas Stations Found",
        description: `Found ${mockGasStations.length} nearby gas stations`
      });
    } catch (error) {
      // Error already handled in requestLocation
    } finally {
      setIsLoadingServices(false);
    }
  };

  const findTruckStops = async () => {
    setIsLoadingServices(true);
    
    try {
      let location = userLocation;
      if (!location) {
        location = await requestLocation();
      }

      // Mock data for truck stops (replace with actual API call)
      const mockTruckStops: TruckStop[] = [
        {
          id: '1',
          name: 'Flying J Travel Center',
          address: '100 Truck Plaza Rd, City, State',
          distance: 3.2,
          amenities: ['Showers', 'Restaurant', 'WiFi', 'Laundry', 'Repair Shop'],
          parkingSpaces: 45
        },
        {
          id: '2',
          name: 'TA Travel Center',
          address: '200 Highway Stop, City, State',
          distance: 5.7,
          amenities: ['Showers', 'Food Court', 'WiFi', 'ATM', 'Truck Wash'],
          parkingSpaces: 23
        },
        {
          id: '3',
          name: 'Pilot Flying J',
          address: '300 Interstate Way, City, State',
          distance: 8.1,
          amenities: ['Showers', 'Restaurant', 'WiFi', 'Laundry', 'CAT Scale'],
          parkingSpaces: 67
        }
      ];

      setTruckStops(mockTruckStops);
      setCurrentView('truck');
      
      toast({
        title: "Truck Stops Found",
        description: `Found ${mockTruckStops.length} nearby truck stops`
      });
    } catch (error) {
      // Error already handled in requestLocation
    } finally {
      setIsLoadingServices(false);
    }
  };

  const renderMainView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navigation activeSection="" scrollToSection={() => {}} />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Truck Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find nearby gas stations and truck stops with real-time information
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Fuel className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Find Gas Stations</CardTitle>
              <CardDescription>
                Locate nearby gas stations with fuel prices and available fuel types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={findGasStations}
                disabled={isLoadingServices || isLoadingLocation}
                className="w-full"
                size="lg"
              >
                {isLoadingServices ? 'Searching...' : 'Find Gas Stations'}
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Find Truck Stops</CardTitle>
              <CardDescription>
                Discover truck stops with parking availability and amenities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={findTruckStops}
                disabled={isLoadingServices || isLoadingLocation}
                className="w-full"
                size="lg"
              >
                {isLoadingServices ? 'Searching...' : 'Find Truck Stops'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {!userLocation && (
          <Alert className="max-w-2xl mx-auto mt-8">
            <MapPin className="h-4 w-4" />
            <AlertDescription>
              We'll request your location when you search for services to show you the most relevant results.
            </AlertDescription>
          </Alert>
        )}

        {userLocation && (
          <Alert className="max-w-2xl mx-auto mt-8">
            <NavigationIcon className="h-4 w-4" />
            <AlertDescription>
              Location enabled. Showing results within 50 miles of your current position.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );

  const renderGasStations = () => (
    <div className="min-h-screen bg-background">
      <Navigation activeSection="" scrollToSection={() => {}} />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Nearby Gas Stations</h1>
          <Button variant="outline" onClick={() => setCurrentView('main')}>
            Back to Services
          </Button>
        </div>

        <div className="grid gap-6">
          {gasStations.map((station) => (
            <Card key={station.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{station.name}</h3>
                    <p className="text-muted-foreground mb-3">{station.address}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {station.fuelTypes.map((fuel) => (
                        <span key={fuel} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {fuel}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      ${station.price}/gal
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {station.distance} miles
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTruckStops = () => (
    <div className="min-h-screen bg-background">
      <Navigation activeSection="" scrollToSection={() => {}} />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Nearby Truck Stops</h1>
          <Button variant="outline" onClick={() => setCurrentView('main')}>
            Back to Services
          </Button>
        </div>

        <div className="grid gap-6">
          {truckStops.map((stop) => (
            <Card key={stop.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{stop.name}</h3>
                    <p className="text-muted-foreground mb-3">{stop.address}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {stop.amenities.map((amenity) => (
                        <span key={amenity} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {stop.parkingSpaces} spaces
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stop.distance} miles
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  if (currentView === 'gas') return renderGasStations();
  if (currentView === 'truck') return renderTruckStops();
  return renderMainView();
}