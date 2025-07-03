
import {
  useEffect,
  useState
} from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import {
  Separator
} from "@/components/ui/separator"
import {
  Button
} from "@/components/ui/button"
import {
  useSidebar
} from "@/components/ui/sidebar"
import {
  useNavigate,
  useLocation
} from 'react-router-dom';
import {
  cn
} from "@/lib/utils";

import { useAuth } from '@/contexts/AuthContext';
import { 
  Calendar, 
  Home, 
  LogOut, 
  Settings, 
  Truck, 
  Users,
  ClipboardList,
  Search
} from "lucide-react";

interface MenuItem {
  title: string;
  icon: any;
  url: string;
  roles: string[];
}

export function AppSidebar() {
  const { user, logout } = useAuth();
  const {
    open,
    setOpen
  } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState < string > (location.pathname);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/dashboard",
      roles: ['admin', 'dispatcher', 'carrier', 'driver']
    },
    {
      title: "Load Board",
      icon: Search,
      url: "/loadboard",
      roles: ['admin', 'dispatcher', 'carrier']
    },
    {
      title: "Drivers",
      icon: Truck,
      url: "/drivers",
      roles: ['admin', 'dispatcher']
    },
    {
      title: "Loads",
      icon: ClipboardList,
      url: "/loads",
      roles: ['admin', 'dispatcher']
    },
    {
      title: "Users",
      icon: Users,
      url: "/users",
      roles: ['admin']
    },
    {
      title: "Settings",
      icon: Settings,
      url: "/settings",
      roles: ['admin']
    },
  ];

  const handleNavigation = (url: string) => {
    navigate(url);
    setActiveItem(url);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  const renderMenuItems = () => {
    return menuItems.filter(item => item.roles.includes(user?.role || 'guest')).map((item) => (
      <Button
        key={item.title}
        variant="ghost"
        className={cn(
          "justify-start px-4",
          activeItem === item.url ? "bg-secondary" : "hover:bg-secondary/50",
        )}
        onClick={() => handleNavigation(item.url)}
      >
        <item.icon className="mr-2 h-4 w-4" />
        <span>{item.title}</span>
      </Button>
    ));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="pr-0">
        <SheetHeader className="pl-6 pb-10 pt-6">
          <SheetTitle>MSR Freight Dispatchers</SheetTitle>
          <SheetDescription>
            Manage your freight operations efficiently.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          {renderMenuItems()}
        </div>
        <Separator />
        <div className="py-4">
          <Button variant="ghost" className="justify-start px-4" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
