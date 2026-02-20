import { useState } from "react";
import { DealerLayout } from "@/components/dealer/DealerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export default function DealerProfile() {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "AutoHub Kenya",
    email: "info@autohub.co.ke",
    phone: "+254 700 123 456",
    website: "www.autohub.co.ke",
    location: "Westlands, Nairobi",
    description: "Premium vehicle dealer specializing in quality imported and locally sourced vehicles. Over 10 years of trusted service in the Kenyan market.",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Profile updated", description: "Your dealership profile has been saved." });
  };

  return (
    <DealerLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Dealer Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your dealership information.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dealership Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Dealership Name</Label>
                <Input id="name" value={profile.name} onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email"><Mail className="inline h-3.5 w-3.5 mr-1" />Email</Label>
                  <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone"><Phone className="inline h-3.5 w-3.5 mr-1" />Phone</Label>
                  <Input id="phone" value={profile.phone} onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website"><Globe className="inline h-3.5 w-3.5 mr-1" />Website</Label>
                  <Input id="website" value={profile.website} onChange={(e) => setProfile(p => ({ ...p, website: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location"><MapPin className="inline h-3.5 w-3.5 mr-1" />Location</Label>
                  <Input id="location" value={profile.location} onChange={(e) => setProfile(p => ({ ...p, location: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">About</Label>
                <Textarea id="description" value={profile.description} onChange={(e) => setProfile(p => ({ ...p, description: e.target.value }))} rows={4} />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DealerLayout>
  );
}
