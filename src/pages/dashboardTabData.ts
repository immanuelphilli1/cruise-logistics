/**
 * Sample data and column configs for dashboard tab tables.
 */

// Car Bookings
export interface CarBookingRow {
  id: string;
  ref: string;
  vehicle: string;
  customer: string;
  startDate: string;
  endDate: string;
  status: 'accepted' | 'denied';
}
export const carBookingsRows: CarBookingRow[] = [
  { id: '1', ref: 'CB-1024', vehicle: 'Mercedes S-Class', customer: 'Acme Corp', startDate: '10 Mar 2025', endDate: '24 Mar 2025', status: 'accepted' },
  { id: '2', ref: 'CB-1023', vehicle: 'Toyota Camry', customer: 'Jane Doe', startDate: '01 Mar 2025', endDate: '15 Mar 2025', status: 'accepted' },
  { id: '3', ref: 'CB-1022', vehicle: 'BMW 3 Series', customer: 'John Smith', startDate: '20 Feb 2025', endDate: '05 Mar 2025', status: 'denied' },
];

// Cars / Fleet
export interface CarRow {
  id: string;
  reg: string;
  model: string;
  amount: number;
  imageUrl?: string;
  location: string;
  dueService: string;
  status: 'active' | 'paused' | 'inactive';
}
export const carsRows: CarRow[] = [
  { id: '1', reg: 'GT-1234-25', model: 'Mercedes S-Class', amount: 1200, location: 'Accra Central', dueService: '15 Apr 2025', status: 'active' },
  { id: '2', reg: 'GT-5678-25', model: 'Toyota Camry', amount: 900, location: 'Kumasi Depot', dueService: '22 Mar 2025', status: 'active' },
  { id: '3', reg: 'GT-9012-25', model: 'BMW 3 Series', amount: 1500, location: 'Tema', dueService: '10 Mar 2025', status: 'paused' },
];

// Motorbike Leasing
export interface MotorbikeLeaseRow {
  id: string;
  bikeId: string;
  business: string;
  startDate: string;
  endDate: string;
  riders: number;
  status: 'active' | 'paused' | 'inactive';
}
export const motorbikeLeasingRows: MotorbikeLeaseRow[] = [
  { id: '1', bikeId: 'Bike #01–10', business: 'Delivery Co', startDate: '01 Jan 2025', endDate: '31 Dec 2025', riders: 10, status: 'active' },
  { id: '2', bikeId: 'Bike #11–20', business: 'Courier Plus', startDate: '15 Feb 2025', endDate: '14 Feb 2026', riders: 8, status: 'active' },
  { id: '3', bikeId: 'Bike #21–25', business: 'Quick Ride', startDate: '01 Mar 2024', endDate: '28 Feb 2025', riders: 5, status: 'inactive' },
];

// Riders
export interface RiderRow {
  id: string;
  name: string;
  bike: string;
  business: string;
  assignedDate: string;
  status: 'active' | 'paused' | 'inactive';
  nationalId?: string;
  bikeChassisNumber?: string;
  driversLicence?: string;
}
export const ridersRows: RiderRow[] = [
  { id: '1', name: 'Kofi Mensah', bike: 'Bike #03', business: 'Delivery Co', assignedDate: '10 Jan 2025', status: 'active', nationalId: 'GHA-123456789-0', bikeChassisNumber: 'JH2RC4100YK123456', driversLicence: 'DL-2024-001234' },
  { id: '2', name: 'Ama Asante', bike: 'Bike #07', business: 'Courier Plus', assignedDate: '20 Feb 2025', status: 'active', nationalId: 'GHA-987654321-1', bikeChassisNumber: 'JH2RC4100YK789012', driversLicence: 'DL-2024-005678' },
  { id: '3', name: 'Yaw Boateng', bike: 'Bike #12', business: 'Delivery Co', assignedDate: '05 Mar 2025', status: 'active', nationalId: 'GHA-456789123-2', bikeChassisNumber: 'JH2RC4100YK345678', driversLicence: 'DL-2023-009012' },
  { id: '4', name: 'Esi Johnson', bike: '—', business: 'Quick Ride', assignedDate: '—', status: 'paused', nationalId: 'GHA-321654987-3', bikeChassisNumber: '—', driversLicence: 'DL-2022-003456' },
];

// Fault Reporting
export interface FaultRow {
  id: string;
  ref: string;
  asset: string;
  reportedBy: string;
  reportedAt: string;
  description: string;
  status: 'active' | 'paused' | 'inactive';
}
export const faultRows: FaultRow[] = [
  { id: '1', ref: 'FR-101', asset: 'Bike #23', reportedBy: 'Kofi M.', reportedAt: '8 Mar 2025', description: 'Flat tyre', status: 'active' },
  { id: '2', ref: 'FR-100', asset: 'Bike #07', reportedBy: 'Ama A.', reportedAt: '7 Mar 2025', description: 'Brake noise', status: 'paused' },
  { id: '3', ref: 'FR-099', asset: 'Bike #12', reportedBy: 'Yaw B.', reportedAt: '5 Mar 2025', description: 'Resolved – oil change', status: 'inactive' },
];

