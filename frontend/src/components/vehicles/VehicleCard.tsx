import { MapPin, Gauge, Fuel, Settings, BadgeCheck, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
  vehicle: {
    id: string;
    title: string;
    price: number;
    location: string;
    mileage: number;
    transmission: string;
    fuelType: string;
    year: number;
    condition: number;
    image: string;
    dealer: string;
    isVerified: boolean;
  };
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
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

  const getConditionColor = (score: number) => {
    if (score >= 85) return 'text-success bg-success/10';
    if (score >= 70) return 'text-primary bg-primary/10';
    if (score >= 50) return 'text-warning bg-warning/10';
    return 'text-destructive bg-destructive/10';
  };

  const getConditionLabel = (score: number) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Poor';
  };

  return (
    <Link
      to={`/vehicles/${vehicle.id}`}
      className="group block rounded-2xl bg-card border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={vehicle.image}
          alt={vehicle.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Condition Badge */}
        <div className={cn(
          "absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
          getConditionColor(vehicle.condition)
        )}>
          <TrendingUp className="h-3 w-3" />
          {vehicle.condition}% {getConditionLabel(vehicle.condition)}
        </div>

        {/* Verified Badge */}
        {vehicle.isVerified && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
            <BadgeCheck className="h-3 w-3" />
            Verified
          </div>
        )}

        {/* Year Badge */}
        <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-foreground/80 text-background text-xs font-medium">
          {vehicle.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title & Price */}
        <div>
          <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {vehicle.title}
          </h3>
          <p className="text-lg font-bold text-accent mt-1">
            {formatPrice(vehicle.price)}
          </p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5" />
            {formatMileage(vehicle.mileage)}
          </div>
          <div className="flex items-center gap-1.5">
            <Settings className="h-3.5 w-3.5" />
            {vehicle.transmission}
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5" />
            {vehicle.fuelType}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {vehicle.location}
          </div>
        </div>

        {/* Dealer */}
        <div className="pt-3 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{vehicle.dealer}</span>
        </div>
      </div>
    </Link>
  );
}
