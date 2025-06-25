
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useServiceWorker } from '@/hooks/useServiceWorker';
import { useToast } from '@/hooks/use-toast';

export default function OfflineIndicator() {
  const { isOnline, isUpdateAvailable, updateServiceWorker, clearCache } = useServiceWorker();
  const { toast } = useToast();

  const handleClearCache = async () => {
    try {
      await clearCache();
      toast({
        title: "Cache cleared",
        description: "All cached data has been cleared successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear cache. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isOnline) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">You're offline</span>
      </div>
    );
  }

  if (isUpdateAvailable) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
        <RefreshCw className="h-4 w-4" />
        <span className="text-sm font-medium">Update available</span>
        <Button
          size="sm"
          variant="secondary"
          onClick={updateServiceWorker}
          className="ml-2 h-6 px-2 text-xs"
        >
          Update
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 opacity-0 hover:opacity-100 transition-opacity">
      <Wifi className="h-4 w-4" />
      <span className="text-sm font-medium">Online</span>
      <Button
        size="sm"
        variant="secondary"
        onClick={handleClearCache}
        className="ml-2 h-6 px-2 text-xs"
      >
        Clear Cache
      </Button>
    </div>
  );
}
