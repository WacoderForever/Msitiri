import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, Ban, CheckCircle, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Customer" | "Dealer";
  status: "Active" | "Suspended";
  joined: string;
  listings?: number;
}

const initialUsers: User[] = [
  { id: 1, name: "John Kamau", email: "john@email.com", role: "Customer", status: "Active", joined: "Jan 2025" },
  { id: 2, name: "Mary Wanjiku", email: "mary@email.com", role: "Customer", status: "Active", joined: "Dec 2024" },
  { id: 3, name: "AutoHub Kenya", email: "info@autohub.co.ke", role: "Dealer", status: "Active", joined: "Nov 2024", listings: 24 },
  { id: 4, name: "Peter Ochieng", email: "peter@email.com", role: "Customer", status: "Suspended", joined: "Oct 2024" },
  { id: 5, name: "Safari Motors", email: "sales@safari.co.ke", role: "Dealer", status: "Active", joined: "Sep 2024", listings: 18 },
  { id: 6, name: "Grace Muthoni", email: "grace@email.com", role: "Customer", status: "Active", joined: "Aug 2024" },
  { id: 7, name: "City Auto Dealers", email: "city@auto.co.ke", role: "Dealer", status: "Active", joined: "Jul 2024", listings: 32 },
  { id: 8, name: "Samuel Kiprop", email: "sam@email.com", role: "Customer", status: "Active", joined: "Jun 2024" },
];

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const toggleStatus = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u));
    toast({ title: "User status updated" });
  };

  const renderTable = (filtered: User[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Joined</TableHead>
          {filtered.some(u => u.role === "Dealer") && <TableHead>Listings</TableHead>}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="text-muted-foreground">{user.email}</TableCell>
            <TableCell><Badge variant="secondary">{user.role}</Badge></TableCell>
            <TableCell>
              <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                {user.status}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">{user.joined}</TableCell>
            {filtered.some(u => u.role === "Dealer") && <TableCell>{user.listings ?? "—"}</TableCell>}
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> View Details</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleStatus(user.id)}>
                    {user.status === "Active" ? <Ban className="mr-2 h-4 w-4" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                    {user.status === "Active" ? "Suspend" : "Activate"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const allFiltered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Users & Dealers</h1>
          <p className="text-muted-foreground mt-1">Manage all platform accounts.</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
            </div>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All ({allFiltered.length})</TabsTrigger>
                <TabsTrigger value="customers">Customers ({allFiltered.filter(u => u.role === "Customer").length})</TabsTrigger>
                <TabsTrigger value="dealers">Dealers ({allFiltered.filter(u => u.role === "Dealer").length})</TabsTrigger>
              </TabsList>
              <TabsContent value="all">{renderTable(allFiltered)}</TabsContent>
              <TabsContent value="customers">{renderTable(allFiltered.filter(u => u.role === "Customer"))}</TabsContent>
              <TabsContent value="dealers">{renderTable(allFiltered.filter(u => u.role === "Dealer"))}</TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
