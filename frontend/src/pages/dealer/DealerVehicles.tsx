import { useState } from "react";
import { DealerLayout } from "@/components/dealer/DealerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Vehicle {
  id: number;
  title: string;
  price: string;
  year: number;
  status: "Active" | "Pending" | "Sold";
  views: number;
  inquiries: number;
}

const initialVehicles: Vehicle[] = [
  { id: 1, title: "Toyota Land Cruiser V8", price: "KSh 8,500,000", year: 2020, status: "Active", views: 342, inquiries: 12 },
  { id: 2, title: "Mercedes-Benz C200", price: "KSh 4,200,000", year: 2019, status: "Active", views: 256, inquiries: 8 },
  { id: 3, title: "Subaru Forester XT", price: "KSh 3,800,000", year: 2021, status: "Pending", views: 189, inquiries: 5 },
  { id: 4, title: "BMW X5 xDrive", price: "KSh 6,900,000", year: 2018, status: "Sold", views: 421, inquiries: 15 },
  { id: 5, title: "Nissan X-Trail", price: "KSh 2,900,000", year: 2020, status: "Active", views: 178, inquiries: 6 },
  { id: 6, title: "Range Rover Evoque", price: "KSh 5,500,000", year: 2019, status: "Active", views: 298, inquiries: 9 },
];

export default function DealerVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const filtered = vehicles.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    toast({ title: "Vehicle removed", description: "The listing has been deleted." });
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newVehicle: Vehicle = {
      id: Date.now(),
      title: form.get("title") as string,
      price: `KSh ${form.get("price")}`,
      year: Number(form.get("year")),
      status: "Pending",
      views: 0,
      inquiries: 0,
    };
    setVehicles((prev) => [newVehicle, ...prev]);
    setDialogOpen(false);
    toast({ title: "Vehicle added", description: "Your listing is pending review." });
  };

  return (
    <DealerLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">My Vehicles</h1>
            <p className="text-muted-foreground mt-1">{vehicles.length} total listings</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4" /> Add Vehicle</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Vehicle Title</Label>
                  <Input id="title" name="title" placeholder="e.g. 2021 Toyota Hilux" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (KSh)</Label>
                    <Input id="price" name="price" placeholder="3,500,000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" name="year" type="number" placeholder="2021" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select name="condition" defaultValue="used">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Brand New</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                      <SelectItem value="certified">Certified Pre-Owned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="Describe the vehicle..." rows={3} />
                </div>
                <DialogFooter>
                  <Button type="submit">Add Listing</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vehicles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Inquiries</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.title}</TableCell>
                    <TableCell>{vehicle.price}</TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>
                      <Badge variant={
                        vehicle.status === "Active" ? "default" :
                        vehicle.status === "Pending" ? "secondary" : "outline"
                      }>
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{vehicle.views}</TableCell>
                    <TableCell>{vehicle.inquiries}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(vehicle.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DealerLayout>
  );
}
