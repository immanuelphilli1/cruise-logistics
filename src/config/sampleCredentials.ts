/**
 * Sample login credentials for development/demo.
 * Replace with real auth (e.g. API) in production.
 */

export type UserRole = 'admin' | 'business' | 'patron';
export const DYNAMIC_USERS_KEY = 'cruise-logistics-dynamic-users';

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

function loadDynamicUsers(): SampleUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(DYNAMIC_USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SampleUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getDynamicUsers(): SampleUser[] {
  return loadDynamicUsers();
}

export function addDynamicUser(user: SampleUser): void {
  if (typeof window === 'undefined') return;
  const existing = loadDynamicUsers();
  const deduped = existing.filter(
    (u) => u.username.toLowerCase() !== user.username.toLowerCase()
  );
  deduped.push(user);
  window.localStorage.setItem(DYNAMIC_USERS_KEY, JSON.stringify(deduped));
}

export function validateCredentials(
  username: string,
  password: string
): SampleUser | null {
  const u = username.trim();
  const p = password;
  const allUsers = [...SAMPLE_CREDENTIALS, ...loadDynamicUsers()];
  return (
    allUsers.find(
      (c) => c.username.toLowerCase() === u.toLowerCase() && c.password === p
    ) ?? null
  );
}
