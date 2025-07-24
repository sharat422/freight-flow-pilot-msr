import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Fuel, Truck, Navigation as NavigationIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/home/Navigation';

const GOOGLE_API_KEY = 'AIzaSyBgBVnUe6kFwQUMEjl5a0gH0n3kKBWadnk';

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

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const findGasStations = async () => {
    setIsLoadingServices(true);
    
    try {
      let location = userLocation;
      if (!location) {
        location = await requestLocation();
      }

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=25000&type=gas_station&key=${GOOGLE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch gas stations');
      }

      const data = await response.json();
      
      const stations: GasStation[] = data.results.slice(0, 10).map((place: any) => {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          place.geometry.location.lat,
          place.geometry.location.lng
        );

        return {
          id: place.place_id,
          name: place.name,
          address: place.vicinity,
          distance: Math.round(distance * 10) / 10,
          fuelTypes: ['Regular', 'Premium', 'Diesel'], // Generic fuel types
          price: undefined // Price data not available in basic API
        };
      });

      setGasStations(stations);
      setCurrentView('gas');
      
      toast({
        title: "Gas Stations Found",
        description: `Found ${stations.length} nearby gas stations`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to find gas stations. Please try again.",
        variant: "destructive"
      });
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

      // Search for various truck stop related places
      const searchTerms = ['truck stop', 'travel center', 'truck plaza', 'rest stop'];
      let allResults: any[] = [];

      for (const term of searchTerms) {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(term + ' near me')}&location=${location.latitude},${location.longitude}&radius=25000&key=${GOOGLE_API_KEY}`
        );

        if (response.ok) {
          const data = await response.json();
          allResults = [...allResults, ...data.results];
        }
      }

      // Remove duplicates and filter relevant results
      const uniqueResults = allResults.filter((place, index, self) => 
        index === self.findIndex(p => p.place_id === place.place_id)
      ).filter(place => 
        place.name.toLowerCase().includes('truck') ||
        place.name.toLowerCase().includes('travel') ||
        place.name.toLowerCase().includes('pilot') ||
        place.name.toLowerCase().includes('flying j') ||
        place.name.toLowerCase().includes('ta ') ||
        place.types?.some((type: string) => type.includes('gas_station') || type.includes('rest_stop'))
      );

      const stops: TruckStop[] = uniqueResults.slice(0, 10).map((place: any) => {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          place.geometry.location.lat,
          place.geometry.location.lng
        );

        // Determine amenities based on place types and name
        const amenities: string[] = [];
        if (place.name.toLowerCase().includes('pilot') || place.name.toLowerCase().includes('flying j')) {
          amenities.push('Showers', 'Restaurant', 'WiFi', 'Fuel');
        } else if (place.name.toLowerCase().includes('travel center')) {
          amenities.push('Showers', 'Food Court', 'WiFi', 'Fuel');
        } else {
          amenities.push('Fuel', 'Parking');
        }

        return {
          id: place.place_id,
          name: place.name,
          address: place.formatted_address || place.vicinity,
          distance: Math.round(distance * 10) / 10,
          amenities,
          parkingSpaces: undefined // Parking data not available in basic API
        };
      });

      setTruckStops(stops);
      setCurrentView('truck');
      
      toast({
        title: "Truck Stops Found",
        description: `Found ${stops.length} nearby truck stops`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to find truck stops. Please try again.",
        variant: "destructive"
      });
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
                      {station.price ? `$${station.price}/gal` : 'Price N/A'}
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
                      {stop.parkingSpaces ? `${stop.parkingSpaces} spaces` : 'Parking Available'}
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