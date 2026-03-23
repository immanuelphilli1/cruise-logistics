import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Car, Bike, Briefcase, Plane, Crown, CarFront } from 'lucide-react';
import { Button } from '../components/Button';

const MAIN_SERVICES = [
  {
    key: 'car-rental',
    title: 'Car rentals',
    subtitle: 'By the day or week',
    description:
      'Rent cars from our premium fleet with clear pricing and simple booking. Browse availability, choose your vehicle, and drive away. Ideal for trips, business, or everyday mobility.',
    cta: 'View car rentals',
    href: '/car-rentals',
    variant: 'primary' as const,
    image: '/images/car-13.jpeg',
    imageAlt: 'Premium car from our rental fleet',
  },
  {
    key: 'motorbike-leasing',
    title: 'Motorbike leasing',
    subtitle: 'Fleet solutions for business',
    description:
      'Lease motorbikes for your delivery or logistics business. We handle contracts, bike allocation, rider assignment, and maintenance so you can focus on operations. Flexible terms and dedicated support.',
    cta: 'Motorbike leasing',
    href: '/motorbike-leasing',
    variant: 'secondary' as const,
    image: '/images/bike-1.png',
    imageAlt: 'Motorbikes for delivery and logistics',
  },
];

const VALUE_PROPS = [
  {
    title: 'Chauffeur service',
    desc: 'Arrive in style with a dedicated driver.',
    icon: Crown,
  },
  {
    title: 'Corporate rentals',
    desc: 'Fleet solutions for your business.',
    icon: Briefcase,
  },
  {
    title: 'VIP transfers',
    desc: 'Premium vehicles for special occasions.',
    icon: CarFront,
  },
  {
    title: 'Airport pickup',
    desc: 'Seamless meet and greet.',
    icon: Plane,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Services() {
  return (
    <>
      <Helmet>
        <title>Services – Cruise Logistics</title>
        <meta
          name="description"
          content="Cruise Logistics services: car rentals, motorbike leasing, corporate solutions, chauffeur, VIP transfers, and logistics support."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 text-center overflow-hidden bg-neutral-100">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/car-12.jpeg"
            alt=""
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-white/50" />
        </div>
        <motion.div
          className="relative z-10 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-body text-xs uppercase tracking-[0.2em] text-metallic-brown sm:text-sm">
            What we offer
          </p>
          <h1 className="font-heading mt-4 text-4xl font-bold tracking-tight text-primary-black sm:text-5xl md:text-6xl">
            Our Services
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl mx-auto">
            Car rentals and motorbike leasing for individuals and businesses with corporate solutions, chauffeur service, and dedicated support.
          </p>
        </motion.div>
      </section>

      {/* Main services – Car rental & Motorbike leasing with images */}
      <section
        className="border-t border-neutral-200 bg-white py-20 sm:py-28 px-4"
        aria-labelledby="main-services-heading"
      >
        <motion.h2
          id="main-services-heading"
          className="font-heading text-center text-3xl font-semibold text-primary-black sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          What we offer
        </motion.h2>
        <p className="mt-4 text-center text-neutral-600 max-w-xl mx-auto">
          Choose a car for a few days or scale your delivery fleet with motorbike leasing.
        </p>

        <div className="mx-auto mt-16 max-w-5xl space-y-20">
          {MAIN_SERVICES.map((service, index) => (
            <motion.article
              key={service.key}
              className="grid gap-8 md:grid-cols-2 md:gap-12 items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <div className="relative overflow-hidden rounded-2xl border border-neutral-200 shadow-xl">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="aspect-4/3 w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <div className="flex items-center gap-3">
                  {service.key === 'car-rental' ? (
                    <Car className="h-8 w-8 text-bronze-gold shrink-0" aria-hidden />
                  ) : (
                    <Bike className="h-8 w-8 text-bronze-gold shrink-0" aria-hidden />
                  )}
                  <span className="font-body text-sm uppercase tracking-wider text-bronze-gold">
                    {service.subtitle}
                  </span>
                </div>
                <h3 className="font-heading mt-4 text-2xl font-semibold text-primary-black sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 text-neutral-600 leading-relaxed">
                  {service.description}
                </p>
                <Link to={service.href} className="mt-8 inline-block">
                  <Button variant={service.variant}>{service.cta}</Button>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Value props – Chauffeur, Corporate, VIP, Airport */}
      <section
        className="border-t border-neutral-200 bg-neutral-50 py-20 px-4"
        aria-labelledby="value-props-heading"
      >
        <motion.h2
          id="value-props-heading"
          className="font-heading text-center text-3xl font-semibold text-primary-black sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          The luxury experience
        </motion.h2>
        <p className="mt-4 text-center text-neutral-600 max-w-xl mx-auto">
          Chauffeur service, corporate rentals, VIP transfers, airport pickup.
        </p>
        <motion.div
          className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {VALUE_PROPS.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-bronze-gold/40 hover:shadow-lg hover:shadow-bronze-gold/5"
            >
              <item.icon
                className="h-10 w-10 text-bronze-gold transition-transform duration-300 group-hover:scale-110"
                aria-hidden
              />
              <h3 className="font-heading mt-5 text-lg font-semibold text-primary-black">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Need something else – custom / contact CTA with image */}
      <section
        className="border-t border-neutral-200 bg-white py-20 sm:py-28 px-4"
        aria-labelledby="custom-heading"
      >
        <motion.div
          className="mx-auto max-w-5xl rounded-2xl border border-neutral-200 bg-white overflow-hidden md:grid md:grid-cols-2 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative aspect-4/3 md:aspect-auto md:min-h-[320px]">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/50 to-transparent md:from-transparent md:via-transparent md:to-white/90" />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 id="custom-heading" className="font-heading text-2xl font-semibold text-primary-black sm:text-3xl">
              Need something else?
            </h2>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              Corporate fleets, chauffeur services, long-term arrangements, or custom solutions—we can help. Get in touch to discuss your needs.
            </p>
            <Link to="/contact" className="mt-8 inline-block">
              <Button variant="secondary">Contact us</Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
