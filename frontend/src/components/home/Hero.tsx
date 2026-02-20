import { useState } from "react";
import { Search, ArrowRight, Shield, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/vehicles${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`);
  };

  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm animate-fade-up">
            <Shield className="h-4 w-4" />
            Kenya's Trusted Vehicle Marketplace
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight animate-fade-up delay-100">
            Find Quality
            <span className="block text-accent">Second-Hand Vehicles</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up delay-200">
            Compare prices, check quality scores, and buy with confidence. 
            Msitiri helps you find fairly priced vehicles from trusted dealers across Kenya.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto animate-fade-up delay-300">
            <div className="flex items-center bg-primary-foreground rounded-xl p-2 shadow-lg">
              <div className="flex-1 flex items-center gap-2 px-4">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for Toyota, Honda, BMW..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none py-2"
                />
              </div>
              <Button variant="hero" size="lg" onClick={handleSearch}>
                Search
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 animate-fade-up delay-400">
            {[
              { icon: Users, value: "3,500+", label: "Active Dealers" },
              { icon: TrendingUp, value: "15,000+", label: "Vehicles Listed" },
              { icon: Shield, value: "98%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-3 text-primary-foreground">
                <stat.icon className="h-5 w-5 text-accent" />
                <div className="text-left">
                  <p className="font-display font-bold text-xl">{stat.value}</p>
                  <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50L48 45.8C96 41.7 192 33.3 288 35.8C384 38.3 480 51.7 576 56.7C672 61.7 768 58.3 864 51.7C960 45 1056 35 1152 33.3C1248 31.7 1344 38.3 1392 41.7L1440 45V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
}
