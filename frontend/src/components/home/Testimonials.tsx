import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "James Mwangi",
    location: "Nairobi",
    avatar: "JM",
    rating: 5,
    text: "Found my Toyota Vitz at an amazing price. The condition score matched exactly what I found when I inspected it. Highly recommend!",
  },
  {
    name: "Grace Wanjiku",
    location: "Mombasa",
    avatar: "GW",
    rating: 5,
    text: "As a first-time buyer, Msitiri made it so easy to compare different cars. The price comparison feature saved me over KES 150,000.",
  },
  {
    name: "Peter Ochieng",
    location: "Kisumu",
    avatar: "PO",
    rating: 4,
    text: "Great platform for buying second-hand vehicles. The dealer verification gives me confidence in who I'm dealing with.",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            What Our Buyers Say
          </h2>
          <p className="text-muted-foreground mt-3">
            Join thousands of satisfied buyers who found their perfect vehicle on Msitiri
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-card border border-border shadow-card animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? 'fill-warning text-warning' : 'text-muted'}`}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
