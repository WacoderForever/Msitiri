import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ConditionScore } from "@/components/vehicles/ConditionScore";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MapPin,
  Gauge,
  Fuel,
  Settings,
  Calendar,
  BadgeCheck,
  Phone,
  MessageSquare,
  Share2,
  Heart,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample vehicle data
const vehicleData = {
  id: "1",
  title: "Toyota Corolla 2019",
  price: 1850000,
  location: "Nairobi, Westlands",
  mileage: 45000,
  transmission: "Automatic",
  fuelType: "Petrol",
  year: 2019,
  condition: 85,
  marketAvgCondition: 75,
  images: [
    "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
  ],
  dealer: {
    name: "AutoHub Kenya",
    rating: 4.8,
    reviews: 127,
    verified: true,
    phone: "+254 700 123 456",
    responseTime: "Usually responds within 1 hour",
  },
  specs: {
    make: "Toyota",
    model: "Corolla",
    variant: "1.8L SE",
    engineSize: "1800cc",
    drivetrain: "Front-Wheel Drive",
    bodyType: "Sedan",
    color: "Pearl White",
    seats: 5,
    doors: 4,
  },
  conditionDetails: [
    { name: "Engine", score: 90, status: "excellent" },
    { name: "Transmission", score: 85, status: "good" },
    { name: "Exterior Paint", score: 80, status: "good" },
    { name: "Interior", score: 88, status: "excellent" },
    { name: "Tires", score: 75, status: "fair" },
    { name: "Brakes", score: 92, status: "excellent" },
  ],
  priceAnalysis: {
    marketAvg: 1950000,
    priceDiff: -100000,
    percentDiff: -5.1,
    verdict: "good",
  },
  description: `Well-maintained Toyota Corolla 2019 model with full service history. 
  Single owner, accident-free. Recently serviced with new oil filter and brake pads. 
  Features include Bluetooth connectivity, reverse camera, and cruise control. 
  Perfect for daily commuting and family use.`,
};

export default function VehicleDetail() {
  const { id } = useParams();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (km: number) => {
    return new Intl.NumberFormat('en-KE').format(km) + ' km';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-success bg-success/10";
      case "good": return "text-primary bg-primary/10";
      case "fair": return "text-warning bg-warning/10";
      default: return "text-destructive bg-destructive/10";
    }
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary/30 py-4">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link to="/vehicles" className="text-muted-foreground hover:text-foreground">Vehicles</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{vehicleData.title}</span>
          </nav>
        </div>
      </div>

      <div className="container py-8">
        {/* Back Button */}
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/vehicles">
            <ArrowLeft className="h-4 w-4" />
            Back to listings
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="rounded-2xl overflow-hidden bg-muted">
              <img
                src={vehicleData.images[0]}
                alt={vehicleData.title}
                className="w-full aspect-[16/10] object-cover"
              />
              <div className="grid grid-cols-3 gap-2 p-2">
                {vehicleData.images.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${vehicleData.title} ${idx + 2}`}
                    className="w-full aspect-video object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            </div>

            {/* Title & Quick Info */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {vehicleData.title}
                  </h1>
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {vehicleData.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {vehicleData.year}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-3xl font-bold text-accent mt-4">
                {formatPrice(vehicleData.price)}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Gauge, label: "Mileage", value: formatMileage(vehicleData.mileage) },
                { icon: Settings, label: "Transmission", value: vehicleData.transmission },
                { icon: Fuel, label: "Fuel Type", value: vehicleData.fuelType },
                { icon: Calendar, label: "Year", value: vehicleData.year.toString() },
              ].map((spec, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                  <spec.icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{spec.label}</p>
                    <p className="font-medium text-foreground">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Condition Analysis */}
            <div className="rounded-2xl bg-card border border-border p-6">
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                Condition Analysis
              </h2>
              
              <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                <ConditionScore
                  score={vehicleData.condition}
                  size="lg"
                  comparison={vehicleData.marketAvgCondition}
                />
                
                <div className="flex-1 space-y-3">
                  {vehicleData.conditionDetails.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="w-24 text-sm text-muted-foreground">{item.name}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            item.score >= 85 ? "bg-success" :
                            item.score >= 70 ? "bg-primary" :
                            item.score >= 50 ? "bg-warning" : "bg-destructive"
                          )}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full capitalize",
                        getStatusColor(item.status)
                      )}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Analysis */}
            <div className="rounded-2xl bg-card border border-border p-6">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                Price Analysis
              </h2>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-success/10 border border-success/20">
                <CheckCircle2 className="h-8 w-8 text-success" />
                <div>
                  <p className="font-semibold text-success">Good Deal!</p>
                  <p className="text-sm text-muted-foreground">
                    This vehicle is priced {formatPrice(Math.abs(vehicleData.priceAnalysis.priceDiff))} ({Math.abs(vehicleData.priceAnalysis.percentDiff)}%) below the market average of {formatPrice(vehicleData.priceAnalysis.marketAvg)} for similar vehicles.
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl bg-card border border-border p-6">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                Description
              </h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {vehicleData.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="rounded-2xl bg-card border border-border p-6">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                Specifications
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(vehicleData.specs).map(([key, value]) => (
                  <div key={key} className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="font-medium text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Dealer Card */}
            <div className="sticky top-24 rounded-2xl bg-card border border-border p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg">
                  AH
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{vehicleData.dealer.name}</h3>
                    {vehicleData.dealer.verified && (
                      <BadgeCheck className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ⭐ {vehicleData.dealer.rating} ({vehicleData.dealer.reviews} reviews)
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                {vehicleData.dealer.responseTime}
              </p>

              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <Phone className="h-4 w-4" />
                  Call Dealer
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <MessageSquare className="h-4 w-4" />
                  Send Message
                </Button>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="font-medium text-foreground mb-3">Safety Tips</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                    Always inspect the vehicle in person before purchasing
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                    Meet in a public, well-lit location
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                    Verify all documents before payment
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
