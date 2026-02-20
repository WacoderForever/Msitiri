import { DealerLayout } from "@/components/dealer/DealerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Eye, MessageSquare, TrendingUp } from "lucide-react";

const stats = [
  { label: "Active Listings", value: "24", icon: Car, change: "+3 this week" },
  { label: "Total Views", value: "1,842", icon: Eye, change: "+12% this month" },
  { label: "Inquiries", value: "38", icon: MessageSquare, change: "5 new today" },
  { label: "Conversion Rate", value: "8.2%", icon: TrendingUp, change: "+1.4% this month" },
];

const recentInquiries = [
  { id: 1, customer: "John Kamau", vehicle: "2020 Toyota Land Cruiser", date: "2 hours ago", status: "New" },
  { id: 2, customer: "Mary Wanjiku", vehicle: "2019 Mercedes-Benz C200", date: "5 hours ago", status: "Replied" },
  { id: 3, customer: "Peter Ochieng", vehicle: "2021 Subaru Forester", date: "1 day ago", status: "New" },
  { id: 4, customer: "Grace Muthoni", vehicle: "2018 BMW X5", date: "1 day ago", status: "Closed" },
];

export default function DealerDashboard() {
  return (
    <DealerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Welcome back, AutoHub Kenya</h1>
          <p className="text-muted-foreground mt-1">Here's an overview of your dealership performance.</p>
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

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{inquiry.customer}</p>
                    <p className="text-sm text-muted-foreground">{inquiry.vehicle}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      inquiry.status === "New" ? "bg-accent/10 text-accent" :
                      inquiry.status === "Replied" ? "bg-primary/10 text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {inquiry.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{inquiry.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DealerLayout>
  );
}
