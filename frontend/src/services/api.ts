import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// API configuration
const API_URL = 'http://localhost:5000/api'; // Django runs on port 5000

// Extend the Axios request config to include _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Type definitions
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  is_verified: boolean;
  date_joined: string;
}

export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
}

export interface ApiError {
  detail?: string;
  email?: string[];
  password?: string[];
  confirm_password?: string[];
  first_name?: string[];
  last_name?: string[];
  phone_number?: string[];
  non_field_errors?: string[];
  [key: string]: any;
}

// Token management functions
export const getAccessToken = (): string | null => {
  const token = localStorage.getItem('access_token');
  console.log('🔑 Getting access token:', token ? `${token.substring(0, 30)}...` : 'Not found');
  return token;
};

export const getRefreshToken = (): string | null => {
  const token = localStorage.getItem('refresh_token');
  console.log('🔄 Getting refresh token:', token ? `${token.substring(0, 30)}...` : 'Not found');
  return token;
};

export const getUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const storeTokens = (access: string, refresh: string): void => {
  console.log('💾 Storing tokens:', {
    accessLength: access.length,
    refreshLength: refresh.length,
    accessPreview: access.substring(0, 30) + '...',
    refreshPreview: refresh.substring(0, 30) + '...',
  });
  
  // Clean tokens
  const cleanAccess = access.trim();
  const cleanRefresh = refresh.trim();
  
  localStorage.setItem('access_token', cleanAccess);
  localStorage.setItem('refresh_token', cleanRefresh);
  api.defaults.headers.common['Authorization'] = `Bearer ${cleanAccess}`;
  
  console.log('✅ Tokens stored successfully');
  
  // Verify storage
  const storedAccess = localStorage.getItem('access_token');
  const storedRefresh = localStorage.getItem('refresh_token');
  console.log('🔍 Storage verification:', {
    accessMatches: storedAccess === cleanAccess,
    refreshMatches: storedRefresh === cleanRefresh,
  });
};

export const storeUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
  console.log('👤 User stored:', user.email);
};

export const clearTokens = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  delete api.defaults.headers.common['Authorization'];
  console.log('🗑️ Tokens cleared');
};

