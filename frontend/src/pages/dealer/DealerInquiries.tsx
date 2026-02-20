import { DealerLayout } from "@/components/dealer/DealerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Phone, Mail, Clock } from "lucide-react";

const inquiries = [
  { id: 1, customer: "John Kamau", email: "john@email.com", phone: "+254712345678", vehicle: "2020 Toyota Land Cruiser", message: "Is this vehicle still available? I'd like to schedule a test drive this weekend.", date: "2 hours ago", status: "New" as const },
  { id: 2, customer: "Mary Wanjiku", email: "mary@email.com", phone: "+254723456789", vehicle: "2019 Mercedes-Benz C200", message: "What's the mileage on this vehicle? Can you share the service history?", date: "5 hours ago", status: "Replied" as const },
  { id: 3, customer: "Peter Ochieng", email: "peter@email.com", phone: "+254734567890", vehicle: "2021 Subaru Forester", message: "I'm interested in this vehicle. Do you offer financing options?", date: "1 day ago", status: "New" as const },
  { id: 4, customer: "Grace Muthoni", email: "grace@email.com", phone: "+254745678901", vehicle: "2018 BMW X5", message: "Is the price negotiable? I can do a cash purchase.", date: "1 day ago", status: "Closed" as const },
  { id: 5, customer: "Samuel Kiprop", email: "sam@email.com", phone: "+254756789012", vehicle: "2020 Nissan X-Trail", message: "Can I see more photos of the interior?", date: "2 days ago", status: "Replied" as const },
];

const statusColors = {
  New: "bg-accent/10 text-accent border-accent/20",
  Replied: "bg-primary/10 text-primary border-primary/20",
  Closed: "bg-muted text-muted-foreground border-border",
};

export default function DealerInquiries() {
  return (
    <DealerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Inquiries</h1>
          <p className="text-muted-foreground mt-1">{inquiries.filter(i => i.status === "New").length} new inquiries awaiting response</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "New", count: inquiries.filter(i => i.status === "New").length, color: "text-accent" },
            { label: "Replied", count: inquiries.filter(i => i.status === "Replied").length, color: "text-primary" },
            { label: "Closed", count: inquiries.filter(i => i.status === "Closed").length, color: "text-muted-foreground" },
          ].map(s => (
            <Card key={s.label}>
              <CardContent className="pt-6 text-center">
                <p className={`text-3xl font-bold font-display ${s.color}`}>{s.count}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <Card key={inquiry.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{inquiry.customer}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Re: {inquiry.vehicle}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={statusColors[inquiry.status]}>
                      {inquiry.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {inquiry.date}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground mb-4 flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  {inquiry.message}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {inquiry.email}</span>
                  <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {inquiry.phone}</span>
                  {inquiry.status === "New" && (
                    <Button size="sm" className="ml-auto">Reply</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DealerLayout>
  );
}