// Patron dashboard: my bikes
export interface PatronBikeRow {
  id: string;
  bikeId: string;
  model: string;
  assignedTo: string;
  status: 'active' | 'available' | 'maintenance';
}
export const patronBikesRows: PatronBikeRow[] = [
  { id: '1', bikeId: 'Bike #03', model: 'Honda CG 125', assignedTo: 'Delivery Co', status: 'active' },
  { id: '2', bikeId: 'Bike #07', model: 'Honda CG 125', assignedTo: 'Courier Plus', status: 'active' },
  { id: '3', bikeId: 'Bike #12', model: 'Honda CG 125', assignedTo: 'Delivery Co', status: 'active' },
  { id: '4', bikeId: 'Bike #15', model: 'Honda CG 125', assignedTo: '—', status: 'available' },
];

// Patron dashboard: revenue breakdown
export interface RevenueBreakdownItem {
  period: string;
  amount: number;
  type: 'monthly' | 'bi-weekly';
}
export const patronRevenueMonthly: RevenueBreakdownItem[] = [
  { period: 'Jan 2025', amount: 4200, type: 'monthly' },
  { period: 'Feb 2025', amount: 4400, type: 'monthly' },
  { period: 'Mar 2025', amount: 4600, type: 'monthly' },
];
export const patronRevenueBiWeekly: RevenueBreakdownItem[] = [
  { period: '1–14 Mar 2025', amount: 2200, type: 'bi-weekly' },
  { period: '15–28 Mar 2025', amount: 2400, type: 'bi-weekly' },
];
export const patronTotalRevenue = 13200; // sum of sample or display value

// Patron dashboard: businesses my bikes have been assigned to
export interface PatronBusinessRow {
  id: string;
  name: string;
  bikesAssigned: string;
  startDate: string;
  status: string;
}
export const patronBusinessesRows: PatronBusinessRow[] = [
  { id: '1', name: 'Delivery Co', bikesAssigned: 'Bike #03, #12', startDate: '01 Jan 2025', status: 'Active' },
  { id: '2', name: 'Courier Plus', bikesAssigned: 'Bike #07', startDate: '15 Feb 2025', status: 'Active' },
  { id: '3', name: 'Quick Ride', bikesAssigned: 'Bike #21–25', startDate: '01 Mar 2024', status: 'Ended' },
];

// Patron dashboard: upcoming payment & admin payment status
export interface PatronUpcomingPayment {
  amount: number;
  dueDate: string;
  period: string;
}
export const patronUpcomingPayment: PatronUpcomingPayment = {
  amount: 2400,
  dueDate: '28 Mar 2025',
  period: '15–28 Mar 2025',
};

export interface PatronPaymentHistoryItem {
  id: string;
  period: string;
  amount: number;
  status: 'paid' | 'outstanding';
  paidAt?: string;
}
export const patronPaymentHistory: PatronPaymentHistoryItem[] = [
  { id: '1', period: '1–14 Mar 2025', amount: 2200, status: 'paid', paidAt: '16 Mar 2025' },
  { id: '2', period: '15–28 Feb 2025', amount: 2200, status: 'paid', paidAt: '02 Mar 2025' },
  { id: '3', period: '15–28 Mar 2025', amount: 2400, status: 'outstanding' },
];
export const patronTotalPaid = 8800; // total amount admin has paid to patron
export const patronTotalOutstanding = 2400; // current outstanding

// Patron dashboard: earnings per bike (different companies pay different amounts)
export interface PatronEarningsPerBike {
  bikeId: string;
  assignedTo: string;
  totalEarnings: number;
  period: string; // e.g. "Mar 2025"
}
export const patronEarningsPerBike: PatronEarningsPerBike[] = [
  { bikeId: 'Bike #03', assignedTo: 'Delivery Co', totalEarnings: 4800, period: 'Mar 2025' },
  { bikeId: 'Bike #07', assignedTo: 'Courier Plus', totalEarnings: 4200, period: 'Mar 2025' },
  { bikeId: 'Bike #12', assignedTo: 'Delivery Co', totalEarnings: 4200, period: 'Mar 2025' },
];

// Business patron dashboard: they pay Cruise Logistics (no revenue; billing focus)
export interface BusinessInvoiceItem {
  id: string;
  period: string;
  amount: number;
  status: 'paid' | 'due' | 'overdue';
  dueDate?: string;
}
export const businessInvoices: BusinessInvoiceItem[] = [
  { id: '1', period: 'Mar 2025', amount: 18400, status: 'due', dueDate: '31 Mar 2025' },
  { id: '2', period: 'Feb 2025', amount: 17600, status: 'paid', dueDate: '28 Feb 2025' },
  { id: '3', period: 'Jan 2025', amount: 16800, status: 'paid', dueDate: '31 Jan 2025' },
];
export const businessNextInvoiceAmount = 18400;
export const businessNextInvoiceDue = '31 Mar 2025';
export const businessAmountDue = 18400;
export const businessLeasedBikesCount = 18; // bikes this business has on lease
export const businessRidersCount = 8; // riders assigned to this business
