import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/Button';
import { HeroSection } from '../components/HeroSection';
import { PartnersCarousel } from '../components/PartnersCarousel';
import { FeaturedCars } from '../components/FeaturedCars';
import ishtariLogo from '../assets/logos/ishtari.png';
import speedafLogo from '../assets/logos/speedaf.jpeg';
import oraimoLogo from '../assets/logos/oraimo.png';
import temuLogo from '../assets/logos/temu.png';
import boltLogo from '../assets/logos/bolt.png';
import yangoLogo from '../assets/logos/yango.jpeg';
import uberLogo from '../assets/logos/uber.png';

const PARTNERS = [
  { name: 'Ishtari Ghana', logoUrl: ishtariLogo },
  { name: 'Speedaf Ghana', logoUrl: speedafLogo },
  { name: 'Oraimo Ghana', logoUrl: oraimoLogo },
  { name: 'Temu', logoUrl: temuLogo },
  { name: 'Bolt Ghana', logoUrl: boltLogo },
  { name: 'Yango', logoUrl: yangoLogo },
  { name: 'Uber', logoUrl: uberLogo },
];

const FEATURED_CARS = [
  {
    name: 'Toyota Camry ',
    subtitle: 'From GH₵800/day · Luxury sedan',
    description: 'Premium comfort and performance for business or special occasions. Full leather, advanced driver assistance, and seamless connectivity.',
    src: '/images/car-41.jpg',
  },
  {
    name: 'Toyota Land Cruiser Prado',
    subtitle: 'From GH₵2,000/day · SUV',
    description: 'High performance and luxury for business or special occasions. Full leather, advanced driver assistance, and seamless connectivity.',
    src: '/images/car-2.jpeg',
  },
  {
    name: 'Toyota Land Cruiser',
    subtitle: 'From GH₵2,500/day · Luxury SUV',
    description: 'High performance and luxury for business or special occasions. Full leather, advanced driver assistance, and seamless connectivity.',
    src: '/images/car-13.jpeg',
  },
];

