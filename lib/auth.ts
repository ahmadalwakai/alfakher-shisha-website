import { createHash } from "crypto";

const COOKIE_NAME = "admin_token";

// Hash password using SHA-256
export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

// Validate email against env variable
export function validateEmail(email: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.error("ADMIN_EMAIL not set in environment");
    return false;
  }
  return email.toLowerCase() === adminEmail.toLowerCase();
}

// Validate password against env variable
export function validatePassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error("ADMIN_PASSWORD not set in environment");
    return false;
  }
  return password === adminPassword;
}

// Validate both email and password
export function validateCredentials(email: string, password: string): boolean {
  return validateEmail(email) && validatePassword(password);
}

// Generate token from password
export function generateToken(): string {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD not set");
  }
  return hashPassword(adminPassword);
}

// Validate token
export function validateToken(token: string): boolean {
  try {
    const expectedToken = generateToken();
    return token === expectedToken;
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
