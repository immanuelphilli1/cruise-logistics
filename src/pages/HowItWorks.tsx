import { Helmet } from 'react-helmet-async';
import { ProcessTimeline, type ProcessStep } from '../components/ProcessTimeline';

const HOW_IT_WORKS_STEPS: ProcessStep[] = [
  {
    id: '01',
    title: 'Choose your service',
    subtitle: 'Car rental or motorbike leasing',
    description:
      'Decide whether you need a car for a few days or a fleet of motorbikes for your delivery or logistics business. We support both individual rentals and business leasing.',
    details: [
      'Car rental for individuals',
      'Car rental for corporate',
      'Motorbike leasing for businesses',
      'Fleet and rider management',
    ],
    duration: 'A few minutes',
    image:
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '02',
    title: 'Browse or get in touch',
    subtitle: 'Explore the fleet or talk to us',
    description:
      'For cars: browse our fleet online, check availability and pricing. For motorbike leasing: contact us to discuss your needs, fleet size, and contract terms.',
    details: [
      'Browse cars and availability',
      'Check pricing and conditions',
      'Contact for motorbike leasing',
      'Discuss contract and fleet size',
    ],
    duration: 'Same day response',
    image:
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '03',
    title: 'Book or sign a contract',
    subtitle: 'Complete your booking or lease',
    description:
      'Complete your car booking online with clear terms and confirmation. For motorbike leasing, we prepare and sign a lease contract and agree on bike allocation and rider assignment.',
    details: [
      'Online car booking',
      'Rental rules and payment',
      'Lease contract for motorbikes',
      'Bike allocation and riders',
    ],
    duration: '1–2 weeks for leasing',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '04',
    title: 'Collect and go',
    subtitle: 'Pick up your vehicle or receive your fleet',
    description:
      'Pick up your car at the agreed time and location, or receive your allocated motorbikes and assigned riders. We support you through the rental or lease period with maintenance and logistics.',
    details: [
      'Vehicle handover',
      'Documentation and keys',
      'Rider assignment for leasing',
      'Ongoing support',
    ],
    duration: 'Ongoing',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=400&q=80',
  },
];

export function HowItWorks() {
  return (
    <>
      <Helmet>
        <title>How It Works – Cruise Logistics</title>
        <meta
          name="description"
          content="How Cruise Logistics works: from choosing a service to booking or leasing. Car rentals and motorbike leasing explained."
        />
      </Helmet>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <h1 className="font-heading text-4xl font-bold text-army-green pt-10">
          How it works
        </h1>
        <p className="mt-6 text-lg text-text-muted max-w-2xl">
          Whether you need a car for a few days or a fleet of motorbikes for your
          business, here is how we work with you.
        </p>
        <div className="mt-12">
          <ProcessTimeline steps={HOW_IT_WORKS_STEPS} defaultStep="01" />
        </div>
      </section>
    </>
  );
}
