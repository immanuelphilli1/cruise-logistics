import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import logo from '../assets/logos/cruise-logo.png';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/car-rentals', label: 'Car Rentals' },
  { to: '/motorbike-leasing', label: 'Motorbike Leasing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? 'border-b border-white/5 bg-transparent text-white'
          : 'border-b border-army-green/10 bg-white/95 text-primary-black backdrop-blur-sm'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link to="/" className="font-heading text-xl font-semibold text-bronze-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary-black">
          <img src={logo} alt="Fleet Kings" className="h-18 w-32" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-medium transition-colors hover:text-bronze-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary-black rounded ${location.pathname === to ? 'text-bronze-gold' : ''}`}
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="primary">Sign In</Button>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 lg:hidden">
          
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="rounded p-2 text-metallic-brown hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-gold"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`border-t border-white/10 bg-primary-black lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        role="region"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-md px-4 py-3 text-sm font-medium ${location.pathname === to ? 'bg-bronze-gold/20 text-bronze-gold' : 'text-white hover:bg-white/5'}`}
            >
              {label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
            
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
