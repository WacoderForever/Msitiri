import { useState } from "react";
import { ChevronDown, X, Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FiltersState {
  make: string;
  priceMin: string;
  priceMax: string;
  yearMin: string;
  yearMax: string;
  transmission: string;
  fuelType: string;
  location: string;
  conditionMin: string;
}

interface VehicleFiltersProps {
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
  onReset: () => void;
}

const makes = ["Toyota", "Honda", "Mazda", "Subaru", "Nissan", "BMW", "Mercedes-Benz", "Volkswagen"];
const transmissions = ["Automatic", "Manual", "CVT"];
const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];
const locations = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika"];

export function VehicleFilters({ filters, onFiltersChange, onReset }: VehicleFiltersProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const updateFilter = (key: keyof FiltersState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== "");

  const renderDropdown = (
    id: string,
    label: string,
    options: string[],
    value: string,
    onChange: (value: string) => void
  ) => (
    <div className="relative">
      <button
        onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border text-sm transition-colors",
          value
            ? "bg-primary/5 border-primary/30 text-foreground"
            : "bg-card border-border text-muted-foreground hover:border-primary/30"
        )}
      >
        <span>{value || label}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", openDropdown === id && "rotate-180")} />
      </button>
      
      {openDropdown === id && (
        <div className="absolute z-20 top-full mt-1 left-0 right-0 bg-card border border-border rounded-lg shadow-lg overflow-hidden animate-scale-in">
          <button
            onClick={() => { onChange(""); setOpenDropdown(null); }}
            className="w-full px-3 py-2 text-left text-sm text-muted-foreground hover:bg-secondary transition-colors"
          >
            All {label}s
          </button>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => { onChange(option); setOpenDropdown(null); }}
              className={cn(
                "w-full px-3 py-2 text-left text-sm hover:bg-secondary transition-colors",
                value === option ? "bg-primary/10 text-primary" : "text-foreground"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const filterContent = (
    <div className="space-y-4">
      {/* Make */}
      {renderDropdown("make", "Make", makes, filters.make, (v) => updateFilter("make", v))}

      {/* Price Range */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Price Range (KES)</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => updateFilter("priceMin", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => updateFilter("priceMax", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Year Range */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Year</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="From"
            value={filters.yearMin}
            onChange={(e) => updateFilter("yearMin", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <input
            type="number"
            placeholder="To"
            value={filters.yearMax}
            onChange={(e) => updateFilter("yearMax", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Transmission */}
      {renderDropdown("transmission", "Transmission", transmissions, filters.transmission, (v) => updateFilter("transmission", v))}

      {/* Fuel Type */}
      {renderDropdown("fuel", "Fuel Type", fuelTypes, filters.fuelType, (v) => updateFilter("fuelType", v))}

      {/* Location */}
      {renderDropdown("location", "Location", locations, filters.location, (v) => updateFilter("location", v))}

      {/* Condition */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Min Condition Score</label>
        <input
          type="range"
          min="0"
          max="100"
          value={filters.conditionMin || 0}
          onChange={(e) => updateFilter("conditionMin", e.target.value)}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Any</span>
          <span className="font-medium text-foreground">{filters.conditionMin || 0}%+</span>
          <span>100%</span>
        </div>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={onReset} className="w-full">
          <RotateCcw className="h-4 w-4" />
          Reset Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setShowMobileFilters(true)}
          className="w-full"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">
              Active
            </span>
          )}
        </Button>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-background p-6 overflow-y-auto animate-slide-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-semibold text-lg">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-secondary rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            {filterContent}
            <div className="mt-6">
              <Button className="w-full" onClick={() => setShowMobileFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Filters */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-card border border-border rounded-2xl p-5">
          <h3 className="font-display font-semibold text-lg mb-4">Filters</h3>
          {filterContent}
        </div>
      </div>
    </>
  );
}
