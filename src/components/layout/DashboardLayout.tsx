
import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-muted/20 to-accent/10">
        <AppSidebar />
        <main className="flex-1">
          {/* Header */}
          <div className="sticky top-0 z-40 border-b glass-effect">
            <div className="flex h-16 items-center px-6 lg:px-8">
              <SidebarTrigger className="-ml-1 transition-all duration-200 hover:bg-accent/50" />
              <div className="ml-auto flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-gradient-primary animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 space-y-6 p-6 lg:p-8 animate-fade-in">
            <div className="stagger-children">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
