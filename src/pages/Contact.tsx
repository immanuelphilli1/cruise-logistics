import { Helmet } from 'react-helmet-async';
import { Button } from '../components/Button';

export function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact – Cruise Logistics</title>
        <meta name="description" content="Contact Cruise Logistics for car rentals, motorbike leasing, and business enquiries." />
      </Helmet>
      <section className="mx-auto max-w-2xl px-4 py-16 sm:py-24">
        <h1 className="font-heading text-4xl font-bold text-army-green">Contact Us</h1>
        <p className="mt-6 text-lg text-text-muted">
          Get in touch for car rentals, motorbike leasing, or general enquiries.
        </p>
        <p className="mt-6 text-lg text-text-muted">
          Call or Whatsapp us on +233 50 855 3008 or email us at cruisecarrentals001@gmail.com
        </p>
        <form className="mt-12 space-y-6" onSubmit={(e) => e.preventDefault()} noValidate>
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-army-green">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              className="mt-2 block w-full rounded-md border border-white/20 bg-[#e5e5e5] px-4 py-3 text-text-muted placeholder:text-text-muted focus:border-text-muted focus:outline-none focus:ring-1 focus:ring-[#c9a962]"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-army-green">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              className="mt-2 block w-full rounded-md border border-white/20 bg-[#e5e5e5] px-4 py-3 text-text-muted placeholder:text-text-muted focus:border-text-muted focus:outline-none focus:ring-1 focus:ring-[#c9a962]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="contact-subject" className="block text-sm font-medium text-army-green">
              Subject
            </label>
            <select
              id="contact-subject"
              name="subject"
              className="mt-2 block w-full rounded-md border border-white/20 bg-[#e5e5e5] px-4 py-3 text-text-muted focus:border-text-muted focus:outline-none focus:ring-1 focus:ring-[#c9a962]"
            >
              <option value="">Select...</option>
              <option value="car-rental">Car rental enquiry</option>
              <option value="motorbike-leasing">Motorbike leasing</option>
              <option value="rider-application">Rider application</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-army-green">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              className="mt-2 block w-full rounded-md border border-white/20 bg-[#e5e5e5] px-4 py-3 text-text-muted placeholder:text-text-muted focus:border-text-muted focus:outline-none focus:ring-1 focus:ring-[#c9a962]"
              placeholder="Your message"
            />
          </div>
          <Button type="submit" variant="primary">
            Send message
          </Button>
        </form>
      </section>
    </>
  );
}
