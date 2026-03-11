import { LayoutDashboard, Code2, Lightbulb, FileText, BarChart3, UserCircle, LogOut, Activity, ClipboardList } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/lib/auth-context";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/student", icon: LayoutDashboard },
  { title: "Practice Coding", url: "/student/practice", icon: Code2 },
  { title: "Quizzes", url: "/student/quizzes", icon: ClipboardList },
  { title: "Recommended", url: "/student/recommended", icon: Lightbulb },
  { title: "My Submissions", url: "/student/submissions", icon: FileText },
  { title: "Learning Analytics", url: "/student/analytics", icon: BarChart3 },
  { title: "Profile", url: "/student/profile", icon: UserCircle },
];

export function StudentSidebar() {
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
                    <NavLink to={item.url} end={item.url === "/student"} className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-primary font-medium">
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
