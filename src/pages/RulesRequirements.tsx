import { Helmet } from 'react-helmet-async';

export function RulesRequirements() {
  return (
    <>
      <Helmet>
        <title>Rules &amp; Requirements for Car Rentals – Cruise Logistics</title>
        <meta name="description" content="Rules and requirements for renting a car with Cruise Logistics. Age, licence, and rental conditions." />
      </Helmet>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
        <h1 className="font-heading text-4xl font-bold text-army-green pt-10">Rules &amp; Requirements for Car Rentals</h1>
        <p className="mt-6 text-lg text-text-muted">
          Please ensure you meet the following before booking a car rental.
        </p>
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-metallic-brown">Driver requirements</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-text-muted">
              <li>Valid driving licence held for the minimum period required for the vehicle category</li>
              <li>Minimum age as required by local law and our policy (typically 21+)</li>
              <li>Acceptable identification (ID or passport as applicable)</li>
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-semibold text-metallic-brown">Rental conditions</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-text-muted">
              <li>Vehicle must be returned in the same condition, subject to fair wear and tear</li>
              <li>Fuel policy and mileage terms will be stated at booking</li>
              <li>Additional drivers must be declared and may incur a fee</li>
              <li>Compliance with local traffic and safety laws is required</li>
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-semibold text-metallic-brown">Booking and payment</h2>
            <p className="mt-3 text-text-muted">
              Full terms, including cancellation and payment rules, will be shown during the booking process and in your confirmation. By completing a booking you agree to our rental terms.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
