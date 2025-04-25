// Configuration file for API URLs and other environment-specific settings

// Default to localhost for development, use environment variable in production
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export default {
  API_BASE_URL
}; 