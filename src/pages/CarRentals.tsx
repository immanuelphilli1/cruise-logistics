import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Calendar, Filter, X } from 'lucide-react';
import { FocusCards } from '../components/FocusCards';
import type { FocusCardItem } from '../components/FocusCards';
import { Button } from '../components/Button';

type VehicleType = 'all' | 'sedan' | 'suv' | 'luxury';
type Transmission = 'all' | 'automatic' | 'manual';
type SortOption = 'name' | 'price-low' | 'price-high';

interface FleetCar {
  title: string;
  src: string;
  type: VehicleType;
  transmission: Transmission;
  pricePerDay: number;
  seats: number;
}

const FLEET_CARS: FleetCar[] = [
  {
    title: 'Toyota Camry',
    src: '/images/car-41.jpg',
    type: 'sedan',
    transmission: 'automatic',
    pricePerDay: 800,
    seats: 5,
  },
  {
    title: 'Toyota Land Cruiser Prado',
    src: '/images/car-6.jpeg',
    type: 'luxury',
    transmission: 'automatic',
    pricePerDay: 2000,
    seats: 5,
  },
  {
    title: 'Toyota Land Cruiser',
    src: '/images/car-9.jpeg',
    type: 'luxury',
    transmission: 'automatic',
    pricePerDay: 2500,
    seats: 7,
  },
  {
    title: 'Toyota Voxy',
    src: '/images/car-37.jpeg',
    type: 'suv',
    transmission: 'automatic',
    pricePerDay: 1000,
    seats: 10,
  },
  {
    title: 'Mitsubishi Outlander',
    src: '/images/car-8.jpeg',
    type: 'suv',
    transmission: 'automatic',
    pricePerDay: 1000,
    seats: 7,
  },
  {
    title: 'Toyota Hiace',
    src: '/images/car-14.jpeg',
    type: 'suv',
    transmission: 'automatic',
    pricePerDay: 1200,
    seats: 15,
  },
];

const VEHICLE_TYPE_LABELS: Record<Exclude<VehicleType, 'all'>, string> = {
  sedan: 'Sedan',
  suv: 'SUV',
  luxury: 'Luxury',
};

const TRANSMISSION_LABELS: Record<Exclude<Transmission, 'all'>, string> = {
  automatic: 'Automatic',
  manual: 'Manual',
};

