// Centralized API base URL configuration for frontend
// Priority:
// 1. VITE_API_BASE (full base, including /api) for backward compatibility
// 2. VITE_BACKEND_URL / REACT_APP_BACKEND_URL (host), with /api appended
// 3. Hardcoded local default (http://localhost:4000/api)

// Core backend URL (host only, no /api)
const backendUrl =
  import.meta.env.VITE_BACKEND_URL ||
  // Guard against process being undefined in the browser (Vite)
  (typeof process !== 'undefined' ? process.env.REACT_APP_BACKEND_URL : undefined) ||
  'http://localhost:4000';

// Final API base, always ending with /api
const normalizedBackendUrl = backendUrl.replace(/\/+$/, '');

export const apiBaseUrl =
  import.meta.env.VITE_API_BASE ||
  `${normalizedBackendUrl}/api`;


