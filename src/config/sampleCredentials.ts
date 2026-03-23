/**
 * Sample login credentials for development/demo.
 * Replace with real auth (e.g. API) in production.
 */

export type UserRole = 'admin' | 'business' | 'patron';

export interface SampleUser {
  username: string;
  password: string;
  role: UserRole;
  displayName: string;
}

/** Sample credentials: Admin, Business patron, Patron */
export const SAMPLE_CREDENTIALS: SampleUser[] = [
  {
    username: 'admin',
    password: 'Admin@123',
    role: 'admin',
    displayName: 'Admin',
  },
  {
    username: 'business',
    password: 'Business@123',
    role: 'business',
    displayName: 'Business Patron',
  },
  {
    username: 'patron',
    password: 'Patron@123',
    role: 'patron',
    displayName: 'Patron',
  },
];

export function validateCredentials(
  username: string,
  password: string
): SampleUser | null {
  const u = username.trim();
  const p = password;
  return (
    SAMPLE_CREDENTIALS.find(
      (c) => c.username.toLowerCase() === u.toLowerCase() && c.password === p
    ) ?? null
  );
}
