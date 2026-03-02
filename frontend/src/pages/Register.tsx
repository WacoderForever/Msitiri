import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Car, Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, Building, Shield, KeyRound } from "lucide-react";
import { z } from "zod";

type Role = "customer" | "dealer" | "admin";

const customerSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").regex(/^[a-zA-Z ]+$/, "Name must contain only letters and spaces"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().regex(/^\+\d{1,3}\d{6,14}$/, "Phone must start with country code (e.g. +254712345678)"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

const dealerSchema = z.object({
  dealershipName: z.string().trim().min(2, "Dealership name is required"),
  contactName: z.string().trim().min(2, "Contact name is required").regex(/^[a-zA-Z ]+$/, "Name must contain only letters and spaces"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().regex(/^\+\d{1,3}\d{6,14}$/, "Phone must start with country code (e.g. +254712345678)"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

const adminSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").regex(/^[a-zA-Z ]+$/, "Name must contain only letters and spaces"),
  email: z.string().trim().email("Please enter a valid email"),
  adminCode: z.string().trim().min(1, "Admin invitation code is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

type FieldErrors = Record<string, string | undefined>;

const roleSubtitles: Record<Role, string> = {
  customer: "Join Msitiri to find your perfect vehicle",
  dealer: "Register your dealership on Msitiri",
  admin: "Register as a Msitiri administrator",
};

export default function Register() {
  const [searchParams] = useSearchParams();
  const paramRole = searchParams.get("role") as Role | null;
  const initialRole: Role = paramRole === "dealer" ? "dealer" : paramRole === "admin" ? "admin" : "customer";
  const [role, setRole] = useState<Role>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState({ fullName: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [dealerData, setDealerData] = useState({ dealershipName: "", contactName: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [adminData, setAdminData] = useState({ fullName: "", email: "", adminCode: "", password: "", confirmPassword: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (role === "customer") setCustomerData((p) => ({ ...p, [name]: value }));
    else if (role === "dealer") setDealerData((p) => ({ ...p, [name]: value }));
    else setAdminData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const schema = role === "customer" ? customerSchema : role === "dealer" ? dealerSchema : adminSchema;
    const data = role === "customer" ? { ...customerData } : role === "dealer" ? { ...dealerData } : { ...adminData };
    const result = schema.safeParse(data);
    if (!result.success) {
      const fieldError = result.error.errors.find((err) => err.path[0] === name);
      if (fieldError) {
        setErrors((p) => ({ ...p, [name]: fieldError.message }));
      }
    } else {
      setErrors((p) => ({ ...p, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const schema =
    role === "customer"
      ? customerSchema
      : role === "dealer"
      ? dealerSchema
      : adminSchema;

  const data =
    role === "customer"
      ? customerData
      : role === "dealer"
      ? dealerData
      : adminData;

  const result = schema.safeParse(data);

  if (!result.success) {
    const fe: FieldErrors = {};
    result.error.errors.forEach((err) => {
      const f = err.path[0] as string;
      if (!fe[f]) fe[f] = err.message;
    });
    setErrors(fe);
    return;
  }

  setErrors({});
  setIsLoading(true);

  try {
    let payload: any = {};

    if (role === "customer") {
      payload = {
        full_name: customerData.fullName,
        email: customerData.email,
        phone: customerData.phone,
        password: customerData.password,
        confirm_password: customerData.confirmPassword,
        role: "customer",
      };
    }

    if (role === "dealer") {
      payload = {
        dealership_name: dealerData.dealershipName,
        contact_name: dealerData.contactName,
        email: dealerData.email,
        phone: dealerData.phone,
        password: dealerData.password,
        confirm_password: dealerData.confirmPassword,
        role: "dealer",
      };
    }

    if (role === "admin") {
      payload = {
        full_name: adminData.fullName,
        email: adminData.email,
        password: adminData.password,
        confirm_password: adminData.confirmPassword,
        role: "admin",
        admin_code: adminData.adminCode,
      };
    }

    await axios.post(
      "http://127.0.0.1:5000/api/accounts/register/",
      payload
    );

    setIsLoading(false);

    alert("Registration successful!");

    navigate(`/login?role=${role}`);
  } catch (error: any) {
    setIsLoading(false);

    if (error.response && error.response.data) {
      const backendErrors = error.response.data;
      const fe: FieldErrors = {};

      Object.keys(backendErrors).forEach((key) => {
        fe[key] = backendErrors[key][0];
      });

      setErrors(fe);
    } else {
      alert("Network error. Please try again.");
    }
  }
};

  const inputClass = (field: string) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors ${
      errors[field] ? "border-destructive focus:ring-destructive/20 focus:border-destructive" : "border-border focus:ring-primary/20 focus:border-primary"
    }`;

  const nameField = role === "dealer" ? "contactName" : "fullName";
  const nameValue = role === "customer" ? customerData.fullName : role === "dealer" ? dealerData.contactName : adminData.fullName;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8 animate-fade-up">
          {/* Logo */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${role === "admin" ? "bg-destructive" : "gradient-hero"}`}>
                {role === "admin" ? <Shield className="h-6 w-6 text-destructive-foreground" /> : <Car className="h-6 w-6 text-primary-foreground" />}
              </div>
            </Link>
            <h1 className="font-display text-3xl font-bold text-foreground">Create Account</h1>
            <p className="mt-2 text-muted-foreground">{roleSubtitles[role]}</p>
          </div>

          {/* Role Tabs */}
          <div className="flex rounded-xl border border-border bg-card p-1 gap-1">
            {(["customer", "dealer", "admin"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); setErrors({}); }}
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Dealer-only: Dealership Name */}
            {role === "dealer" && (
              <div>
                <label htmlFor="dealershipName" className="block text-sm font-medium text-foreground mb-2">Dealership Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                 <input id="dealershipName" name="dealershipName" value={dealerData.dealershipName} onChange={handleChange} onBlur={handleBlur} placeholder="AutoPrime Motors" className={inputClass("dealershipName")} />
                </div>
                {errors.dealershipName && <p className="mt-1 text-xs text-destructive">{errors.dealershipName}</p>}
              </div>
            )}

            {/* Name field (all roles) */}
            <div>
              <label htmlFor={nameField} className="block text-sm font-medium text-foreground mb-2">
                {role === "dealer" ? "Contact Person" : "Full Name"}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input id={nameField} name={nameField} value={nameValue} onChange={handleChange} onBlur={handleBlur} placeholder="John Kamau" className={inputClass(nameField)} />
              </div>
              {(errors.fullName || errors.contactName) && <p className="mt-1 text-xs text-destructive">{errors.fullName || errors.contactName}</p>}
            </div>

            {/* Email (all roles) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                {role === "dealer" ? "Business Email" : role === "admin" ? "Admin Email" : "Email Address"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input id="email" name="email" type="email" value={role === "customer" ? customerData.email : role === "dealer" ? dealerData.email : adminData.email} onChange={handleChange} onBlur={handleBlur} placeholder={role === "dealer" ? "info@autoprime.co.ke" : role === "admin" ? "admin@msitiri.co.ke" : "you@example.com"} className={inputClass("email")} />
              </div>
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>

            {/* Phone (customer & dealer only) */}
            {role !== "admin" && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input id="phone" name="phone" type="tel" value={role === "dealer" ? dealerData.phone : customerData.phone} onChange={handleChange} onBlur={handleBlur} placeholder="+254712345678" className={inputClass("phone")} />
                </div>
                {errors.phone ? <p className="mt-1 text-xs text-destructive">{errors.phone}</p> : <p className="mt-1 text-xs text-muted-foreground">Include country code, e.g. +254712345678</p>}
              </div>
            )}

            {/* Admin-only: Invitation Code */}
            {role === "admin" && (
              <div>
                <label htmlFor="adminCode" className="block text-sm font-medium text-foreground mb-2">Admin Invitation Code</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input id="adminCode" name="adminCode" value={adminData.adminCode} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your invitation code" className={inputClass("adminCode")} />
                </div>
                {errors.adminCode ? <p className="mt-1 text-xs text-destructive">{errors.adminCode}</p> : <p className="mt-1 text-xs text-muted-foreground">Contact a system administrator for your code</p>}
              </div>
            )}

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input id="password" name="password" type={showPassword ? "text" : "password"} value={role === "customer" ? customerData.password : role === "dealer" ? dealerData.password : adminData.password} onChange={handleChange} onBlur={handleBlur} placeholder="Create a strong password" className={`${inputClass("password")} !pr-12`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password ? <p className="mt-1 text-xs text-destructive">{errors.password}</p> : <p className="mt-1 text-xs text-muted-foreground">Must be at least 8 characters</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input id="confirmPassword" name="confirmPassword" type={showPassword ? "text" : "password"} value={role === "customer" ? customerData.confirmPassword : role === "dealer" ? dealerData.confirmPassword : adminData.confirmPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Confirm your password" className={inputClass("confirmPassword")} />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-destructive">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input id="terms" type="checkbox" required className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary" />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <Button type="submit" size="lg" className="w-full" variant={role === "admin" ? "destructive" : "default"} disabled={isLoading}>
              {isLoading ? "Creating account..." : role === "dealer" ? "Register Dealership" : role === "admin" ? "Register as Admin" : "Create Account"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Footer */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground">Already have an account?</span>
            </div>
          </div>
          <div className="text-center">
            <Link to={`/login?role=${role}`} className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              Sign in instead <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
