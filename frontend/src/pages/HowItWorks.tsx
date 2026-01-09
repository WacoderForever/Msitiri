import { Layout } from "@/components/layout/Layout";
import { HowItWorks as HowItWorksSection } from "@/components/home/HowItWorks";
import { CTA } from "@/components/home/CTA";
import { Search, BarChart3, Shield, CheckCircle2, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find vehicles by make, model, price, location, and more. Our advanced filters help you narrow down to exactly what you need.",
  },
  {
    icon: BarChart3,
    title: "Condition Scoring",
    description: "Every vehicle is rated on engine, exterior, interior, and more. See at a glance how a car compares to market averages.",
  },
  {
    icon: TrendingUp,
    title: "Price Analysis",
    description: "Know if you're getting a good deal. We compare prices against similar vehicles to show you if it's above or below market value.",
  },
  {
    icon: Shield,
    title: "Verified Dealers",
    description: "Dealers go through a verification process. Look for the verified badge to know you're dealing with trusted sellers.",
  },
  {
    icon: Users,
    title: "Direct Communication",
    description: "Contact dealers directly through our platform. No middlemen, no hidden fees—just you and the seller.",
  },
  {
    icon: CheckCircle2,
    title: "Transparent History",
    description: "See maintenance records, accident history, and ownership details when available to make informed decisions.",
  },
];

export default function HowItWorksPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            How Msitiri Works
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            We make buying a second-hand vehicle in Kenya simple, transparent, and trustworthy. 
            Here's how our platform helps you find the best deals.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <HowItWorksSection />

      {/* Features Grid */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Features That Help You Buy Smart
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              We've built tools specifically designed to help Kenyan buyers make informed decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Is Msitiri free to use?",
                a: "Yes! Browsing vehicles, comparing prices, and contacting dealers is completely free for buyers. Dealers pay a small fee to list their vehicles.",
              },
              {
                q: "How is the condition score calculated?",
                a: "Dealers provide detailed information about each vehicle's components. Our system then calculates an overall score based on engine, transmission, exterior, interior, and other factors.",
              },
              {
                q: "Can I trust the dealers on Msitiri?",
                a: "We verify dealers before they can list vehicles. Look for the 'Verified' badge. We also encourage users to leave reviews after their purchase experience.",
              },
              {
                q: "How does price analysis work?",
                a: "We analyze prices of similar vehicles (same make, model, year, mileage) to show you if a listing is above, below, or at the market average price.",
              },
              {
                q: "Does Msitiri handle payments?",
                a: "Currently, payments are made directly between buyer and seller. We recommend meeting in person to inspect the vehicle and complete the transaction safely.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
