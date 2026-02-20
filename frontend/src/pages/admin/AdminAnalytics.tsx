import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";

const userGrowth = [
  { month: "Aug", users: 1800 },
  { month: "Sep", users: 2010 },
  { month: "Oct", users: 2200 },
  { month: "Nov", users: 2380 },
  { month: "Dec", users: 2550 },
  { month: "Jan", users: 2720 },
  { month: "Feb", users: 2847 },
];

const listingsByMonth = [
  { month: "Aug", listings: 85 },
  { month: "Sep", listings: 102 },
  { month: "Oct", listings: 118 },
  { month: "Nov", listings: 130 },
  { month: "Dec", listings: 145 },
  { month: "Jan", listings: 162 },
  { month: "Feb", listings: 178 },
];

const traffic = [
  { month: "Aug", views: 28000 },
  { month: "Sep", views: 31000 },
  { month: "Oct", views: 34000 },
  { month: "Nov", views: 36500 },
  { month: "Dec", views: 39000 },
  { month: "Jan", views: 42000 },
  { month: "Feb", views: 45200 },
];

export default function AdminAnalytics() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Platform Analytics</h1>
          <p className="text-muted-foreground mt-1">Overall platform performance and growth metrics.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="text-base">User Growth</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" stroke="hsl(160, 45%, 25%)" fill="hsl(160, 45%, 25%)" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Monthly Listings</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={listingsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="listings" fill="hsl(20, 70%, 55%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="text-base">Platform Traffic</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={traffic}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="hsl(160, 45%, 25%)" strokeWidth={2} dot={{ fill: "hsl(160, 45%, 25%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
