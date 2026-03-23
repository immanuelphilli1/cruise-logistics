import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Bike, UserCheck, FileCheck, Wrench, Shield, ClipboardList, X } from 'lucide-react';
import { Button } from '../components/Button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

function RiderApplyModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission can be wired to API later
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rider-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'tween', duration: 0.2 }}
        className="relative w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
          <div className="flex items-center justify-between mb-6">
            <h2 id="rider-modal-title" className="font-heading text-xl font-semibold text-primary-black">
              Rider application
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-primary-black focus:outline-none focus:ring-2 focus:ring-bronze-gold"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="rider-name" className="block text-sm font-medium text-primary-black">
                Full name
              </label>
              <input
                id="rider-name"
                type="text"
                name="name"
                required
                autoComplete="name"
                className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-primary-black placeholder:text-neutral-400 focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="rider-ghana-card" className="block text-sm font-medium text-primary-black">
                National ID (Ghana card)
              </label>
              <input
                id="rider-ghana-card"
                type="text"
                name="nationalId"
                required
                className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-primary-black placeholder:text-neutral-400 focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                placeholder="Ghana card number"
              />
            </div>
            <div>
              <label htmlFor="rider-phone" className="block text-sm font-medium text-primary-black">
                Phone number
              </label>
              <input
                id="rider-phone"
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-primary-black placeholder:text-neutral-400 focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                placeholder="e.g. 024 123 4567"
              />
            </div>
            <div>
              <label htmlFor="rider-licence" className="block text-sm font-medium text-primary-black">
                Driver&apos;s licence
              </label>
              <input
                id="rider-licence"
                type="text"
                name="driversLicence"
                required
                className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-primary-black placeholder:text-neutral-400 focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                placeholder="Licence number"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary" className="flex-1">
                Submit application
              </Button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-bronze-gold"
              >
                Cancel
              </button>
            </div>
          </form>
      </motion.div>
    </motion.div>
  );
}

