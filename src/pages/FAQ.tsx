import { Helmet } from 'react-helmet-async';
import { FAQTabs } from '../components/FAQTabs';
import type { FAQItemData } from '../components/FAQTabs';

const categories = {
  'car-rental': 'Car Rental',
  'motor-leasing': 'Motor Leasing',
  'rider-application': 'Rider Application',
  'become-patron': 'Become Patron',
};

const faqData: Record<string, FAQItemData[]> = {
  'car-rental': [
    {
      question: 'How do I book a car?',
      answer:
        'Go to Car Rentals, browse the fleet, select your dates, and complete the booking. We’ll confirm your reservation and send pickup details.',
    },
    {
      question: 'What documents do I need to rent a car?',
      answer:
        'You need a valid driving licence, a form of ID (e.g. national ID or passport), and a valid payment method. See the Rules & Requirements page for full details, including minimum age and licence requirements.',
    },
    {
      question: 'What is the minimum rental period?',
      answer:
        'Minimum rental is typically 24 hours. For longer stays we offer weekly and monthly rates. Contact us or check the car listing for exact terms.',
    },
    {
      question: 'Can I pick up and return at different locations?',
      answer:
        'One-way rentals may be available depending on the vehicle and locations. Check at booking or contact us to arrange pickup and return at different locations.',
    },
    {
      question: 'What happens if I need to cancel or modify my booking?',
      answer:
        'You can modify or cancel by contacting us. Cancellation terms depend on how close to the pickup date you cancel; we’ll explain any fees when you make the change.',
    },
  ],
  'motor-leasing': [
    {
      question: 'Can I lease motorbikes for my business?',
      answer:
        'Yes. We lease motorbikes to delivery and logistics businesses. Contact us to discuss your fleet size, contract length, and we’ll guide you through onboarding and contract setup.',
    },
    {
      question: 'What types of motorbikes do you offer for leasing?',
      answer:
        'We offer a range of bikes suited for delivery and last-mile logistics. Options and availability depend on your region; our team can recommend the best fit for your operations.',
    },
    {
      question: 'What is included in the leasing contract?',
      answer:
        'Terms vary by package but typically include the vehicle, basic maintenance, and agreed servicing. Insurance and fuel are often separate. We’ll outline everything clearly before you sign.',
    },
    {
      question: 'How long are typical leasing contracts?',
      answer:
        'Contracts are usually from a few months to multiple years. Shorter commitments may be available; discuss your needs with our team for a tailored offer.',
    },
    {
      question: 'Who handles maintenance and repairs?',
      answer:
        'We coordinate maintenance and repairs as part of the lease. You report issues through your account or our support channel, and we arrange servicing according to the contract.',
    },
  ],
  'rider-application': [
    {
      question: 'How do I apply to become a rider?',
      answer:
        'Visit the rider application section at the motorbike leasing page on our site or contact us to start. You’ll submit your details, documents, and we’ll walk you through verification and onboarding.',
    },
    {
      question: 'What do I need to qualify as a rider?',
      answer:
        'You need a valid licence for the vehicle type, to meet our age and experience requirements, and to pass our verification process. Full criteria are on the Rules & Requirements page.',
    },
    {
      question: 'Do I need my own bike or can I use one from Cruise Logistics?',
      answer:
        'You can join with your own approved bike or use a bike provided through our leasing programme, depending on availability and your agreement with your patron.',
    },
    {
      question: 'How does payment work for riders?',
      answer:
        'Earnings and payment cycles are set between you and your patron (employer or partner). We may provide tools for tracking and payouts; details depend on your contract.',
    },
    {
      question: 'What support do riders get?',
      answer:
        'Riders get access to support for vehicle issues, and general queries. Your patron may also provide training and operational support. We’ll explain what’s available during onboarding.',
    },
  ],
  'become-patron': [
    {
      question: 'What is a patron?',
      answer:
        'A patron is a business or partner that uses our platform to manage fleet and riders—e.g. delivery companies that lease bikes and onboard riders through Cruise Logistics.',
    },
    {
      question: 'How do I become a patron?',
      answer:
        'Contact us with your business details and fleet needs. We’ll discuss requirements, contracts, and set up your patron account so you can manage vehicles and riders.',
    },
    {
      question: 'What can I manage as a patron?',
      answer:
        'Patrons can manage leased vehicles, rider applications, assignments, and (depending on your package) maintenance, insurance, and reporting through the patron portal.',
    },
    {
      question: 'Is there a minimum fleet size or contract length?',
      answer:
        'Minimums depend on the product (e.g. motorbike leasing vs. rider management). Our team will outline minimum fleet size and contract terms when you contact us.',
    },
    {
      question: 'How do I get support as a patron?',
      answer:
        'Patrons have a dedicated channel for account and operational support. Use the Contact page or your portal to reach us; we’ll respond as soon as possible.',
    },
  ],
};

export function FAQ() {
  return (
    <>
      <Helmet>
        <title>FAQ – Cruise Logistics</title>
        <meta
          name="description"
          content="Frequently asked questions about Cruise Logistics car rentals, motorbike leasing, rider applications, and becoming a patron."
        />
      </Helmet>
      <div className="min-h-screen">
        <FAQTabs
          title="Frequently Asked Questions"
          subtitle="Let's answer some questions"
          categories={categories}
          faqData={faqData}
        />
      </div>
    </>
  );
}
