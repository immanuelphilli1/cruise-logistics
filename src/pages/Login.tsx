import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { validateCredentials } from '../config/sampleCredentials';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const username = (form.elements.namedItem('username') as HTMLInputElement)?.value?.trim() ?? '';
    const password = (form.elements.namedItem('password') as HTMLInputElement)?.value ?? '';
    const user = validateCredentials(username, password);
    if (user) {
      login(user.username, user.role, user.displayName);
      navigate(from, { replace: true });
    } else {
      setError('Invalid username or password. Use one of the sample credentials.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Log in – Cruise Logistics</title>
        <meta name="description" content="Log in to your Cruise Logistics account to manage bookings and preferences." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="min-h-[80vh] flex items-center justify-center bg-neutral-50 px-4 py-24">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h1 className="font-heading text-3xl font-bold text-primary-black">Log in</h1>
            <p className="mt-2 text-neutral-600">
              Sign in to manage your account and access the dashboard.
            </p>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-primary-black">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  autoComplete="username"
                  className="mt-2 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-primary-black placeholder:text-neutral-400 focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                  placeholder="Your username"
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-primary-black">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  className="mt-2 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-primary-black placeholder:text-neutral-400 focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" variant="primary" className="w-full">
                Log in
              </Button>
            </form>
            <div className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs text-neutral-600">
              <p className="font-medium text-primary-black mb-2">Sample credentials:</p>
              <ul className="space-y-1">
                <li><strong>Admin:</strong> admin / Admin@123</li>
                <li><strong>Business patron:</strong> business / Business@123</li>
                <li><strong>Patron:</strong> patron / Patron@123</li>
              </ul>
            </div>
            <p className="mt-6 text-center text-sm text-neutral-600">
              New accounts are created by our team.{' '}
              <Link to="/contact" className="text-bronze-gold font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-gold rounded">
                Contact us
              </Link>
              {' '}to get onboarded.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
