/**
 * Centralized API configuration for the frontend.
 * This ensures switching between local dev and Tailscale production server is easy.
 */

// Replace this with the Tailscale IP of your old laptop (server)
const TAILSCALE_SERVER_IP = "YOUR_TAILSCALE_IP"; 

const getApiBaseUrl = () => {
  // If we are in development mode on the same machine, use localhost
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return "http://localhost:4000/api";
  }

  // Otherwise, use the Tailscale IP of the server laptop
  return `http://${TAILSCALE_SERVER_IP}:4000/api`;
};

export const API_BASE_URL = getApiBaseUrl();
