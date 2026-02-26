import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Car, Mail, Lock, Eye, EyeOff, ArrowRight, User, Shield } from "lucide-react";
import { z } from "zod";

type Role = "customer" | "dealer" | "admin";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FieldErrors = Partial<Record<"email" | "password", string>>;

const roleConfig: Record<Role, { title: string; subtitle: string; icon: typeof User; redirect: string; placeholder: string }> = {
  customer: { title: "Welcome Back", subtitle: "Sign in to your Msitiri account", icon: User, redirect: "/", placeholder: "you@example.com" },
  dealer: { title: "Dealer Portal", subtitle: "Sign in to manage your dealership", icon: Car, redirect: "/dealer", placeholder: "dealer@example.com" },
  admin: { title: "Admin Panel", subtitle: "Access the Msitiri admin panel", icon: Shield, redirect: "/admin", placeholder: "admin@msitiri.co.ke" },
};

export default function Login() {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get("role") as Role) || "customer";
  const [role, setRole] = useState<Role>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const config = roleConfig[role];

  const validateField = (field: "email" | "password", value: string) => {
    const result = loginSchema.shape[field].safeParse(value);
    if (!result.success) {
      setErrors((p) => ({ ...p, [field]: result.error.errors[0].message }));
    } else {
      setErrors((p) => ({ ...p, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fe: FieldErrors = {};
      result.error.errors.forEach((err) => { const f = err.path[0] as keyof FieldErrors; if (!fe[f]) fe[f] = err.message; });
      setErrors(fe);
      return;
    }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(config.redirect);
    }, 1000);
  };

  const inputClass = (field: keyof FieldErrors) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors ${
      errors[field] ? "border-destructive focus:ring-destructive/20 focus:border-destructive" : "border-border focus:ring-primary/20 focus:border-primary"
    }`;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8 animate-fade-up">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${role === "admin" ? "bg-destructive" : "gradient-hero"}`}>
                <config.icon className={`h-6 w-6 ${role === "admin" ? "text-destructive-foreground" : "text-primary-foreground"}`} />
              </div>
            </Link>
            <h1 className="font-display text-3xl font-bold text-foreground">{config.title}</h1>
            <p className="mt-2 text-muted-foreground">{config.subtitle}</p>
          </div>

          <div className="flex rounded-xl border border-border bg-card p-1 gap-1">
            {(["customer", "dealer", "admin"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); setEmail(""); setPassword(""); setErrors({}); }}
                className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors capitalize ${
                  role === r
                    ? r === "admin"
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input id="email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }} onBlur={(e) => validateField("email", e.target.value)} placeholder={config.placeholder} className={inputClass("email")} />
              </div>
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
                {role !== "admin" && (
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }} onBlur={(e) => validateField("password", e.target.value)} placeholder="Enter your password" className={`${inputClass("password")} !pr-12`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
            </div>

            <Button type="submit" size="lg" className="w-full" variant={role === "admin" ? "destructive" : "default"} disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {role !== "admin" && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background px-4 text-muted-foreground">
                    {role === "dealer" ? "New dealer?" : "New to Msitiri?"}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <Link to={`/register?role=${role}`} className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                  {role === "dealer" ? "Register as a dealer" : "Create an account"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          )}
          {role === "admin" && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Admin accounts are created by system administrators.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
