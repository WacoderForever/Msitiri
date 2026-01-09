import { Search, BarChart3, MessageSquare, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & Browse",
    description: "Find vehicles by make, model, price range, or location across Kenya.",
  },
  {
    icon: BarChart3,
    title: "Compare Quality",
    description: "Our scoring system rates each vehicle's condition, helping you spot the best deals.",
  },
  {
    icon: MessageSquare,
    title: "Contact Dealer",
    description: "Connect directly with verified dealers to negotiate and ask questions.",
  },
  {
    icon: CheckCircle2,
    title: "Buy with Confidence",
    description: "Make informed decisions with transparent pricing and quality metrics.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            How Msitiri Works
          </h2>
          <p className="text-muted-foreground mt-3">
            We make finding your next vehicle simple, transparent, and trustworthy
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center group animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <step.icon className="h-8 w-8" />
              </div>

              {/* Step Number */}
              <div className="absolute top-0 right-1/2 translate-x-10 -translate-y-1 w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                {index + 1}
              </div>

              {/* Content */}
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
