import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { UserRole } from '../config/sampleCredentials';

const AUTH_KEY = 'cruise-logistics-auth';
const AUTH_USER_KEY = 'cruise-logistics-auth-user';

export interface AuthUser {
  username: string;
  role: UserRole;
  displayName: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (username: string, role: UserRole, displayName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    return parsed?.username && parsed?.role ? parsed : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = loadStoredUser();
    setUser(stored);
  }, []);

  const isAuthenticated = !!user;

  const login = useCallback((username: string, role: UserRole, displayName: string) => {
    const u: AuthUser = { username, role, displayName };
    setUser(u);
    try {
      localStorage.setItem(AUTH_KEY, 'true');
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(u));
    } catch {
      // ignore
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
