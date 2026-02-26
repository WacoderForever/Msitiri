import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Car, Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, Building } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  dealershipName: z.string().trim().min(2, "Dealership name is required").max(100).regex(/^[a-zA-Z0-9 &'\-,.]+$/, "Must start with a letter and contain only letters, numbers, spaces, &, ', - or ."),
  contactName: z.string().trim().min(2, "Contact name is required").regex(/^[a-zA-Z ]+$/, "Name must contain only letters and spaces"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().regex(/^\+\d{1,3}\d{6,14}$/, "Phone must start with country code (e.g. +254712345678)"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

type Fields = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof Fields, string>>;

export default function DealerRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<Fields>({ dealershipName: "", contactName: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FieldErrors]) setErrors({ ...errors, [name]: undefined });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldError = result.error.errors.find((err) => err.path[0] === name);
      if (fieldError) setErrors((p) => ({ ...p, [name]: fieldError.message }));
    } else {
      setErrors((p) => ({ ...p, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(formData);
    if (!result.success) {
      const fe: FieldErrors = {};
      result.error.errors.forEach((err) => { const f = err.path[0] as keyof FieldErrors; if (!fe[f]) fe[f] = err.message; });
      setErrors(fe);
      return;
    }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); navigate("/dealer"); }, 1000);
  };

  const inputClass = (field: keyof FieldErrors) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors ${errors[field] ? "border-destructive focus:ring-destructive/20 focus:border-destructive" : "border-border focus:ring-primary/20 focus:border-primary"}`;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8 animate-fade-up">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-hero">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
            </Link>
            <h1 className="font-display text-3xl font-bold text-foreground">Register as Dealer</h1>
            <p className="mt-2 text-muted-foreground">Create your dealership account on Msitiri</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="dealershipName" className="block text-sm font-medium text-foreground mb-2">Dealership Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input id="dealershipName" name="dealershipName" value={formData.dealershipName} onChange={handleChange} onBlur={handleBlur} placeholder="AutoPrime Motors" className={inputClass("dealershipName")} />
              </div>
              {errors.dealershipName && <p className="mt-1 text-xs text-destructive">{errors.dealershipName}</p>}
            </div>

            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-foreground mb-2">Contact Person</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input id="contactName" name="contactName" value={formData.contactName} onChange={handleChange} onBlur={handleBlur} placeholder="John Kamau" className={inputClass("contactName")} />
              </div>
              {errors.contactName && <p className="mt-1 text-xs text-destructive">{errors.contactName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Business Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} placeholder="info@autoprime.co.ke" className={inputClass("email")} />
              </div>
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} onBlur={handleBlur} placeholder="+254712345678" className={inputClass("phone")} />
              </div>
              {errors.phone ? <p className="mt-1 text-xs text-destructive">{errors.phone}</p> : <p className="mt-1 text-xs text-muted-foreground">Include country code</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} onBlur={handleBlur} placeholder="Create a strong password" className={`${inputClass("password")} !pr-12`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password ? <p className="mt-1 text-xs text-destructive">{errors.password}</p> : <p className="mt-1 text-xs text-muted-foreground">Must be at least 8 characters</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input id="confirmPassword" name="confirmPassword" type={showPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Confirm your password" className={inputClass("confirmPassword")} />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-destructive">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-start gap-2">
              <input id="terms" type="checkbox" required className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary" />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Register Dealership"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-sm"><span className="bg-background px-4 text-muted-foreground">Already registered?</span></div>
          </div>

          <div className="text-center">
            <Link to="/dealer/login" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              Sign in to dealer portal <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
