// frontend/src/lib/api.ts
// This file will contain the API client utility for backend communication.
// It will automatically include the JWT token in requests.

import { getToken, removeToken } from './auth';

let baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api/v1';
if (baseUrl && !baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
  baseUrl = `https://${baseUrl}`;
}

// Ensure the baseUrl ends with /api/v1 since all backend routes use this prefix
if (baseUrl && !baseUrl.endsWith('/api/v1')) {
  baseUrl = baseUrl.replace(/\/$/, '') + '/api/v1';
}

const API_BASE_URL = baseUrl;

async function fetchApi(
  endpoint: string,
  options?: RequestInit
): Promise<Response> {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options?.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    const errorMessage = errorData.detail || errorData.message || 'Something went wrong';

    // Handle unauthorized or expired tokens
    if (response.status === 401 || errorMessage.includes('Signature has expired')) {
      if (typeof window !== 'undefined') {
        removeToken();
        window.location.href = '/login?error=session_expired';
      }
    }

    throw new Error(errorMessage);
  }

  return response;
}

export const api = {
  get: async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    const response = await fetchApi(endpoint, { ...options, method: 'GET' });
    return response.json();
  },

  post: async <T>(endpoint: string, data: any, options?: RequestInit): Promise<T> => {
    const response = await fetchApi(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  put: async <T>(endpoint: string, data: any, options?: RequestInit): Promise<T> => {
    const response = await fetchApi(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  patch: async <T>(endpoint: string, data: any, options?: RequestInit): Promise<T> => {
    const response = await fetchApi(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    const response = await fetchApi(endpoint, { ...options, method: 'DELETE' });
    // Assuming delete might return no content, or a confirmation message
    if (response.status === 204) {
      return {} as T; // Return empty object for no content
    }
    return response.json();
  },
};