export function Home() {
  return (
    <>
      <Helmet>
        <title>Cruise Logistics – Premium Car Rental &amp; Motorbike Leasing</title>
        <meta name="description" content="Cruise Logistics offers premium car rentals and motorbike leasing for individuals and businesses. Luxury vehicles, corporate solutions, reliable logistics." />
        <link rel="canonical" href="https://cruise-logistics.example.com/" />
      </Helmet>
      {/* Hero – full-screen with light overlay */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden bg-neutral-100">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/car-21.jpeg"
            alt=""
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-primary-black/75" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-metallic-brown sm:text-sm">
            Cruise Car Rentals &amp; Motorbike Leasing
          </p>
          <h1 className="font-heading capitalize mt-4 text-4xl font-bold tracking-normal text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Drive the extraordinary
          </h1>
          <p className="mt-6 text-lg text-[#e5e5e5] sm:text-xl max-w-2xl mx-auto">
            Premium cars and fleet solutions for every journey. Book by the day or lease for your business.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link to="/car-rentals">
              <Button variant="primary">Explore fleet</Button>
            </Link>
            <Link to="/motorbike-leasing">
              <Button variant="secondary">Motorbike leasing</Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Luxury experience – chauffeur, corporate, VIP, airport */}
      <section className="py-24 px-4 bg-neutral-50" aria-labelledby="luxury-heading">
        <h2 id="luxury-heading" className="font-heading text-center text-3xl font-semibold text-primary-black sm:text-4xl">
          The luxury experience
        </h2>
        <p className="mt-4 text-center text-neutral-600 max-w-xl mx-auto">
          Chauffeur service, corporate rentals, VIP transfers, airport pickup.
        </p>
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Chauffeur service', desc: 'Arrive in style with a dedicated driver.' },
            { title: 'Corporate rentals', desc: 'Fleet solutions for your business.' },
            { title: 'VIP transfers', desc: 'Premium vehicles for special occasions.' },
            { title: 'Airport pickup', desc: 'Seamless meet and greet.' },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-bronze-gold/40 hover:shadow-lg hover:shadow-bronze-gold/5"
            >
              <h3 className="font-heading text-lg font-semibold text-bronze-gold">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Motorbike leasing hero – split layout with contact info */}
      <HeroSection
        variant="light"
        slogan="SCALE YOUR DELIVERY FLEET"
        title={
          <>
            Motorbike leasing
            <br />
            <span className="text-bronze-gold">that moves your business</span>
          </>
        }
        subtitle="Lease a fleet of motorbikes for your delivery or logistics company. We handle contracts, bike allocation, and rider assignment so you can focus on operations. Flexible terms, maintained vehicles, and dedicated support for businesses that need reliable two-wheel capacity."
        callToAction={{
          text: 'Learn more',
          href: '/motorbike-leasing',
        }}
        callToActionSecondary={{
          text: 'Contact us to join as a rider',
          href: '/motorbike-leasing#for-riders',
        }}
        backgroundImage="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80"
        contactInfo={{
          website: 'cruiselogistics.onrender.com',
          phone: '+233 50 855 3008',
          address: 'Community 4, Tema, Ghana',
        }}
      />
      {/* Our partners – logo carousel */}
      <section className="border-y border-neutral-200 bg-white py-16 px-4" aria-labelledby="partners-heading">
        <h2 id="partners-heading" className="font-heading text-center text-2xl font-semibold text-primary-black sm:text-3xl md:text-4xl">
          Our partners
        </h2>
        <p className="mt-3 text-center text-neutral-600 text-lg">
          Trusted by leading brands across Ghana and beyond.
        </p>
        <div className="mx-auto mt-10 max-w-6xl">
          <PartnersCarousel partners={PARTNERS} />
        </div>
        <div className="mt-12 text-center">
          <Link to="/contact">
            <Button variant="secondary">Get in touch with us</Button>
          </Link>
        </div>
      </section>
      {/* Services / What we offer */}
      <section className="py-24 px-4 border-t border-neutral-200 bg-[#e5e5e5]" aria-labelledby="services-heading">
        <h2 id="services-heading" className="font-heading text-center text-3xl font-semibold text-primary-black sm:text-4xl">
          What we offer
        </h2>
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2">
          <article className="group rounded-2xl border border-neutral-200 bg-white p-10 shadow-sm transition-all duration-300 hover:border-bronze-gold/40 hover:shadow-lg hover:shadow-bronze-gold/5">
            <h3 className="font-heading text-xl font-semibold text-primary-black">Car rentals</h3>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              Browse and book cars by the day or week. Premium fleet, clear pricing, simple booking.
            </p>
            <Link to="/car-rentals" className="mt-6 inline-flex items-center gap-2 text-bronze-gold font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-gold rounded">
              View fleet <span aria-hidden="true">→</span>
            </Link>
          </article>
          <article className="group rounded-2xl border border-neutral-200 bg-white p-10 shadow-sm transition-all duration-300 hover:border-bronze-gold/40 hover:shadow-lg hover:shadow-bronze-gold/5">
            <h3 className="font-heading text-xl font-semibold text-primary-black">Motorbike leasing</h3>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              Lease motorbikes for your delivery or logistics business. Contracts and rider management.
            </p>
            <Link to="/motorbike-leasing" className="mt-6 inline-flex items-center gap-2 text-bronze-gold font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-gold rounded">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </article>
        </div>
      </section>
      {/* Featured cars – circular carousel */}
      <section className="py-24 px-4 border-t border-neutral-200 bg-white" aria-labelledby="featured-cars-heading">
        <h2 id="featured-cars-heading" className="font-heading text-center text-3xl font-semibold text-primary-black sm:text-4xl">
          Featured cars
        </h2>
        <p className="mt-4 text-center text-neutral-600 max-w-xl mx-auto">
          Hand-picked vehicles from our fleet. View specs, check availability, and book online.
        </p>
        <div className="mx-auto mt-16 flex flex-wrap items-center justify-center">
          <FeaturedCars cars={FEATURED_CARS} autoplay />
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-24 px-4 bg-neutral-100 border-t border-neutral-200" aria-labelledby="testimonials-heading">
        <h2 id="testimonials-heading" className="font-heading text-center text-3xl font-semibold text-primary-black sm:text-4xl">
          What our clients say
        </h2>
        <div className="mx-auto mt-12 max-w-3xl">
          <blockquote className="text-center">
            <p className="text-lg text-neutral-600 italic leading-relaxed">
              “Professional, on time, and the cars are always in perfect condition. Our go-to for corporate rentals.”
            </p>
            <footer className="mt-6">
              <cite className="font-heading text-primary-black not-italic">— Corporate client</cite>
            </footer>
          </blockquote>
        </div>
      </section>
    </>
  );
}
