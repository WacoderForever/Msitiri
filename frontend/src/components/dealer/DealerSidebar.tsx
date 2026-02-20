import { Car, BarChart3, MessageSquare, User, Home, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const dealerLinks = [
  { title: "Dashboard", url: "/dealer", icon: Home },
  { title: "My Vehicles", url: "/dealer/vehicles", icon: Car },
  { title: "Inquiries", url: "/dealer/inquiries", icon: MessageSquare },
  { title: "Analytics", url: "/dealer/analytics", icon: BarChart3 },
  { title: "Profile", url: "/dealer/profile", icon: User },
];

export function DealerSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/dealer" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
            <Car className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-sidebar-foreground">
            Dealer Panel
          </span>
        </Link>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dealerLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dealer"}
                      className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground/60 hover:text-sidebar-foreground" asChild>
          <Link to="/">
            <LogOut className="mr-2 h-4 w-4" />
            Back to Site
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
