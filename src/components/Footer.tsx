import { Link } from 'react-router-dom';
import { DottedSurface } from './DottedSurface';
import logo from '../assets/logos/cruise-logo.png';

const footerLinks = {
  services: [
    { to: '/car-rentals', label: 'Car Rentals' },
    { to: '/motorbike-leasing', label: 'Motorbike Leasing' },
    { to: '/how-it-works', label: 'How It Works' },
  ],
  company: [
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
    { to: '/faq', label: 'FAQ' },
  ],
  legal: [
    { to: '/rules-requirements', label: 'Rules & Requirements' },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 overflow-hidden bg-primary-black" role="contentinfo">
      <DottedSurface theme="dark" className="absolute inset-0 z-0" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="font-heading text-lg font-semibold text-metallic-brown focus:outline-none focus-visible:ring-2 focus-visible:ring-metallic-brown rounded">
              <img src={logo} alt="Cruise Logistics" className="h-14 w-20" />
            </Link>
            <p className="mt-3 text-sm text-text-muted">
              Premium car rentals and motorbike leasing for individuals and businesses.
            </p>
          </div>
          <div className='pt-4 lg:pt-0'>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-metallic-brown">Services</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.services.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-white hover:text-metallic-brown focus:outline-none focus-visible:ring-2 focus-visible:ring-metallic-brown rounded">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-metallic-brown">Company</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-white hover:text-metallic-brown focus:outline-none focus-visible:ring-2 focus-visible:ring-metallic-brown rounded">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-metallic-brown">Legal</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-white hover:text-metallic-brown focus:outline-none focus-visible:ring-2 focus-visible:ring-metallic-brown rounded">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Cruise Logistics. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
