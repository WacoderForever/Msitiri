import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, XCircle, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface Listing {
  id: number;
  title: string;
  dealer: string;
  price: string;
  status: "Active" | "Pending" | "Rejected" | "Sold";
  date: string;
  reported: boolean;
}

const initialListings: Listing[] = [
  { id: 1, title: "2020 Toyota Land Cruiser V8", dealer: "AutoHub Kenya", price: "KSh 8,500,000", status: "Active", date: "Feb 15, 2026", reported: false },
  { id: 2, title: "2022 Toyota Prado TX", dealer: "Safari Motors", price: "KSh 9,200,000", status: "Pending", date: "Feb 18, 2026", reported: false },
  { id: 3, title: "2019 Mercedes-Benz C200", dealer: "AutoHub Kenya", price: "KSh 4,200,000", status: "Active", date: "Feb 10, 2026", reported: true },
  { id: 4, title: "2021 Subaru Forester XT", dealer: "City Auto", price: "KSh 3,800,000", status: "Pending", date: "Feb 19, 2026", reported: false },
  { id: 5, title: "2018 BMW X5 xDrive", dealer: "AutoHub Kenya", price: "KSh 6,900,000", status: "Sold", date: "Jan 28, 2026", reported: false },
  { id: 6, title: "Suspicious Listing", dealer: "Unknown Dealer", price: "KSh 500,000", status: "Rejected", date: "Feb 12, 2026", reported: true },
];

export default function AdminListings() {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const updateStatus = (id: number, status: Listing["status"]) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    toast({ title: `Listing ${status.toLowerCase()}` });
  };

  const filtered = listings.filter(l => l.title.toLowerCase().includes(search.toLowerCase()) || l.dealer.toLowerCase().includes(search.toLowerCase()));

  const statusColor = (s: string) =>
    s === "Active" ? "default" : s === "Pending" ? "secondary" : s === "Rejected" ? "destructive" : "outline";

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">All Listings</h1>
          <p className="text-muted-foreground mt-1">Review and manage vehicle listings across the platform.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["Active", "Pending", "Rejected", "Sold"].map(status => (
            <Card key={status}>
              <CardContent className="pt-6 text-center">
                <p className="text-2xl font-bold font-display">{listings.filter(l => l.status === status).length}</p>
                <p className="text-sm text-muted-foreground">{status}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search listings..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Dealer</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Flagged</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell className="font-medium">{listing.title}</TableCell>
                    <TableCell className="text-muted-foreground">{listing.dealer}</TableCell>
                    <TableCell>{listing.price}</TableCell>
                    <TableCell><Badge variant={statusColor(listing.status)}>{listing.status}</Badge></TableCell>
                    <TableCell className="text-muted-foreground">{listing.date}</TableCell>
                    <TableCell>
                      {listing.reported && <Badge variant="destructive" className="text-xs">Reported</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                        {listing.status === "Pending" && (
                          <>
                            <Button variant="ghost" size="icon" onClick={() => updateStatus(listing.id, "Active")}>
                              <CheckCircle className="h-4 w-4 text-primary" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => updateStatus(listing.id, "Rejected")}>
                              <XCircle className="h-4 w-4 text-destructive" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
