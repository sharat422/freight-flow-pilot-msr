
import { Home, Users, User, Settings, Bell, FileText, Map, Clock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const getMenuItems = (role: string) => {
  const baseItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
  ];

  const roleSpecificItems = {
    admin: [
      { title: "Users", url: "/users", icon: Users },
      { title: "Drivers", url: "/drivers", icon: User },
      { title: "Loads", url: "/loads", icon: FileText },
      { title: "Routes", url: "/routes", icon: Map },
      { title: "Reports", url: "/reports", icon: Clock },
    ],
    dispatcher: [
      { title: "Drivers", url: "/drivers", icon: User },
      { title: "Loads", url: "/loads", icon: FileText },
      { title: "Routes", url: "/routes", icon: Map },
    ],
    carrier: [
      { title: "My Loads", url: "/loads", icon: FileText },
      { title: "Drivers", url: "/drivers", icon: User },
    ],
    driver: [
      { title: "My Jobs", url: "/jobs", icon: FileText },
      { title: "Routes", url: "/routes", icon: Map },
    ],
  };

  return [...baseItems, ...(roleSpecificItems[role as keyof typeof roleSpecificItems] || [])];
};

export function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const menuItems = getMenuItems(user.role);

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">MSR</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold">MSR Freight</h2>
            <p className="text-sm text-muted-foreground">Dispatchers</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="w-full"
                  >
                    <Link to={item.url} className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/notifications" className="flex items-center space-x-3">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/settings" className="flex items-center space-x-3">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={logout}
          className="w-full"
        >
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
