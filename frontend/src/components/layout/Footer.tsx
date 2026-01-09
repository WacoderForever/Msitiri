import { Link } from "react-router-dom";
import { Car, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 border border-primary-foreground/20">
                <Car className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold">Msitiri</span>
            </Link>
            <p className="text-sm text-primary-foreground/70">
              Your trusted marketplace for quality second-hand vehicles in Kenya. 
              Find fairly priced cars and motorcycles with our smart comparison tools.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/vehicles", label: "Browse Vehicles" },
                { href: "/how-it-works", label: "How It Works" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {[
                { href: "/vehicles?type=car", label: "Cars" },
                { href: "/vehicles?type=motorcycle", label: "Motorcycles" },
                { href: "/vehicles?type=suv", label: "SUVs" },
                { href: "/vehicles?type=truck", label: "Trucks" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 shrink-0" />
                Nairobi, Kenya
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4 shrink-0" />
                +254 700 000 000
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4 shrink-0" />
                info@msitiri.co.ke
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Msitiri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
