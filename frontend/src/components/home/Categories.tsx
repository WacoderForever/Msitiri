import { Car, Bike, Truck, Bus } from "lucide-react";
import { Link } from "react-router-dom";

const vehicleCategories = [
  {
    icon: Car,
    title: "Cars",
    count: "8,500+",
    href: "/vehicles?type=car",
    gradient: "from-primary to-primary/70",
  },
  {
    icon: Bike,
    title: "Motorcycles",
    count: "3,200+",
    href: "/vehicles?type=motorcycle",
    gradient: "from-accent to-accent/70",
  },
  {
    icon: Truck,
    title: "SUVs & Trucks",
    count: "2,800+",
    href: "/vehicles?type=suv",
    gradient: "from-success to-success/70",
  },
  {
    icon: Bus,
    title: "Vans & Buses",
    count: "1,100+",
    href: "/vehicles?type=van",
    gradient: "from-warning to-warning/70",
  },
];

export function Categories() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Browse by Category
          </h2>
          <p className="text-muted-foreground mt-2">
            Explore our wide selection of quality vehicles
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {vehicleCategories.map((category, index) => (
            <Link
              key={index}
              to={category.href}
              className="group relative overflow-hidden rounded-2xl p-6 md:p-8 bg-card border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} text-primary-foreground mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className="h-7 w-7" />
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                {category.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {category.count} listings
              </p>

              <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
