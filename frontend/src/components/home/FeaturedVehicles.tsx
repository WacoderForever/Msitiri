import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { VehicleCard } from "@/components/vehicles/VehicleCard";

// Sample featured vehicles data
const featuredVehicles = [
  {
    id: "1",
    title: "Toyota Corolla 2019",
    price: 1850000,
    location: "Nairobi",
    mileage: 45000,
    transmission: "Automatic",
    fuelType: "Petrol",
    year: 2019,
    condition: 85,
    image: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=600&h=400&fit=crop",
    dealer: "AutoHub Kenya",
    isVerified: true,
  },
  {
    id: "2",
    title: "Honda CR-V 2018",
    price: 2450000,
    location: "Mombasa",
    mileage: 62000,
    transmission: "Automatic",
    fuelType: "Petrol",
    year: 2018,
    condition: 78,
    image: "https://images.unsplash.com/photo-1568844293986-ca17c387e2d3?w=600&h=400&fit=crop",
    dealer: "Coastal Motors",
    isVerified: true,
  },
  {
    id: "3",
    title: "Mazda CX-5 2020",
    price: 3100000,
    location: "Nairobi",
    mileage: 28000,
    transmission: "Automatic",
    fuelType: "Petrol",
    year: 2020,
    condition: 92,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
    dealer: "Prime Auto Deals",
    isVerified: true,
  },
  {
    id: "4",
    title: "Subaru Outback 2017",
    price: 2200000,
    location: "Kisumu",
    mileage: 78000,
    transmission: "CVT",
    fuelType: "Petrol",
    year: 2017,
    condition: 72,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop",
    dealer: "Lake Motors",
    isVerified: false,
  },
];

export function FeaturedVehicles() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Featured Vehicles
            </h2>
            <p className="text-muted-foreground mt-2">
              Hand-picked quality vehicles with verified condition scores
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/vehicles">
              View All Vehicles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <VehicleCard vehicle={vehicle} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
