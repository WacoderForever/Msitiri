import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { VehicleFilters } from "@/components/vehicles/VehicleFilters";
import { Search, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sample vehicles data
const allVehicles = [
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
    make: "Toyota",
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
    make: "Honda",
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
    make: "Mazda",
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
    make: "Subaru",
  },
  {
    id: "5",
    title: "Toyota Hilux 2019",
    price: 3500000,
    location: "Nairobi",
    mileage: 55000,
    transmission: "Manual",
    fuelType: "Diesel",
    year: 2019,
    condition: 88,
    image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=600&h=400&fit=crop",
    dealer: "Safari Motors",
    isVerified: true,
    make: "Toyota",
  },
  {
    id: "6",
    title: "Nissan X-Trail 2018",
    price: 2100000,
    location: "Nakuru",
    mileage: 67000,
    transmission: "CVT",
    fuelType: "Petrol",
    year: 2018,
    condition: 75,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&h=400&fit=crop",
    dealer: "Rift Valley Autos",
    isVerified: true,
    make: "Nissan",
  },
  {
    id: "7",
    title: "BMW X3 2017",
    price: 3800000,
    location: "Nairobi",
    mileage: 72000,
    transmission: "Automatic",
    fuelType: "Petrol",
    year: 2017,
    condition: 80,
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=600&h=400&fit=crop",
    dealer: "German Auto House",
    isVerified: true,
    make: "BMW",
  },
  {
    id: "8",
    title: "Honda Fit 2019",
    price: 1250000,
    location: "Mombasa",
    mileage: 38000,
    transmission: "CVT",
    fuelType: "Petrol",
    year: 2019,
    condition: 90,
    image: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=600&h=400&fit=crop",
    dealer: "Coastal Motors",
    isVerified: true,
    make: "Honda",
  },
];

const initialFilters = {
  make: "",
  priceMin: "",
  priceMax: "",
  yearMin: "",
  yearMax: "",
  transmission: "",
  fuelType: "",
  location: "",
  conditionMin: "",
};

export default function Vehicles() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [filters, setFilters] = useState(initialFilters);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  const filteredVehicles = useMemo(() => {
    return allVehicles
      .filter((vehicle) => {
        // Search query
        if (searchQuery && !vehicle.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        // Make
        if (filters.make && vehicle.make !== filters.make) return false;
        // Price
        if (filters.priceMin && vehicle.price < parseInt(filters.priceMin)) return false;
        if (filters.priceMax && vehicle.price > parseInt(filters.priceMax)) return false;
        // Year
        if (filters.yearMin && vehicle.year < parseInt(filters.yearMin)) return false;
        if (filters.yearMax && vehicle.year > parseInt(filters.yearMax)) return false;
        // Transmission
        if (filters.transmission && vehicle.transmission !== filters.transmission) return false;
        // Fuel Type
        if (filters.fuelType && vehicle.fuelType !== filters.fuelType) return false;
        // Location
        if (filters.location && vehicle.location !== filters.location) return false;
        // Condition
        if (filters.conditionMin && vehicle.condition < parseInt(filters.conditionMin)) return false;
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low": return a.price - b.price;
          case "price-high": return b.price - a.price;
          case "condition": return b.condition - a.condition;
          case "mileage": return a.mileage - b.mileage;
          default: return b.year - a.year;
        }
      });
  }, [searchQuery, filters, sortBy]);

  return (
    <Layout>
      <div className="bg-secondary/30 py-8">
        <div className="container">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Browse Vehicles
          </h1>
          <p className="text-muted-foreground">
            Find your perfect second-hand vehicle from {allVehicles.length}+ listings
          </p>

          {/* Search Bar */}
          <div className="mt-6 flex items-center gap-2 bg-card rounded-xl border border-border p-2">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by make, model, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none py-2"
              />
            </div>
            <Button variant="default">Search</Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <VehicleFilters
            filters={filters}
            onFiltersChange={setFilters}
            onReset={() => setFilters(initialFilters)}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredVehicles.length}</span> vehicles
              </p>
              
              <div className="flex items-center gap-3">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="condition">Best Condition</option>
                  <option value="mileage">Lowest Mileage</option>
                </select>

                {/* View Toggle */}
                <div className="hidden md:flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 rounded-l-lg transition-colors",
                      viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                    )}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 rounded-r-lg transition-colors",
                      viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                    )}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Vehicles Grid */}
            {filteredVehicles.length > 0 ? (
              <div className={cn(
                "grid gap-6",
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              )}>
                {filteredVehicles.map((vehicle, index) => (
                  <div
                    key={vehicle.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <VehicleCard vehicle={vehicle} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <SlidersHorizontal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  No vehicles found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setFilters(initialFilters);
                    setSearchQuery("");
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
