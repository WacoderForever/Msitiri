import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Car, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { authAPI } from "@/services/api";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      // Prepare data for Django API
      const loginData = {
        email: email.trim(),
        password: password,
      };

      console.log("Sending login request:", loginData);

      // Call Django API - authAPI.login returns data directly
      const { user } = await authAPI.login(loginData);
      
      // Note: storeTokens is already called inside authAPI.login
      // User is also automatically stored
      
      // Show success message
      toast.success("Login successful! 🎉", {
        description: `Welcome back, ${user.first_name}!`,
      });
      
      // Redirect to home page after a brief delay
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error: any) {
      console.error("Login error:", error);
      
      // Handle different types of errors
      if (error.response?.data) {
        const errorData = error.response.data;
        
        // Handle field-specific errors from Django
        if (errorData.email) {
          setErrors(prev => ({ ...prev, email: errorData.email[0] }));
          toast.error("Login failed", {
            description: errorData.email[0],
          });
        } else if (errorData.password) {
          setErrors(prev => ({ ...prev, password: errorData.password[0] }));
          toast.error("Login failed", {
            description: errorData.password[0],
          });
        } else if (errorData.detail) {
          toast.error("Login failed", {
            description: errorData.detail,
          });
        } else if (errorData.non_field_errors) {
          const errorMsg = errorData.non_field_errors[0];
          toast.error("Login failed", {
            description: errorMsg,
          });
          if (errorMsg.toLowerCase().includes("email")) {
            setErrors(prev => ({ ...prev, email: errorMsg }));
          } else if (errorMsg.toLowerCase().includes("password")) {
            setErrors(prev => ({ ...prev, password: errorMsg }));
          }
        } else {
          // Generic error handling
          toast.error("Login failed", {
            description: "Invalid email or password.",
          });
        }
      } else if (error.request) {
        // Network error
        toast.error("Network Error", {
          description: "Unable to connect to the server. Please check your connection.",
        });
      } else {
        // Other errors
        toast.error("Login Error", {
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
              Welcome Back
            </h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to your Msitiri account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                  }}
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="password" className="block text-sm font-medium text-foreground">
                    Password
                  </label>
                  {errors.password && (
                    <span className="text-sm text-destructive">{errors.password}</span>
                  )}
                </div>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                  }}
                  placeholder="Enter your password"
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
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="remember" className="text-sm text-muted-foreground">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
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
                New to Msitiri?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              Create an account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}