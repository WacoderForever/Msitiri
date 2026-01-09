import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Car, Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone } from "lucide-react";
import { authAPI, storeTokens } from "@/services/api";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "", // Will split into first_name and last_name
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const splitFullName = (fullName: string) => {
    const names = fullName.trim().split(/\s+/);
    const firstName = names[0] || "";
    const lastName = names.slice(1).join(" ") || firstName; // Use first name as last name if only one name provided
    return { firstName, lastName };
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (optional but if provided, validate format)
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Split full name into first and last name
      const { firstName, lastName } = splitFullName(formData.fullName);
      
      // Prepare data for Django API
      const registrationData = {
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        first_name: firstName,
        last_name: lastName,
        phone_number: formData.phone || undefined, // Make it optional
      };

      console.log("Sending registration data:", registrationData);

      // Call Django API
      const response = await authAPI.register(registrationData);
      
      // Store tokens and user data
      const { access, refresh, user } = response;
      storeTokens(access, refresh);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Show success message
      toast.success("Account created successfully! 🎉", {
        description: `Welcome to Msitiri, ${user.first_name}!`,
      });
      
      // Redirect to home page after a brief delay
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error: any) {
      console.error("Registration error:", error);
      
      // Handle different types of errors
      if (error.response?.data) {
        const errorData = error.response.data;
        
        // Handle field-specific errors from Django
        if (errorData.email) {
          setErrors(prev => ({ ...prev, email: errorData.email[0] }));
          toast.error("Registration failed", {
            description: errorData.email[0],
          });
        } else if (errorData.password) {
          setErrors(prev => ({ ...prev, password: errorData.password[0] }));
          toast.error("Registration failed", {
            description: errorData.password[0],
          });
        } else if (errorData.detail) {
          toast.error("Registration failed", {
            description: errorData.detail,
          });
        } else if (errorData.non_field_errors) {
          toast.error("Registration failed", {
            description: errorData.non_field_errors[0],
          });
        } else {
          // Generic error handling
          toast.error("Registration failed", {
            description: "Please check your information and try again.",
          });
        }
      } else if (error.request) {
        // Network error
        toast.error("Network Error", {
          description: "Unable to connect to the server. Please check your connection.",
        });
      } else {
        // Other errors
        toast.error("Registration Error", {
          description: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8 animate-fade-up">
          {/* Logo */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-hero">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
            </Link>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Create Account
            </h1>
            <p className="mt-2 text-muted-foreground">
              Join Msitiri to find your perfect vehicle
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Full Name */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground">
                  Full Name
                </label>
                {errors.fullName && (
                  <span className="text-sm text-destructive">{errors.fullName}</span>
                )}
              </div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Kamau"
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${
                    errors.fullName 
                      ? "border-destructive focus:border-destructive" 
                      : "border-border focus:border-primary"
                  }`}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Enter your first and last name
              </p>
            </div>

            {/* Email */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email Address
                </label>
                {errors.email && (
                  <span className="text-sm text-destructive">{errors.email}</span>
                )}
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${
                    errors.email 
                      ? "border-destructive focus:border-destructive" 
                      : "border-border focus:border-primary"
                  }`}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                  Phone Number
                </label>
                {errors.phone && (
                  <span className="text-sm text-destructive">{errors.phone}</span>
                )}
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+254 712 345 678"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${
                    errors.phone 
                      ? "border-destructive focus:border-destructive" 
                      : "border-border focus:border-primary"
                  }`}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Optional - include country code
              </p>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                {errors.password && (
                  <span className="text-sm text-destructive">{errors.password}</span>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  minLength={6}
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${
                    errors.password 
                      ? "border-destructive focus:border-destructive" 
                      : "border-border focus:border-primary"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Must be at least 6 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                  Confirm Password
                </label>
                {errors.confirmPassword && (
                  <span className="text-sm text-destructive">{errors.confirmPassword}</span>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${
                    errors.confirmPassword 
                      ? "border-destructive focus:border-destructive" 
                      : "border-border focus:border-primary"
                  }`}
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-2">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              Sign in instead
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}