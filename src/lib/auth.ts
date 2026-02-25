// Simple authentication for admin
// In production, use proper authentication like NextAuth.js

// IMPORTANT: Change these credentials!
const ADMIN_EMAIL = "admin@towhidul.com";
const ADMIN_PASSWORD = "admin123"; // Change this to a secure password!

export function validateCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export const AUTH_COOKIE_NAME = "admin_session";
export const AUTH_COOKIE_VALUE = "authenticated_towhidul_2026";
