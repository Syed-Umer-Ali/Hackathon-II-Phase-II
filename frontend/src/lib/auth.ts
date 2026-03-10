// frontend/src/lib/auth.ts
// This file will contain the Better Auth integration logic.
// Placeholder for now.

export const signIn = async (email: string, password: string): Promise<string> => {
  // Implement actual sign-in logic with Better Auth here
  console.log('Signing in with:', email, password);
  // Return a dummy token for now
  return 'dummy_jwt_token';
};

export const signUp = async (email: string, password: string): Promise<string> => {
  // Implement actual sign-up logic with Better Auth here
  console.log('Signing up with:', email, password);
  // Return a dummy token for now
  return 'dummy_jwt_token';
};

export const signOut = async (): Promise<void> => {
  // Implement actual sign-out logic with Better Auth here
  console.log('Signing out');
};

export const getToken = (): string | null => {
  // Implement logic to retrieve the stored JWT token
  // For example, from localStorage or a secure cookie
  if (typeof window !== 'undefined') {
    return localStorage.getItem('jwt_token');
  }
  return null;
};

export const setToken = (token: string): void => {
  // Implement logic to store the JWT token
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt_token', token);
  }
};

export const removeToken = (): void => {
  // Implement logic to remove the JWT token
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt_token');
  }
};

export const getUserId = (): string | null => {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || null;
  } catch (e) {
    console.error("Failed to decode JWT:", e);
    return null;
  }
}