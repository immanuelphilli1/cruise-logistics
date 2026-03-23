import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  BentoCell,
  BentoGrid,
  ContainerScale,
  ContainerScroll,
} from '../components/HeroGalleryScroll';
import { ScrollMorphPartners } from '../components/ScrollMorphPartners';
import { Button } from '../components/Button';
import ishtariLogo from '../assets/logos/ishtari.png';
import speedafLogo from '../assets/logos/speedaf.jpeg';
import oraimoLogo from '../assets/logos/oraimo.png';
import temuLogo from '../assets/logos/temu.png';
import boltLogo from '../assets/logos/bolt.png';
import yangoLogo from '../assets/logos/yango.jpeg';
import uberLogo from '../assets/logos/uber.png';
import directorImage from '../assets/gilbert.jpeg';

const PARTNERS = [
  { name: 'Ishtari Ghana', logoUrl: ishtariLogo },
  { name: 'Speedaf Ghana', logoUrl: speedafLogo },
  { name: 'Oraimo Ghana', logoUrl: oraimoLogo },
  { name: 'Temu', logoUrl: temuLogo },
  { name: 'Bolt Ghana', logoUrl: boltLogo },
  { name: 'Yango', logoUrl: yangoLogo },
  { name: 'Uber', logoUrl: uberLogo },
];

const DIRECTOR_FOCUS = [
  'Car rentals',
  'Motorbike leasing',
  'Fleet management',
  'Corporate solutions',
  'Logistics & operations',
];

const HERO_IMAGES = [
  '/images/car-13.jpeg',
  '/images/car-14.jpeg',
  'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80',
  '/images/car-41.jpg',
  '/images/bike-2.png',
];

export function AboutUs() {
  return (
    <>
      <Helmet>
        <title>About Us – Cruise Logistics</title>
        <meta
          name="description"
          content="Learn about Cruise Logistics – premium car rental and motorbike leasing. Our story, values, and commitment to mobility."
        />
      </Helmet>

      {/* Hero: scroll-driven bento gallery + centered title */}
    <div className=''>
      <ContainerScroll className="h-[350vh]">
        <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-4">
          {HERO_IMAGES.map((imageUrl, index) => (
            <BentoCell
              key={index}
              className="overflow-hidden rounded-xl shadow-xl"
            >
              <img
                className="size-full object-cover object-center"
                src={imageUrl}
                alt=""
              />
            </BentoCell>
          ))}
        </BentoGrid>

        <ContainerScale className="relative z-10 top-1/3 text-center">
          <h1 className="font-heading max-w-xl text-4xl font-bold tracking-tight text-army-green md:text-5xl">
            About Us
          </h1>
          <p className="mx-auto my-6 max-w-xl text-sm text-dark-grey md:text-base">
            Premium car rentals and motorbike leasing. We help individuals and
            businesses move with reliability and service.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/services">
              <Button variant="primary">Our services</Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary">Contact us</Button>
            </Link>
          </div>
        </ContainerScale>
      </ContainerScroll>
      </div>
      {/* Existing about content */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
        <p className="text-lg text-text-muted">
        Cruise Logistics is a modern logistics and mobility solutions company focused on providing reliable transportation assets and operational support to individuals, businesses, and delivery platforms. The company specializes in car rentals for private and corporate clients and the leasing of motorbikes to delivery companies, helping businesses scale their logistics operations efficiently. By combining well-maintained vehicles, structured contracts, and professional rider management, Cruise Logistics ensures that its partners can focus on their core operations while the company handles the mobility and fleet management side of the business.
<br /> <br />
Founded with the vision of bridging the gap between transportation demand and dependable fleet availability, Cruise Logistics has grown into a trusted partner for organizations that rely on timely and efficient movement. From managing rider operations and maintaining vehicles to overseeing client contracts and logistics coordination, the company is committed to delivering premium service, operational excellence, and reliability. Cruise Logistics continues to expand its fleet and partnerships, positioning itself as a dependable mobility and logistics provider for the evolving transportation and delivery ecosystem.<br />
         <br /> In layman's terms, Cruise Logistics is a logistics company that rents cars to individuals
          and businesses and leases motorbikes to delivery companies. We manage
          riders, contracts, business clients, and operational logistics with a
          focus on reliability and premium service.
          
        </p>

        {/* Meet our director – fashion-hero style */}
        <section className="mt-16 md:mt-24 overflow-x-hidden" aria-labelledby="director-heading">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative">
            <div className="md:order-2 relative">
              <div
                className="absolute -z-10 w-72 h-72 rounded-full bg-[#c9a962] blur-3xl opacity-20 -top-10 -left-10"
                aria-hidden="true"
              />
              <img
                src={directorImage}
                alt="Director of Cruise Logistics"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-3/4 object-top filter brightness-105"
              />
            </div>
            <div className="md:order-1 flex flex-col justify-between">
              <div className="flex flex-col h-full justify-between">
                <h2 id="director-heading" className="font-heading text-5xl md:text-7xl font-bold text-army-green leading-tight tracking-tighter">
                  Meet our director
                </h2>
                <ul className="mt-8 space-y-2 tracking-tighter text-lg text-text-muted">
                  {DIRECTOR_FOCUS.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0.8 }}
                      whileHover={{
                        opacity: 1,
                        y: -3,
                        transition: { duration: 0.4, ease: 'easeOut' },
                      }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span className="cursor-default">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <div />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-16 space-y-8">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-army-green">
              Our mission
            </h2>
            <p className="mt-3 text-text-muted">
              To provide premium mobility solutions that help people and
              businesses move with confidence, whether that is a short-term car
              rental or a long-term motorbike lease for your fleet.
            </p>
          </div>

          {/* Our partners – scroll-morph flip cards */}
          <section className="mt-16" aria-labelledby="partners-heading">
            <ScrollMorphPartners partners={PARTNERS} title="Our partners" />
          </section>

          <div>
            <h2 className="font-heading text-2xl font-semibold text-army-green">
              What we do
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-text-muted">
              <li>Car rentals for individuals and corporate clients</li>
              <li>Motorbike leasing for delivery and logistics businesses</li>
              <li>Contract management and rider assignment</li>
              <li>Full operational and maintenance support</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
