import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Car, Store, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const stats = [
  { label: "Total Users", value: "2,847", icon: Users, change: "+124 this month" },
  { label: "Active Listings", value: "1,203", icon: Car, change: "+67 this week" },
  { label: "Registered Dealers", value: "86", icon: Store, change: "+5 this month" },
  { label: "Monthly Traffic", value: "45.2K", icon: TrendingUp, change: "+18% vs last month" },
];

const pendingActions = [
  { id: 1, type: "Dealer Registration", name: "Safari Motors Ltd", date: "1 hour ago" },
  { id: 2, type: "Listing Review", name: "2022 Toyota Prado - Flagged", date: "3 hours ago" },
  { id: 3, type: "User Report", name: "Spam listing reported by user", date: "5 hours ago" },
  { id: 4, type: "Dealer Verification", name: "City Auto Dealers", date: "1 day ago" },
];

const recentActivity = [
  { id: 1, action: "New dealer approved", detail: "Mombasa Motors", time: "30 min ago", icon: CheckCircle },
  { id: 2, action: "Listing removed", detail: "Fraudulent listing #4521", time: "2 hours ago", icon: AlertTriangle },
  { id: 3, action: "User suspended", detail: "Violation of terms", time: "4 hours ago", icon: AlertTriangle },
  { id: 4, action: "New category added", detail: "Electric Vehicles", time: "1 day ago", icon: CheckCircle },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and pending actions.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-display">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-accent" /> Pending Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingActions.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-sm">{item.type}</p>
                      <p className="text-xs text-muted-foreground">{item.name}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                    <item.icon className={`h-4 w-4 shrink-0 ${item.icon === CheckCircle ? "text-primary" : "text-accent"}`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.action}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
