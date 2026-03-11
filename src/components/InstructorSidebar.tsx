import { LayoutDashboard, Users, AlertTriangle, BarChart3, FileBarChart, LogOut, Activity, ClipboardList } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/lib/auth-context";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/instructor", icon: LayoutDashboard },
  { title: "Students", url: "/instructor/students", icon: Users },
  { title: "Drift Alerts", url: "/instructor/drift-alerts", icon: AlertTriangle },
  { title: "Quiz Monitoring", url: "/instructor/quiz-monitoring", icon: ClipboardList },
  { title: "Analytics", url: "/instructor/analytics", icon: BarChart3 },
  { title: "Reports", url: "/instructor/reports", icon: FileBarChart },
];

export function InstructorSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { logout, user } = useAuth();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <Activity className="h-5 w-5 shrink-0 text-primary" />
        {!collapsed && <span className="font-mono text-sm font-bold text-sidebar-foreground">Drift Learn</span>}
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === "/instructor"} className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-3">
        {!collapsed && user && (
          <p className="mb-2 truncate text-xs text-muted-foreground">{user.name}</p>
        )}
        <SidebarMenuButton onClick={() => logout()} className="hover:bg-sidebar-accent text-muted-foreground hover:text-alert">
          <LogOut className="mr-2 h-4 w-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
