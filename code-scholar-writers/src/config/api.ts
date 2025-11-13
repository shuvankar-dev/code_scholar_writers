// API Configuration
// Automatically detects environment and uses appropriate API

// Detect current environment
const isLocalhost = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1' ||
                   window.location.hostname === '';

// API Base URLs
const API_CONFIG = {
  // Local development URL (your XAMPP)
  local: 'http://localhost/codescholarwriters-api',
  
  // Production URL (update with your actual domain)
  production: 'https://codescholarwriters.com/codescholarwriters-api'
  
  // Alternative: if your API is in a different location on production
  // production: 'https://your-domain.com/api',
};

// FOR DEBUGGING: Force local for now
export const API_BASE_URL = API_CONFIG.local; // Always use local XAMPP

// Automatically choose based on environment (uncomment when ready):
// export const API_BASE_URL = isLocalhost ? API_CONFIG.local : API_CONFIG.production;

// Manual override for testing:
// export const API_BASE_URL = API_CONFIG.production; // Force production

// Debug log (remove in production)
console.log('Environment:', isLocalhost ? 'LOCAL' : 'PRODUCTION');
console.log('API_BASE_URL:', API_BASE_URL);

// Helper function to construct full API URLs
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

// Commonly used API endpoints
export const API_ENDPOINTS = {
  // FAQ endpoints - Testing both paths
  GET_FAQS: 'get_faqs.php',           // Try root first
  GET_FAQS_ADMIN: 'faq/get_faqs.php', // Admin version in faq folder
  CREATE_FAQ: 'faq/create_faq.php',
  UPDATE_FAQ: 'faq/update_faq.php',
  DELETE_FAQ: 'faq/delete_faq.php',
  
  // Blog endpoints
  GET_BLOGS: 'get_blogs.php',
  GET_BLOG_BY_SLUG: 'get_blog_by_slug.php',
  CREATE_BLOG: 'blog/create_blog.php',
  UPDATE_BLOG: 'blog/update_blog.php',
  DELETE_BLOG: 'blog/delete_blog.php',
  
  // Admin endpoints
  ADMIN_LOGIN: 'admin/login.php',
  ADMIN_REGISTER: 'admin/register.php',
  GET_ORDERS: 'admin/get_orders.php',
  GET_PRICES: 'admin/get_prices.php',
  UPDATE_PRICES: 'admin/update_prices.php',
  
  // Order endpoints
  CREATE_ORDER: 'create_order.php',
  GET_MASTER_PRICES: 'get_master_prices.php',
};

export default API_BASE_URL;