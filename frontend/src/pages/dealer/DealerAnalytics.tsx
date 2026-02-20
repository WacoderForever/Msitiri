import { DealerLayout } from "@/components/dealer/DealerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const monthlyViews = [
  { month: "Aug", views: 820 },
  { month: "Sep", views: 1050 },
  { month: "Oct", views: 1280 },
  { month: "Nov", views: 1100 },
  { month: "Dec", views: 1450 },
  { month: "Jan", views: 1620 },
  { month: "Feb", views: 1842 },
];

const inquiryTrend = [
  { month: "Aug", inquiries: 18 },
  { month: "Sep", inquiries: 24 },
  { month: "Oct", inquiries: 30 },
  { month: "Nov", inquiries: 22 },
  { month: "Dec", inquiries: 35 },
  { month: "Jan", inquiries: 32 },
  { month: "Feb", inquiries: 38 },
];

const vehiclesByCategory = [
  { name: "SUVs", value: 8 },
  { name: "Sedans", value: 6 },
  { name: "Trucks", value: 4 },
  { name: "Hatchbacks", value: 3 },
  { name: "Vans", value: 3 },
];

const COLORS = ["hsl(160, 45%, 25%)", "hsl(20, 70%, 55%)", "hsl(145, 60%, 40%)", "hsl(45, 90%, 50%)", "hsl(160, 35%, 45%)"];

export default function DealerAnalytics() {
  return (
    <DealerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your dealership performance over time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Monthly Views</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyViews}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="views" fill="hsl(160, 45%, 25%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Inquiry Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={inquiryTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="inquiries" stroke="hsl(20, 70%, 55%)" strokeWidth={2} dot={{ fill: "hsl(20, 70%, 55%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Listings by Category</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={vehiclesByCategory} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {vehiclesByCategory.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Performing Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "2020 Toyota Land Cruiser", views: 342, inquiries: 12 },
                  { title: "Range Rover Evoque", views: 298, inquiries: 9 },
                  { title: "Mercedes-Benz C200", views: 256, inquiries: 8 },
                  { title: "2018 BMW X5", views: 421, inquiries: 15 },
                ].map((v, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-sm">{v.title}</p>
                      <p className="text-xs text-muted-foreground">{v.views} views</p>
                    </div>
                    <span className="text-sm font-medium text-accent">{v.inquiries} inquiries</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DealerLayout>
  );
}
