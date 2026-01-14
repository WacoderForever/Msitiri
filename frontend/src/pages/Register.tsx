import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Car, Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { authAPI, storeTokens } from "@/services/api";
import { toast } from "sonner";

// Validation functions
const validateEmail = (email: string): string => {
  if (!email.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address";
  return "";
};

const validatePassword = (password: string): string => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
};

const validatePhone = (phone: string): string => {
  if (phone && !/^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ''))) {
    return "Please enter a valid phone number";
  }
  return "";
};

const validateFullName = (fullName: string): string => {
  if (!fullName.trim()) return "Full name is required";
  return "";
};

const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return "";
};

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Real-time validation effect
  useEffect(() => {
    const newErrors: Record<string, string> = {};
    
    // Only validate touched fields or if validateOnChange is true
    if (touched.fullName || validateOnChange || formData.fullName) {
      newErrors.fullName = validateFullName(formData.fullName);
    }
    
    if (touched.email || validateOnChange || formData.email) {
      newErrors.email = validateEmail(formData.email);
    }
    
    if (touched.phone || validateOnChange || formData.phone) {
      newErrors.phone = validatePhone(formData.phone);
    }
    
    if (touched.password || validateOnChange || formData.password) {
      newErrors.password = validatePassword(formData.password);
    }
    
    if (touched.confirmPassword || validateOnChange || formData.confirmPassword) {
      newErrors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
    }
    
    // Only update if there are actual changes to avoid infinite loops
    const hasChanges = Object.keys(newErrors).some(key => newErrors[key] !== errors[key]);
    if (hasChanges) {
      setErrors(newErrors);
    }
    
    // Check if form is valid for submission
    const isValid = 
      formData.fullName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password !== '' &&
      formData.confirmPassword !== '' &&
      Object.values(newErrors).every(error => error === '');
    
    setIsFormValid(isValid);
  }, [formData, touched, validateOnChange]);

  // Validate individual field (for onBlur and immediate feedback)
  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "fullName":
        error = validateFullName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "password":
        error = validatePassword(value);
        // If password changes, re-validate confirm password
        if (formData.confirmPassword) {
          const confirmError = validateConfirmPassword(value, formData.confirmPassword);
          if (confirmError !== errors.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
          }
        }
        break;
      case "confirmPassword":
        error = validateConfirmPassword(formData.password, value);
        break;
    }

    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Mark field as touched
    if (!touched[name]) {
      setTouched(prev => ({ ...prev, [name]: true }));
    }

    // Validate field immediately if it's been touched or we're in validate-on-change mode
    if (touched[name] || validateOnChange) {
      const error = validateField(name, value);
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
      } else if (errors[name]) {
        // Clear error if validation passes
        setErrors(prev => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    } else if (errors[name]) {
      // Clear error if validation passes
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const splitFullName = (fullName: string) => {
    const names = fullName.trim().split(/\s+/);
    const firstName = names[0] || "";
    const lastName = names.slice(1).join(" ") || firstName;
    return { firstName, lastName };
  };

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: "", color: "bg-gray-200" };
    
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    
    const strengths = [
      { label: "Very Weak", color: "bg-red-500" },
      { label: "Weak", color: "bg-orange-500" },
      { label: "Fair", color: "bg-yellow-500" },
      { label: "Good", color: "bg-blue-500" },
      { label: "Strong", color: "bg-green-500" },
      { label: "Very Strong", color: "bg-green-600" },
    ];
    
    return strengths[Math.min(score, strengths.length - 1)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched to show all errors
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);
    setValidateOnChange(true);
    
    if (!isFormValid) {
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
        phone_number: formData.phone || undefined,
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
        
        // Update field errors based on API response
        const apiErrors: Record<string, string> = {};
        
        if (errorData.email) {
          apiErrors.email = Array.isArray(errorData.email) ? errorData.email[0] : errorData.email;
        }
        if (errorData.password) {
          apiErrors.password = Array.isArray(errorData.password) ? errorData.password[0] : errorData.password;
        }
        if (errorData.phone_number) {
          apiErrors.phone = Array.isArray(errorData.phone_number) ? errorData.phone_number[0] : errorData.phone_number;
        }
        if (errorData.first_name) {
          apiErrors.fullName = Array.isArray(errorData.first_name) ? errorData.first_name[0] : errorData.first_name;
        }
        if (errorData.last_name) {
          const lastNameError = Array.isArray(errorData.last_name) ? errorData.last_name[0] : errorData.last_name;
          apiErrors.fullName = (apiErrors.fullName || "") + " " + lastNameError;
        }
        
        if (Object.keys(apiErrors).length > 0) {
          setErrors(prev => ({ ...prev, ...apiErrors }));
        }
        
        toast.error("Registration failed", {
          description: errorData.detail || "Please check your information and try again.",
        });
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

  // Helper function to check if field has error and is touched
  const shouldShowError = (fieldName: string) => {
    return touched[fieldName] && errors[fieldName];
  };

  // Helper function to check if field is valid (touched and no error)
  const isFieldValid = (fieldName: string) => {
    return touched[fieldName] && !errors[fieldName] && formData[fieldName as keyof typeof formData];
  };

  const passwordStrength = getPasswordStrength(formData.password);

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
                <div className="flex items-center gap-1">
                  {shouldShowError("fullName") && (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  {isFieldValid("fullName") && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {shouldShowError("fullName") && (
                    <span className="text-sm text-destructive">{errors.fullName}</span>
                  )}
                </div>
              </div>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
                  shouldShowError("fullName") ? "text-destructive" : 
                  isFieldValid("fullName") ? "text-green-500" : "text-muted-foreground"
                }`} />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="John Kamau"
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${
                    shouldShowError("fullName")
                      ? "border-destructive focus:border-destructive" 
                      : isFieldValid("fullName")
                      ? "border-green-500 focus:border-green-500"
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
                <div className="flex items-center gap-1">
                  {shouldShowError("email") && (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  {isFieldValid("email") && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {shouldShowError("email") && (
                    <span className="text-sm text-destructive">{errors.email}</span>
                  )}
                </div>
              </div>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
                  shouldShowError("email") ? "text-destructive" : 
                  isFieldValid("email") ? "text-green-500" : "text-muted-foreground"
                }`} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${
                    shouldShowError("email")
                      ? "border-destructive focus:border-destructive" 
                      : isFieldValid("email")
                      ? "border-green-500 focus:border-green-500"
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
                <div className="flex items-center gap-1">
                  {shouldShowError("phone") && (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  {isFieldValid("phone") && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {shouldShowError("phone") && (
                    <span className="text-sm text-destructive">{errors.phone}</span>
                  )}
                </div>
              </div>
              <div className="relative">
                <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
                  shouldShowError("phone") ? "text-destructive" : 
                  isFieldValid("phone") ? "text-green-500" : "text-muted-foreground"
                }`} />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+254 712 345 678"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${
                    shouldShowError("phone")
                      ? "border-destructive focus:border-destructive" 
                      : isFieldValid("phone")
                      ? "border-green-500 focus:border-green-500"
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
                <div className="flex items-center gap-1">
                  {shouldShowError("password") && (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  {isFieldValid("password") && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {shouldShowError("password") && (
                    <span className="text-sm text-destructive">{errors.password}</span>
                  )}
                </div>
              </div>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
                  shouldShowError("password") ? "text-destructive" : 
                  isFieldValid("password") ? "text-green-500" : "text-muted-foreground"
                }`} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Create a strong password"
                  required
                  minLength={6}
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${
                    shouldShowError("password")
                      ? "border-destructive focus:border-destructive" 
                      : isFieldValid("password")
                      ? "border-green-500 focus:border-green-500"
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
              
              {/* Password strength indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">Password strength</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength.label === "Very Weak" || passwordStrength.label === "Weak" 
                        ? "text-destructive" 
                        : "text-green-600"
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ 
                        width: `${(passwordStrength.label === "Very Weak" ? 20 : 
                                 passwordStrength.label === "Weak" ? 40 :
                                 passwordStrength.label === "Fair" ? 60 :
                                 passwordStrength.label === "Good" ? 80 : 100)}%` 
                      }}
                    />
                  </div>
                </div>
              )}
              
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
                <div className="flex items-center gap-1">
                  {shouldShowError("confirmPassword") && (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  {isFieldValid("confirmPassword") && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {shouldShowError("confirmPassword") && (
                    <span className="text-sm text-destructive">{errors.confirmPassword}</span>
                  )}
                </div>
              </div>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
                  shouldShowError("confirmPassword") ? "text-destructive" : 
                  isFieldValid("confirmPassword") ? "text-green-500" : "text-muted-foreground"
                }`} />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm your password"
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors ${
                    shouldShowError("confirmPassword")
                      ? "border-destructive focus:border-destructive" 
                      : isFieldValid("confirmPassword")
                      ? "border-green-500 focus:border-green-500"
                      : "border-border focus:border-primary"
                  }`}
                />
              </div>
              {/* Password match indicator */}
              {formData.password && formData.confirmPassword && (
                <p className={`mt-1 text-xs flex items-center gap-1 ${
                  formData.password === formData.confirmPassword 
                    ? 'text-green-600' 
                    : 'text-destructive'
                }`}>
                  {formData.password === formData.confirmPassword ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  {formData.password === formData.confirmPassword 
                    ? 'Passwords match' 
                    : 'Passwords do not match'}
                </p>
              )}
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
              disabled={isLoading || !isFormValid}
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
            
            {/* Form validation status */}
            {!isFormValid && Object.keys(touched).length > 0 && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Please fix all errors before submitting
                </p>
              </div>
            )}
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