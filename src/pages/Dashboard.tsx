
import { useAuth } from '@/contexts/AuthContext';
import { useFreightData } from '@/hooks/useFreightData';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { LoadsTable } from '@/components/dashboard/LoadsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const { user } = useAuth();
  const { stats, loads, isLoading } = useFreightData();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48 mt-2" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-32 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getRoleSpecificContent = () => {
    switch (user?.role) {
      case 'admin':
        return {
          title: `${getGreeting()}, ${user.name}`,
          subtitle: 'Here\'s what\'s happening with your freight operations today.',
          showStats: true,
          loadsTitle: 'Recent Loads',
        };
      case 'dispatcher':
        return {
          title: `${getGreeting()}, ${user.name}`,
          subtitle: 'Ready to dispatch some loads? Check your active assignments.',
          showStats: true,
          loadsTitle: 'Loads to Dispatch',
        };
      case 'carrier':
        return {
          title: `${getGreeting()}, ${user.name}`,
          subtitle: 'View your available loads and manage your fleet.',
          showStats: false,
          loadsTitle: 'Available Loads',
        };
      case 'driver':
        return {
          title: `${getGreeting()}, ${user.name}`,
          subtitle: 'Here are your current and upcoming deliveries.',
          showStats: false,
          loadsTitle: 'My Assignments',
        };
      default:
        return {
          title: `${getGreeting()}`,
          subtitle: 'Welcome to MSR Freight Dispatchers',
          showStats: true,
          loadsTitle: 'Recent Loads',
        };
    }
  };

  const content = getRoleSpecificContent();
  const filteredLoads = user?.role === 'driver' 
    ? loads.filter(load => load.assignedDriver?.id === user.id)
    : loads;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight">{content.title}</h1>
          <p className="text-muted-foreground">{content.subtitle}</p>
        </div>

        {/* Stats Cards - Show for admin and dispatcher */}
        {content.showStats && stats && (
          <StatsCards stats={stats} />
        )}

        {/* Loads Table */}
        <LoadsTable loads={filteredLoads} title={content.loadsTitle} />

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {user?.role === 'admin' && (
                <>
                  <button className="w-full text-left p-2 hover:bg-muted rounded">
                    Add New User
                  </button>
                  <button className="w-full text-left p-2 hover:bg-muted rounded">
                    Generate Report
                  </button>
                </>
              )}
              {user?.role === 'dispatcher' && (
                <>
                  <button className="w-full text-left p-2 hover:bg-muted rounded">
                    Create New Load
                  </button>
                  <button className="w-full text-left p-2 hover:bg-muted rounded">
                    Assign Driver
                  </button>
                </>
              )}
              {user?.role === 'carrier' && (
                <>
                  <button className="w-full text-left p-2 hover:bg-muted rounded">
                    Browse Available Loads
                  </button>
                  <button className="w-full text-left p-2 hover:bg-muted rounded">
                    Manage Drivers
                  </button>
                </>
              )}
              {user?.role === 'driver' && (
                <>
                  <button className="w-full text-left p-2 hover:bg-muted rounded">
                    Update Location
                  </button>
                  <button className="w-full text-left p-2 hover:bg-muted rounded">
                    Report Issue
                  </button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
