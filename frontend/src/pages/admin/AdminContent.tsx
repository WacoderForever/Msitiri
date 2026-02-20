import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, Plus, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: number;
  name: string;
  count: number;
  active: boolean;
}

const initialCategories: Category[] = [
  { id: 1, name: "Cars", count: 580, active: true },
  { id: 2, name: "SUVs & Trucks", count: 340, active: true },
  { id: 3, name: "Motorcycles", count: 180, active: true },
  { id: 4, name: "Vans & Buses", count: 95, active: true },
  { id: 5, name: "Electric Vehicles", count: 8, active: false },
];

const featuredListings = [
  { id: 1, title: "2020 Toyota Land Cruiser V8", dealer: "AutoHub Kenya", featured: true },
  { id: 2, title: "2021 Range Rover Sport", dealer: "Safari Motors", featured: true },
  { id: 3, title: "2022 Mercedes-Benz GLE", dealer: "City Auto", featured: true },
];

export default function AdminContent() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [bannerText, setBannerText] = useState("Find your dream vehicle on Msitiri — Kenya's trusted marketplace.");
  const { toast } = useToast();

  const toggleCategory = (id: number) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
    toast({ title: "Category updated" });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Content Management</h1>
          <p className="text-muted-foreground mt-1">Manage categories, featured listings, and site content.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Categories</CardTitle>
              <Button size="sm"><Plus className="h-4 w-4" /> Add</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <Switch checked={cat.active} onCheckedChange={() => toggleCategory(cat.id)} />
                      <div>
                        <p className="font-medium text-sm">{cat.name}</p>
                        <p className="text-xs text-muted-foreground">{cat.count} listings</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-4 w-4 text-accent" /> Featured Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {featuredListings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-sm">{listing.title}</p>
                      <p className="text-xs text-muted-foreground">{listing.dealer}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">Featured</Badge>
                      <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full"><Plus className="h-4 w-4" /> Add Featured</Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Site Banner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Banner Message</Label>
                  <Textarea value={bannerText} onChange={(e) => setBannerText(e.target.value)} rows={2} />
                </div>
                <Button onClick={() => toast({ title: "Banner saved" })}>Save Banner</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