export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  if (!token) {
    console.log('🔐 No token found - not authenticated');
    return false;
  }
  
  // Check if token is expired
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    const authenticated = !isExpired;
    console.log('🔐 Authentication check:', {
      userId: payload.user_id,
      expires: new Date(payload.exp * 1000),
      isExpired,
      authenticated,
    });
    return authenticated;
  } catch {
    console.log('🔐 Token decode failed - not authenticated');
    return false;
  }
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Add Authorization header if token exists
    const token = getAccessToken();
    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('🔐 Added Authorization header to request:', config.url);
    } else if (!token) {
      console.log('⚠️ No token found for request:', config.url);
    }
    
    // Log request for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, {
        data: config.data,
        headers: config.headers,
      });
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
api.interceptors.response.use(
  (response) => {
    // Log response for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ ${response.status} ${response.config.url}`, response.data);
    }
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    // Cast to custom type to include _retry property
    const originalRequest = error.config as CustomAxiosRequestConfig;
    
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    
    // Handle 401 Unauthorized - try to refresh token
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Skip token refresh for login/register endpoints
      if (originalRequest.url?.includes('/auth/login/') || 
          originalRequest.url?.includes('/auth/register/')) {
        console.log('⚠️ Skipping token refresh for auth endpoints');
        return Promise.reject(error);
      }
      
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        
        console.log('🔄 Attempting token refresh...');
        
        // Call refresh token endpoint
        const refreshResponse = await axios.post<{ access: string }>(
          `${API_URL}/token/refresh/`,
          { refresh: refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );
        
        const newAccessToken = refreshResponse.data.access;
        console.log('✅ Token refreshed successfully');
        
        // Store new token
        localStorage.setItem('access_token', newAccessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        
        // Update original request headers
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }
        
        // Retry original request with new token
        return api(originalRequest);
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        
        // Clear tokens and redirect to login
        clearTokens();
        
        // Only redirect if we're not already on login page
        if (!window.location.pathname.includes('/login')) {
          console.log('🔀 Redirecting to login page...');
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    // Handle other errors
    if (error.response?.status === 403) {
      console.error('⛔ Access forbidden');
    } else if (error.response?.status === 404) {
      console.error('🔍 Resource not found');
    } else if (error.response?.status === 500) {
      console.error('💥 Server error');
    } else if (!error.response) {
      console.error('📡 Network error - please check your connection');
    }
    
    return Promise.reject(error);
  }
);

// Auth API calls with enhanced debugging
export const authAPI = {
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    console.log('📝 Register API called:', { email: userData.email });
    
    try {
      const response = await api.post<AuthResponse>('/auth/register/', userData);
      
      console.log('✅ Register response:', {
        status: response.status,
        hasAccessToken: !!response.data.access,
        hasRefreshToken: !!response.data.refresh,
        accessTokenLength: response.data.access?.length,
        userEmail: response.data.user?.email,
      });
      
      // Auto-store tokens after registration
      const { access, refresh, user } = response.data;
      storeTokens(access, refresh);
      storeUser(user);
      
      return response.data;
    } catch (error: any) {
      console.error('❌ Register API error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },
  
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    console.log('🔑 Login API called:', { email: credentials.email });
    
    try {
      const response = await api.post<AuthResponse>('/auth/login/', credentials);
      
      console.log('✅ Login response:', {
        status: response.status,
        hasAccessToken: !!response.data.access,
        hasRefreshToken: !!response.data.refresh,
        accessTokenLength: response.data.access?.length,
        accessTokenPreview: response.data.access?.substring(0, 30) + '...',
        userEmail: response.data.user?.email,
      });
      
      // Auto-store tokens after login
      const { access, refresh, user } = response.data;
      storeTokens(access, refresh);
      storeUser(user);
      
      console.log('🎉 Login successful!');
      
      return response.data;
    } catch (error: any) {
      console.error('❌ Login API error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },
  
  logout: async (): Promise<void> => {
    console.log('🚪 Logout called');
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        await api.post('/auth/logout/', { refresh: refreshToken });
        console.log('✅ Logout API call successful');
      } catch (error) {
        console.warn('⚠️ Logout API call failed, but clearing local tokens anyway:', error);
      }
    } else {
      console.log('⚠️ No refresh token found for logout API call');
    }
    
    // Always clear local tokens
    clearTokens();
  },
  
  getProfile: async (): Promise<User> => {
    console.log('👤 Getting user profile...');
    
    try {
      const response = await api.get<{ user: User }>('/auth/profile/');
      console.log('✅ Profile retrieved:', response.data.user.email);
      return response.data.user;
    } catch (error: any) {
      console.error('❌ Get profile error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },
  
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put<{ user: User }>('/auth/profile/', userData);
    storeUser(response.data.user);
    return response.data.user;
  },
};

// Vehicle API calls (to be implemented later)
export const vehicleAPI = {
  getAllVehicles: async (params?: any) => {
    const response = await api.get('/vehicles/', { params });
    return response.data;
  },
  
  getVehicleById: async (id: string) => {
    const response = await api.get(`/vehicles/${id}/`);
    return response.data;
  },
  
  getPopularVehicles: async () => {
    const response = await api.get('/vehicles/popular/');
    return response.data;
  },
  
  searchVehicles: async (filters: any) => {
    const response = await api.get('/vehicles/search/', { params: filters });
    return response.data;
  },
};

// Booking API calls (to be implemented later)
export const bookingAPI = {
  createBooking: async (bookingData: any) => {
    const response = await api.post('/bookings/', bookingData);
    return response.data;
  },
  
  getUserBookings: async () => {
    const response = await api.get('/bookings/user/');
    return response.data;
  },
  
  getBookingById: async (id: string) => {
    const response = await api.get(`/bookings/${id}/`);
    return response.data;
  },
  
  cancelBooking: async (id: string) => {
    const response = await api.post(`/bookings/${id}/cancel/`);
    return response.data;
  },
};

// Utility functions
export const checkHealth = async (): Promise<{ status: string; service: string }> => {
  const response = await api.get('/health/');
  return response.data;
};

export const setupAxios = (): void => {
  // Initialize Authorization header if token exists
  const token = getAccessToken();
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('🔧 Axios initialized with token');
  } else {
    console.log('🔧 Axios initialized without token');
  }
};

// Debug function to check auth status
export const debugAuth = (): void => {
  const token = getAccessToken();
  let decodedToken = null;
  
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      decodedToken = {
        userId: payload.user_id,
        expires: new Date(payload.exp * 1000),
        tokenType: payload.token_type,
      };
    } catch (e) {
      decodedToken = { error: 'Cannot decode' };
    }
  }
  
  console.log('=== 🔍 Auth Debug Info ===');
  console.log('API URL:', API_URL);
  console.log('Access Token:', token ? `✓ Present (${token.length} chars)` : '✗ Missing');
  console.log('Access Token Preview:', token ? `${token.substring(0, 50)}...` : 'N/A');
  console.log('Refresh Token:', getRefreshToken() ? '✓ Present' : '✗ Missing');
  console.log('User:', getUser());
  console.log('Decoded Token:', decodedToken);
  console.log('Authenticated:', isAuthenticated());
  console.log('LocalStorage keys:', Object.keys(localStorage));
  console.log('========================');
};

// Initialize on import
setupAxios();

export default api;