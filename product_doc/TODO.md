# Cruise Logistics – Feature Todo List

Based on **prd.docx** (Cruise Logistics PRD) and **fleet_kings_design_document.docx** (Fleet Kings UI/UX design).  
**Design direction:** The Fleet Kings design document defines how Cruise Logistics should look—dark luxury, premium feel, gold/bronze accents, and luxury typography across the whole platform.

---

## 1. Corporate website (public)

- [x] **1.1** Set up public pages: Home, About Us, Services, Car Rentals, Motorbike Leasing, How It Works, Rules & Requirements (Car Rentals), Contact, FAQ.
- [x] **1.2** Apply Fleet Kings design: dark luxury UI, minimal high-impact layouts, premium typography, gold/bronze accents, CTA-focused (per design doc).
- [x] **1.3** Add SEO (meta tags, structured data) and accessibility.
- [x] **1.4** Ensure responsive layout and fast loading.
- [x] **1.5** Add authentication entry points (login/register links or modals).

---

## 2. Car rental platform

- [ ] **2.1** Car listing: browse cars with images, specs, availability calendar, pricing, rental conditions.
- [ ] **2.2** Booking flow: select car → choose dates → view availability → pricing calculation → accept rental rules → enter details → confirmation.
- [ ] **2.3** Support guest booking and registered user booking.
- [ ] **2.4** Availability management and booking status tracking.
- [ ] **2.5** Enforce rental rules in UI and (later) backend.
- [ ] **2.6** Add payment-ready structure (no gateway implementation; only architecture/placeholders).

---

## 3. Business motorbike leasing

- [ ] **3.1** Business onboarding flow and business accounts.
- [ ] **3.2** Business dashboard: number of bikes assigned, contract duration, contract details, assigned riders, lease status.
- [ ] **3.3** Admin: business onboarding, contract creation, bike allocation.

---

## 4. Patron (bike owners) portal

- [ ] **4.1** Secure patron login.
- [ ] **4.2** Patron views: owned bikes, assigned businesses.
- [ ] **4.3** Earnings: weekly revenue, monthly revenue, financial summaries dashboard.

---

## 5. Rider management

- [ ] **5.1** Admin: rider profiles, assigned bike, assigned business, rider status.
- [ ] **5.2** Admin: assignment history and management actions.

---

## 6. Bike maintenance and faults

- [ ] **6.1** Admin: log bike faults, track maintenance status.
- [ ] **6.2** Admin: assign repair actions and view maintenance history.

---

## 7. Admin portal

- [ ] **7.1** Central dashboard: bookings, cars, bikes, businesses, patrons, riders, contracts, fault tracking.
- [ ] **7.2** Analytics dashboard, revenue overview, notifications.
- [ ] **7.3** Any additional operational tools needed for logistics (as per PRD).

---

## 8. Technical foundation

- [ ] **8.1** Feature-based folder structure and scalable architecture.
- [ ] **8.2** Database schema (entities and relationships).
- [ ] **8.3** Role-based access control (RBAC) and authentication flows.
- [ ] **8.4** API architecture (REST), state management, reusable component system.
- [ ] **8.5** Dashboard layout system; SEO and performance strategy; security and scalability (as per PRD).

---

## 9. Design system (Fleet Kings – applies to entire Cruise Logistics platform)

- [ ] **9.1** Design tokens from Fleet Kings: Primary Black (background), Metallic Brown (accent), Dark Grey (secondary), Bronze Gold (luxury accent), White (text), Muted Gold (secondary accent); luxury serif headings (Playfair Display / Cinzel), modern sans-serif body (Inter / Poppins).
- [ ] **9.2** Layout patterns and component variants; accessible UX; luxury-first visual hierarchy, minimal but powerful, emotion-driven (per design doc).

---

## 10. Fleet Kings design – platform-wide implementation

- [ ] **10.1** Homepage/public sections: Nav (Logo, Home, Fleet, Services, About, Contact, Book Now), Hero (full-screen image/video, headline, CTAs), Featured Cars, Vehicle Details (gallery, metrics, specs, booking), Luxury Experience (chauffeur, corporate, VIP, airport), Testimonials, Booking section, Footer.
- [ ] **10.2** UI components (use across site): primary (gold/bronze) and secondary (transparent + gold border) buttons; vehicle/card components (rounded, shadow, hover); image gallery (slider, fullscreen, thumbnails).
- [ ] **10.3** Microinteractions: hover (image zoom, button highlight); scroll (fade-in, slide-up); smooth page transitions.
- [ ] **10.4** Responsive: desktop 1440px+, tablet 768–1024px, mobile 375–767px; hamburger nav and stacked layout on mobile.
- [ ] **10.5** Performance: lazy load images, compress media, CDN, SEO metadata; conversion focus on Hero, vehicle cards, booking section, footer.

---

## Implementation notes

- **Design:** The Fleet Kings design document is the visual standard for Cruise Logistics. All PRD features (corporate site, car rental, motorbike leasing, admin, etc.) should use this look: dark luxury, premium feel, gold/bronze accents, luxury typography.
- **Order:** You can reorder (e.g. do Technical foundation and Design system early). Section 10 implements the Fleet Kings design doc across the platform.
- **Source docs:** `prd.docx` (features and scope), `fleet_kings_design_document.docx` (look and feel).
