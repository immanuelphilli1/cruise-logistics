import { type HTMLAttributes, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { Button } from './Button';

type InfoIconType = 'website' | 'phone' | 'address';

function InfoIcon({ type }: { type: InfoIconType }) {
  const icons: Record<InfoIconType, React.ReactNode> = {
    website: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-bronze-gold shrink-0">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" x2="22" y1="12" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-bronze-gold shrink-0">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    address: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-bronze-gold shrink-0">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  };
  return <div className="mr-2 shrink-0">{icons[type]}</div>;
}

export interface HeroSectionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  logo?: {
    url: string;
    alt: string;
    text?: string;
  };
  slogan?: string;
  title: React.ReactNode;
  subtitle: string;
  callToAction: {
    text: string;
    href: string;
  };
  callToActionSecondary?: {
    text: string;
    href: string;
  };
  backgroundImage: string;
  contactInfo: {
    website: string;
    phone: string;
    address: string;
  };
  variant?: 'dark' | 'light';
}

export const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className = '',
      logo,
      slogan,
      title,
      subtitle,
      callToAction,
      callToActionSecondary,
      backgroundImage,
      contactInfo,
      variant = 'dark',
    },
    ref
  ) => {
    const isLight = variant === 'light';
    const sectionClass = isLight
      ? 'bg-neutral-100 text-primary-black'
      : 'bg-primary-black text-white';
    const headingClass = isLight ? 'text-primary-black' : 'text-white';
    const mutedClass = isLight ? 'text-neutral-600' : 'text-text-muted';
    const accentBarClass = isLight ? 'bg-bronze-gold' : 'bg-metallic-brown';
    const logoTextClass = isLight ? 'text-primary-black' : 'text-white';

    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    };

    const itemVariants: Variants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: 'easeOut' as const,
        },
      },
    };

    return (
      <motion.section
        ref={ref}
        className={`relative flex w-full flex-col overflow-hidden md:flex-row ${sectionClass} ${className}`.trim()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
      >
        {/* Left: Content */}
        <div className="flex w-full flex-col justify-between p-8 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16">
          <div>
            <motion.header className="mb-12" variants={itemVariants}>
              {logo && (
                <div className="flex items-center">
                  <img src={logo.url} alt={logo.alt} className="mr-3 h-8 w-auto object-contain" />
                  <div>
                    {logo.text && <p className={`font-heading text-lg font-bold ${logoTextClass}`}>{logo.text}</p>}
                    {slogan && <p className={`text-xs tracking-wider ${mutedClass}`}>{slogan}</p>}
                  </div>
                </div>
              )}
            </motion.header>

            <motion.main variants={containerVariants}>
              <motion.h2 className={`font-heading text-4xl font-bold leading-tight md:text-5xl ${headingClass}`} variants={itemVariants}>
                {title}
              </motion.h2>
              <motion.div className={`my-6 h-1 w-20 ${accentBarClass}`} variants={itemVariants} aria-hidden="true" />
              <motion.p className={`mb-8 max-w-md text-base ${mutedClass}`} variants={itemVariants}>
                {subtitle}
              </motion.p>
              <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
                {callToAction.href.startsWith('/') ? (
                  <Link to={callToAction.href}>
                    <Button variant="primary">{callToAction.text}</Button>
                  </Link>
                ) : (
                  <a href={callToAction.href}>
                    <Button variant="primary">{callToAction.text}</Button>
                  </a>
                )}
                {callToActionSecondary && (
                  callToActionSecondary.href.startsWith('/') ? (
                    <Link to={callToActionSecondary.href}>
                      <Button variant="secondary">{callToActionSecondary.text}</Button>
                    </Link>
                  ) : (
                    <a href={callToActionSecondary.href}>
                      <Button variant="secondary">{callToActionSecondary.text}</Button>
                    </a>
                  )
                )}
              </motion.div>
            </motion.main>
          </div>

          <motion.footer className="mt-12 w-full" variants={itemVariants}>
            <div className={`grid grid-cols-1 gap-6 text-xs sm:grid-cols-3 ${mutedClass}`}>
              <div className="flex items-center">
                <InfoIcon type="website" />
                <span>{contactInfo.website}</span>
              </div>
              <div className="flex items-center">
                <InfoIcon type="phone" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <InfoIcon type="address" />
                <span>{contactInfo.address}</span>
              </div>
            </div>
          </motion.footer>
        </div>

        {/* Right: Image with clip path */}
        <motion.div
          className="min-h-[300px] w-full bg-cover bg-center md:min-h-full md:w-1/2 lg:w-2/5"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          whileInView={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </motion.section>
    );
  }
);

HeroSection.displayName = 'HeroSection';