export function MotorbikeLeasing() {
  const [riderModalOpen, setRiderModalOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {riderModalOpen && (
          <RiderApplyModal key="rider-apply-modal" onClose={() => setRiderModalOpen(false)} />
        )}
      </AnimatePresence>
      <Helmet>
        <title>Motorbike Leasing – Cruise Logistics</title>
        <meta
          name="description"
          content="Lease motorbikes for your delivery or logistics business. For patrons, businesses, and riders. Contracts, fleet allocation, rider assignment, and rider applications."
        />
      </Helmet>

      {/* Hero – full-width image, light overlay, dark text */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center px-4 py-20 sm:py-28 overflow-hidden bg-neutral-100">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1920&q=80"
            alt="Motorbikes for delivery and logistics"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-white/50" />
        </div>
        <motion.div
          className="relative z-10 mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-4xl font-bold text-primary-black sm:text-5xl md:text-6xl">
            Motorbike Leasing
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl mx-auto">
            Fleet solutions for delivery and logistics. For <strong className="text-primary-black">patrons and businesses</strong> who need bikes—and <strong className="text-primary-black">riders</strong> who want to join.
          </p>
        </motion.div>
      </section>

      {/* Quick nav */}
      <section className="border-b border-neutral-200 bg-white py-10 px-4" aria-label="Who this is for">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm font-medium uppercase tracking-wider text-bronze-gold">
            Who is this for?
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#for-patrons-businesses"
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-primary-black shadow-sm hover:border-bronze-gold/50 hover:bg-bronze-gold/5 transition-colors"
            >
              Patrons &amp; businesses
            </a>
            <a
              href="#for-riders"
              className="rounded-lg border-2 border-bronze-gold bg-bronze-gold/10 px-4 py-2 text-sm font-medium text-primary-black hover:bg-bronze-gold/20 transition-colors"
            >
              Riders (apply here)
            </a>
          </div>
        </div>
      </section>

      {/* Intro + image */}
      <section className="py-14 sm:py-20 px-4 bg-neutral-50">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 md:grid-cols-2 md:gap-12 items-center">
            <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-4/3 md:aspect-auto md:min-h-[280px]">
              <img
                src="/images/bike-1.png"
                alt="Delivery rider with motorbike"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-neutral-600 leading-relaxed">
                We lease motorbikes to delivery companies, logistics businesses, and partners (patrons).
                Patrons get a dedicated fleet with contract management, bike allocation, and rider assignment.
                Riders apply to join and are assigned to bikes by their patron. Everything is set up so businesses can scale and riders can work with maintained, allocated bikes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Patrons & Businesses – with image */}
      <section
        id="for-patrons-businesses"
        className="scroll-mt-24 border-t border-neutral-200 bg-white py-16 sm:py-24 px-4"
        aria-labelledby="patrons-heading"
      >
        <div className="mx-auto max-w-5xl">
          <div className="">
            
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <Building2 className="h-10 w-10 text-bronze-gold shrink-0" aria-hidden />
                <h2 id="patrons-heading" className="font-heading text-3xl font-semibold text-primary-black sm:text-4xl">
                  For Patrons &amp; Businesses
                </h2>
              </motion.div>
              <p className="mt-4 text-neutral-600">
                If you run a delivery or logistics company and need a fleet of motorbikes, we lease bikes to you. You become a patron: we handle the contract, allocation, and rider assignment so you can focus on operations.
              </p>

              <div className="mt-12 grid gap-6 sm:grid-cols-3">
                {[
                  {
                    title: 'What you get',
                    items: [
                      'Lease contract tailored to your fleet size and duration',
                      'Allocated motorbikes ready for your operations',
                      'Rider assignment: we help match or you assign riders to bikes',
                      'Ongoing maintenance and servicing support',
                      'Dedicated contact for contract and operational questions',
                    ],
                    icon: FileCheck,
                  },
                  {
                    title: 'How it works',
                    items: [
                      'Contact us with your fleet size and contract preferences',
                      'We agree terms, contract length, and bike allocation',
                      'Sign the lease and receive your allocated bikes',
                      'Riders are onboarded and assigned to bikes',
                      'We support you through the lease with maintenance and logistics',
                    ],
                    icon: ClipboardList,
                  },
                  {
                    title: 'Good to know',
                    items: [
                      'Flexible contract lengths (months to years)',
                      'Minimum fleet size and pricing discussed on enquiry',
                      'Bikes maintained by us or as per contract',
                      'Rider applications can be referred to you or managed with us',
                      'Dashboard and reporting available for patron accounts',
                    ],
                    icon: Shield,
                  },
                ].map((block) => (
                  <motion.div
                    key={block.title}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-20px' }}
                    className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-5"
                  >
                    <block.icon className="h-8 w-8 text-bronze-gold mb-3" aria-hidden />
                    <h3 className="font-heading text-base font-semibold text-primary-black">{block.title}</h3>
                    <ul className="mt-3 space-y-1.5 text-sm text-neutral-600">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-bronze-gold shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-neutral-600">Interested in leasing a fleet for your business?</p>
                <Link to="/contact" className="mt-4 inline-block">
                  <Button variant="primary">Contact us</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Riders – with image and prominent Apply */}
      <section
        id="for-riders"
        className="scroll-mt-24 border-t border-neutral-200 bg-neutral-50 py-16 sm:py-24 px-4"
        aria-labelledby="riders-heading"
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16 items-start">
            <div className="lg:col-span-3 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
              >
                <div className="flex items-center gap-3">
                  <UserCheck className="h-10 w-10 text-bronze-gold shrink-0" aria-hidden />
                  <h2 id="riders-heading" className="font-heading text-3xl font-semibold text-primary-black sm:text-4xl">
                    For Riders
                  </h2>
                </div>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setRiderModalOpen(true)}
                  className="w-full sm:w-auto text-base px-8 py-3"
                >
                  Apply to become a rider
                </Button>
              </motion.div>

              <p className="mt-4 text-neutral-600">
                If you want to work as a rider with an allocated motorbike, apply through us. We work with patrons (delivery and logistics companies) who need riders. Once your application is approved, you can be assigned to a bike and start with your patron.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="font-heading text-lg font-semibold text-primary-black">What riders get</h3>
                  <ul className="mt-4 space-y-2 text-neutral-600">
                    {[
                      'Assignment to a motorbike from our leased fleet',
                      'Support from your patron (company) and from Cruise Logistics',
                      'Clear terms on use, maintenance, and responsibilities',
                      'Path to work with delivery and logistics partners',
                    ].map((item) => (
                      <motion.li key={item} variants={itemVariants} className="flex gap-2">
                        <span className="text-bronze-gold shrink-0">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="font-heading text-lg font-semibold text-primary-black">Requirements to apply</h3>
                  <ul className="mt-4 space-y-2 text-neutral-600">
                    {[
                      'Valid motorcycle licence (or appropriate licence for the vehicle class)',
                      'Minimum age as required by law and our policy',
                      'Ability to comply with safety and operational rules',
                      'Contact and ID details for verification',
                    ].map((item) => (
                      <motion.li key={item} variants={itemVariants} className="flex gap-2">
                        <span className="text-bronze-gold shrink-0">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-4/3 lg:aspect-auto lg:min-h-[400px]">
                <img
                  src="/images/bike-2.png"
                  alt="Rider on motorbike"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="mt-10 rounded-xl border-2 border-bronze-gold/40 bg-bronze-gold/10 p-8 text-center">
                <p className="font-heading text-lg font-semibold text-primary-black">
                  Ready to apply? We’ll guide you through the next steps.
                </p>
                <p className="mt-2 text-sm text-neutral-600">
                  Use the button below to contact us. Mention that you’re applying as a rider and we’ll get back to you with the application process.
                </p>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setRiderModalOpen(true)}
                  className="mt-6 text-base px-8 py-3"
                >
                  Apply now
                </Button>
              </div>
        </div>
      </section>

      {/* What’s included – with image */}
      <section className="border-t border-neutral-200 bg-white py-16 sm:py-20 px-4" aria-labelledby="included-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="included-heading" className="font-heading text-2xl font-semibold text-primary-black sm:text-3xl">
            What’s included &amp; how we work
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
              <Bike className="h-10 w-10 text-bronze-gold shrink-0" aria-hidden />
              <div>
                <h3 className="font-heading font-semibold text-primary-black">Fleet &amp; bikes</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  We supply motorbikes suited to delivery and urban logistics. Bike types and availability depend on your region and contract. All bikes are maintained and fit for purpose.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
              <Wrench className="h-10 w-10 text-bronze-gold shrink-0" aria-hidden />
              <div>
                <h3 className="font-heading font-semibold text-primary-black">Maintenance &amp; support</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Maintenance and repairs are handled as part of the lease. Riders and patrons report issues through agreed channels; we coordinate servicing so bikes stay on the road.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
              <Shield className="h-10 w-10 text-bronze-gold shrink-0" aria-hidden />
              <div>
                <h3 className="font-heading font-semibold text-primary-black">Contracts &amp; insurance</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Lease terms, insurance, and liability are set out in your contract. We’ll explain what’s covered and what you’re responsible for before you sign.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 relative overflow-hidden w-full rounded-2xl shadow-lg aspect-21/9 max-h-[240px]">
            <img
              src="/images/car-11.jpeg"
              alt="Fleet of motorbikes"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-12 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-neutral-600">
            Questions about leasing for your business or about applying as a rider? Get in touch.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact">
              <Button variant="primary">Contact us</Button>
            </Link>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setRiderModalOpen(true)}
            >
              Rider application
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