function CarBookingModal({
  car,
  onClose,
}: {
  car: FleetCar;
  onClose: () => void;
}) {
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [driversLicence, setDriversLicence] = useState('');
  const [driveType, setDriveType] = useState<'self-drive' | 'chauffeur-drive'>('self-drive');
  const [duration, setDuration] = useState('');
  const [durationUnit, setDurationUnit] = useState<'days' | 'weeks'>('days');
  const [phone, setPhone] = useState('');

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
    // Wire to API later
    onClose();
  };

  const daysCount = duration ? (durationUnit === 'weeks' ? Number(duration) * 7 : Number(duration)) : 0;
  const totalAmount = daysCount > 0 ? car.pricePerDay * daysCount : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ type: 'tween', duration: 0.2 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 rounded-full p-2 bg-white/90 text-neutral-600 hover:bg-white hover:text-primary-black focus:outline-none focus:ring-2 focus:ring-bronze-gold"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="w-full md:w-1/2 relative min-h-[240px] md:min-h-[480px]">
            <img
              src={car.src}
              alt={car.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent py-6 px-6">
              <h2 id="booking-modal-title" className="font-heading text-2xl font-semibold text-white">
                {car.title}
              </h2>
              <p className="mt-1 text-white/90">GH¢{car.pricePerDay} / day</p>
            </div>
          </div>

          <div className="w-full md:w-1/2 overflow-y-auto p-6 md:p-8">
            <h3 className="font-heading text-xl font-semibold text-primary-black mb-6">
              Book this car
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="book-fullname" className="block text-sm font-medium text-primary-black mb-1">
                  Full name
                </label>
                <input
                  id="book-fullname"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-primary-black focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="book-nationalid" className="block text-sm font-medium text-primary-black mb-1">
                  National ID (Ghana card)
                </label>
                <input
                  id="book-nationalid"
                  type="text"
                  required
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-primary-black focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                  placeholder="Ghana card number"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
              <div className={`${driveType === 'chauffeur-drive' ? 'col-span-2' : ''}`}>
                  <label htmlFor="book-drive-type" className="block text-sm font-medium text-primary-black mb-1">
                    Drive Type
                  </label>
                  <select
                    id="book-drive-type"
                    value={driveType}
                    onChange={(e) => setDriveType(e.target.value as 'self-drive' | 'chauffeur-drive')}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-primary-black focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                  >
                    <option value="self-drive">Self Drive</option>
                    <option value="chauffeur-drive">Chauffeur Drive</option>
                  </select>
                </div>
                {driveType === 'self-drive' && (
              <div>
                <label htmlFor="book-licence" className="block text-sm font-medium text-primary-black mb-1">
                  Driver&apos;s licence
                </label>
                <input
                  id="book-licence"
                  type="text"
                  required
                  value={driversLicence}
                  onChange={(e) => setDriversLicence(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-primary-black focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                  placeholder="Licence number"
                />
              </div>
              )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="book-duration" className="block text-sm font-medium text-primary-black mb-1">
                    Duration
                  </label>
                  <input
                    id="book-duration"
                    type="number"
                    min={1}
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-primary-black focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                    placeholder="e.g. 3"
                  />
                </div>
                <div>
                  <label htmlFor="book-duration-unit" className="block text-sm font-medium text-primary-black mb-1">
                    Unit
                  </label>
                  <select
                    id="book-duration-unit"
                    value={durationUnit}
                    onChange={(e) => setDurationUnit(e.target.value as 'days' | 'weeks')}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-primary-black focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="book-phone" className="block text-sm font-medium text-primary-black mb-1">
                  Phone number
                </label>
                <input
                  id="book-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-primary-black focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                  placeholder="e.g. 024 123 4567"
                />
              </div>
              <div className="rounded-xl border-2 border-bronze-gold/30 bg-bronze-gold/5 px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-primary-black">Total amount</span>
                  <span className="font-heading text-xl font-semibold text-primary-black">
                    {totalAmount > 0 ? `GH¢${totalAmount.toLocaleString()}` : '—'}
                  </span>
                </div>
                {totalAmount > 0 && (
                  <p className="mt-1 text-sm text-neutral-600">
                    GH¢{car.pricePerDay} × {daysCount} day{daysCount !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <div className="flex flex-col md:flex-row gap-3 pt-4">
                <Button type="submit" variant="primary" className="flex-1">
                  Submit booking
                </Button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-bronze-gold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
  );
}

export function CarRentals() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [vehicleType, setVehicleType] = useState<VehicleType>('all');
  const [transmission, setTransmission] = useState<Transmission>('all');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [seats, setSeats] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [bookingCar, setBookingCar] = useState<FleetCar | null>(null);

  const filteredAndSortedCards = useMemo(() => {
    let list = [...FLEET_CARS];

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((car) => car.title.toLowerCase().includes(q));
    }
    if (vehicleType !== 'all') list = list.filter((car) => car.type === vehicleType);
    if (transmission !== 'all') list = list.filter((car) => car.transmission === transmission);
    if (priceMin !== '') {
      const min = Number(priceMin);
      if (!Number.isNaN(min)) list = list.filter((car) => car.pricePerDay >= min);
    }
    if (priceMax !== '') {
      const max = Number(priceMax);
      if (!Number.isNaN(max)) list = list.filter((car) => car.pricePerDay <= max);
    }
    if (seats !== '') {
      const n = Number(seats);
      if (!Number.isNaN(n)) list = list.filter((car) => car.seats >= n);
    }

    if (sortBy === 'name') list.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === 'price-low') list.sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sortBy === 'price-high') list.sort((a, b) => b.pricePerDay - a.pricePerDay);

    return list;
  }, [searchQuery, vehicleType, transmission, priceMin, priceMax, seats, sortBy]);

  const focusCardsForGrid: FocusCardItem[] = useMemo(
    () => filteredAndSortedCards.map((c) => ({ title: c.title, src: c.src, pricePerDay: c.pricePerDay })),
    [filteredAndSortedCards]
  );

  const hasActiveFilters =
    vehicleType !== 'all' ||
    transmission !== 'all' ||
    priceMin !== '' ||
    priceMax !== '' ||
    seats !== '';

  const clearFilters = () => {
    setVehicleType('all');
    setTransmission('all');
    setPriceMin('');
    setPriceMax('');
    setSeats('');
    setSearchQuery('');
  };

  return (
    <>
      <AnimatePresence>
        {bookingCar && (
          <CarBookingModal
            key={bookingCar.title}
            car={bookingCar}
            onClose={() => setBookingCar(null)}
          />
        )}
      </AnimatePresence>
      <Helmet>
        <title>Car Rentals – Cruise Logistics</title>
        <meta
          name="description"
          content="Browse and book premium car rentals. View fleet, specifications, availability, and pricing. Book as guest or log in."
        />
      </Helmet>

      {/* Hero */}
      <section className="py-10" />

      {/* Search, dates, location – booking essentials */}
      <section className="sticky top-16 z-40 border-b border-neutral-200 bg-white py-4 px-4 shadow-sm">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" aria-hidden />
              <input
                type="search"
                placeholder="Search by car name or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pl-10 pr-3 text-primary-black placeholder:text-neutral-400 focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                aria-label="Search cars"
              />
            </div>
            <div className="flex gap-2 items-center">
              <Calendar className="h-4 w-4 text-neutral-500 shrink-0" aria-hidden />
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="flex-1 rounded-lg border border-neutral-300 bg-white py-2.5 px-3 text-primary-black focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold min-w-0"
                aria-label="Pick-up date"
              />
            </div>
            <div className="flex gap-2 items-center">
              <Calendar className="h-4 w-4 text-neutral-500 shrink-0" aria-hidden />
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={pickupDate || undefined}
                className="flex-1 rounded-lg border border-neutral-300 bg-white py-2.5 px-3 text-primary-black focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold min-w-0"
                aria-label="Return date"
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* Filters + sort */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-4 px-4">
        <div className="mx-auto max-w-5xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${filtersOpen ? 'border-bronze-gold bg-bronze-gold/10 text-primary-black' : 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'}`}
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="rounded-full bg-bronze-gold px-1.5 py-0.5 text-xs text-primary-black">
                  On
                </span>
              )}
            </button>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            )}
            <label className="flex items-center gap-2 text-sm text-neutral-600">
              Sort by
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-primary-black focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
              >
                <option value="name">Name A–Z</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>
          </div>
          <p className="text-sm text-neutral-600">
            {filteredAndSortedCards.length} {filteredAndSortedCards.length === 1 ? 'car' : 'cars'} available
          </p>
        </div>

        {filtersOpen && (
          <div className="mx-auto max-w-5xl mt-4 pt-4 border-t border-neutral-200">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div>
                <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                  Vehicle type
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value as VehicleType)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-primary-black focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                >
                  <option value="all">All types</option>
                  {(Object.keys(VEHICLE_TYPE_LABELS) as Array<Exclude<VehicleType, 'all'>>).map((t) => (
                    <option key={t} value={t}>
                      {VEHICLE_TYPE_LABELS[t]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                  Transmission
                </label>
                <select
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value as Transmission)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-primary-black focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                >
                  <option value="all">All</option>
                  {(Object.keys(TRANSMISSION_LABELS) as Array<Exclude<Transmission, 'all'>>).map((t) => (
                    <option key={t} value={t}>
                      {TRANSMISSION_LABELS[t]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                  Min price/day (GH¢)
                </label>
                <input
                  type="number"
                  min={0}
                  placeholder="e.g. 50"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-primary-black placeholder:text-neutral-400 focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                  Max price/day (GH¢)
                </label>
                <input
                  type="number"
                  min={0}
                  placeholder="e.g. 500"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-primary-black placeholder:text-neutral-400 focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">
                  Min. seats
                </label>
                <input
                  type="number"
                  min={2}
                  max={9}
                  placeholder="e.g. 5"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-primary-black placeholder:text-neutral-400 focus:border-bronze-gold focus:outline-none focus:ring-1 focus:ring-bronze-gold"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Fleet – focus cards */}
      <section className="py-16 sm:py-24 px-4 bg-white" aria-labelledby="fleet-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="fleet-heading" className="font-heading text-2xl font-semibold text-primary-black sm:text-3xl text-center mb-4">
            Our fleet
          </h2>
          <p className="text-center text-neutral-600 max-w-xl mx-auto mb-12">
            Hover over a vehicle to see its name. Choose your car, then book with your dates and location.
          </p>
          {filteredAndSortedCards.length > 0 ? (
            <FocusCards
              cards={focusCardsForGrid}
              onBook={(card) => {
                const car = FLEET_CARS.find((c) => c.title === card.title && c.src === card.src);
                if (car) setBookingCar(car);
              }}
            />
          ) : (
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 py-16 text-center">
              <p className="text-neutral-600">No cars match your search or filters. Try adjusting them.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-bronze-gold font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-bronze-gold rounded"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* What you can expect + CTA */}
      <section className="py-16 sm:py-24 px-4 bg-neutral-50 border-t border-neutral-200">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-heading text-2xl font-semibold text-primary-black sm:text-3xl">
            What you can expect
          </h2>
          <ul className="mt-6 space-y-3 text-neutral-600">
            <li className="flex gap-2">
              <span className="text-bronze-gold shrink-0">•</span>
              Images, specifications, and availability calendar per vehicle
            </li>
            <li className="flex gap-2">
              <span className="text-bronze-gold shrink-0">•</span>
              Clear pricing and rental conditions
            </li>
            <li className="flex gap-2">
              <span className="text-bronze-gold shrink-0">•</span>
              Simple flow: search &amp; filter → select car → dates &amp; location → confirm booking
            </li>
            <li className="flex gap-2">
              <span className="text-bronze-gold shrink-0">•</span>
              Guest booking or log in to manage bookings
            </li>
          </ul>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link to="/contact">
              <Button variant="secondary">Enquire</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
