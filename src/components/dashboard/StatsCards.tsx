
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/types/freight';

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const statItems = [
    {
      title: 'Total Loads',
      value: stats.totalLoads,
      description: '+12% from last month',
      color: 'text-blue-600',
    },
    {
      title: 'Active Loads',
      value: stats.activeLoads,
      description: 'Currently in transit',
      color: 'text-success',
    },
    {
      title: 'Available Drivers',
      value: stats.availableDrivers,
      description: 'Ready for dispatch',
      color: 'text-info',
    },
    {
      title: 'Monthly Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      description: `+${stats.monthlyGrowth}% growth`,
      color: 'text-success',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item, index) => (
        <Card key={index} className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
