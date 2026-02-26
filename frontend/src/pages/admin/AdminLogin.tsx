import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FieldErrors = Partial<Record<"email" | "password", string>>;

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      navigate("/admin");
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
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive">
                <Shield className="h-6 w-6 text-destructive-foreground" />
              </div>
            </Link>
            <h1 className="font-display text-3xl font-bold text-foreground">Admin Login</h1>
            <p className="mt-2 text-muted-foreground">Access the Msitiri admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input id="email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }} onBlur={(e) => validateField("email", e.target.value)} placeholder="admin@msitiri.co.ke" className={inputClass("email")} />
              </div>
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }} onBlur={(e) => validateField("password", e.target.value)} placeholder="Enter admin password" className={`${inputClass("password")} !pr-12`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
            </div>

            <Button type="submit" variant="destructive" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Access Admin Panel"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Admin accounts are created by system administrators. <Link to="/login" className="text-primary hover:underline">Customer login</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
