import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  LayoutDashboard,
  Car,
  Bike,
  Users,
  Wrench,
  ExternalLink,
  ChevronsRight,
  TrendingUp,
  Bell,
  Settings,
  HelpCircle,
  User,
  LogOut,
  FileText,
  ClipboardList,
  ScrollText,
  DollarSign,
  Building2,
  X,
  ChevronDown,
  Calendar,
  CheckCircle2,
  Clock,
  Menu,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ManagementTable } from '../components/ManagementTable';
import { addDynamicUser, type UserRole } from '../config/sampleCredentials';
import {
  carBookingsRows,
  carsRows,
  motorbikeLeasingRows,
  ridersRows,
  faultRows,
  patronBikesRows,
  patronRevenueMonthly,
  patronRevenueBiWeekly,
  patronTotalRevenue,
  patronBusinessesRows,
  patronUpcomingPayment,
  patronPaymentHistory,
  patronTotalPaid,
  patronTotalOutstanding,
  patronEarningsPerBike,
  businessInvoices,
  businessNextInvoiceAmount,
  businessNextInvoiceDue,
  businessAmountDue,
  businessLeasedBikesCount,
  businessRidersCount,
  type CarBookingRow,
  type CarRow,
  type MotorbikeLeaseRow,
  type RiderRow,
  type FaultRow,
} from './dashboardTabData';

type NavId =
  | 'dashboard'
  | 'car-bookings'
  | 'cars'
  | 'motorbike-leasing'
  | 'riders'
  | 'fault-reporting'
  | 'agreement'
  | 'view-site'
  | 'settings'
  | 'help';

const NAV_ITEMS: { id: NavId; title: string; icon: typeof LayoutDashboard; notifs?: number }[] = [
  { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
  { id: 'car-bookings', title: 'Car Bookings', icon: ClipboardList, notifs: 3 },
  { id: 'cars', title: 'Cars / Fleet', icon: Car },
  { id: 'motorbike-leasing', title: 'Motorbike Leasing', icon: Bike },
  { id: 'riders', title: 'Riders', icon: Users, notifs: 5 },
  { id: 'fault-reporting', title: 'Fault Reporting', icon: Wrench },
  { id: 'agreement', title: 'Agreement', icon: ScrollText },
  { id: 'view-site', title: 'View Site', icon: ExternalLink },
  { id: 'settings', title: 'Settings', icon: Settings },
  { id: 'help', title: 'Help & Support', icon: HelpCircle },
];

function getNavIdsForRole(role: 'admin' | 'business' | 'patron' | undefined): NavId[] {
  if (!role) return ['dashboard', 'view-site', 'settings', 'help'];
  if (role === 'patron') {
    return ['dashboard', 'riders', 'agreement', 'view-site', 'settings', 'help'];
  }
  if (role === 'business') {
    return ['dashboard', 'riders', 'fault-reporting', 'agreement', 'view-site', 'settings', 'help'];
  }
  return ['dashboard', 'car-bookings', 'cars', 'motorbike-leasing', 'riders', 'fault-reporting', 'view-site', 'settings', 'help'];
}

type PatronOverlay = 'revenue' | 'bikes' | 'businesses' | null;

function SidebarOption({
  icon: Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
  id,
  href,
  onNavigate,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  selected: NavId | null;
  setSelected: (id: NavId) => void;
  open: boolean;
  notifs?: number;
  id: NavId;
  href?: string;
  onNavigate?: () => void;
}) {
  const isSelected = selected === id;
  const content = (
    <span
      className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${
        isSelected
          ? 'bg-bronze-gold/10 text-bronze-gold border-l-2 border-bronze-gold shadow-sm'
          : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary-black'
      }`}
    >
      <span className="grid h-full w-12 shrink-0 place-content-center">
        <Icon className="h-4 w-4" />
      </span>
      {open && (
        <span className="text-sm font-medium transition-opacity duration-200 opacity-100">
          {title}
        </span>
      )}
      {notifs != null && notifs > 0 && open && (
        <span className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-bronze-gold text-xs text-white font-medium">
          {notifs}
        </span>
      )}
    </span>
  );

  if (href?.startsWith('http') || href === '/') {
    return (
      <Link
        to={href || '#'}
        onClick={() => {
          if (id === 'view-site') setSelected(id);
          onNavigate?.();
        }}
        className="block"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setSelected(id);
        onNavigate?.();
      }}
      className="w-full text-left"
    >
      {content}
    </button>
  );
}

function DashboardSidebar({
  open,
  setOpen,
  selected,
  setSelected,
  role,
  onNavigate,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  selected: NavId | null;
  setSelected: (id: NavId) => void;
  role: 'admin' | 'business' | 'patron' | undefined;
  onNavigate?: () => void;
}) {
  const allowedIds = getNavIdsForRole(role);
  const mainNav = NAV_ITEMS.filter((item) => allowedIds.includes(item.id));

  return (
    <nav
      className={`fixed lg:relative inset-y-0 left-0 z-40 flex h-screen flex-col shrink-0 border-r border-neutral-200 bg-white p-2 shadow-sm transition-all duration-300 ease-in-out ${
        open ? 'w-64 translate-x-0 lg:w-64' : 'w-64 -translate-x-full lg:translate-x-0 lg:w-16'
      }`}
      aria-label="Main navigation"
    >
      <div className="mb-6 shrink-0 border-b border-neutral-200 pb-4">
        <div className="flex items-center gap-3 rounded-md p-2">
          <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-bronze-gold shadow-sm">
            <Car className="h-5 w-5 text-white" />
          </div>
          {open && (
            <div className="min-w-0">
              <span className="block truncate text-sm font-semibold text-primary-black">
                Cruise Logistics
              </span>
              <span className="block text-xs text-neutral-500">Dashboard</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1 mb-8 flex-1 overflow-y-auto min-h-0">
        {mainNav.map((item) => (
          <SidebarOption
            key={item.id}
            icon={item.icon}
            title={item.title}
            id={item.id}
            selected={selected}
            setSelected={setSelected}
            open={open}
            notifs={item.notifs}
            href={item.id === 'view-site' ? '/' : undefined}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="mt-auto shrink-0 flex w-full items-center border-t border-neutral-200 p-3 hover:bg-neutral-50 transition-colors"
        aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <span className="grid size-10 place-content-center">
          <ChevronsRight
            className={`h-4 w-4 text-neutral-500 transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </span>
        {open && (
          <span className="text-sm font-medium text-neutral-600">Collapse</span>
        )}
      </button>
    </nav>
  );
}

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selected, setSelected] = useState<NavId>('dashboard');
  const [carBookings, setCarBookings] = useState<CarBookingRow[]>(carBookingsRows);
  const [cars, setCars] = useState<CarRow[]>(carsRows);
  const [motorbikeLeases, setMotorbikeLeases] = useState<MotorbikeLeaseRow[]>(motorbikeLeasingRows);
  const [riders, setRiders] = useState<RiderRow[]>(ridersRows);
  const [faults, setFaults] = useState<FaultRow[]>(faultRows);
  const [showRaiseFaultModal, setShowRaiseFaultModal] = useState(false);
  const [newFaultAsset, setNewFaultAsset] = useState('');
  const [newFaultDescription, setNewFaultDescription] = useState('');
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [showBusinessesModal, setShowBusinessesModal] = useState(false);
  const [showAddLeaseModal, setShowAddLeaseModal] = useState(false);
  const [newCarReg, setNewCarReg] = useState('');
  const [newCarModel, setNewCarModel] = useState('');
  const [newCarAmount, setNewCarAmount] = useState('');
  const [newCarImageUrl, setNewCarImageUrl] = useState('');
  const [newCarLocation, setNewCarLocation] = useState('');
  const [newCarDueService, setNewCarDueService] = useState('');
  const [newLeaseBikes, setNewLeaseBikes] = useState('');
  const [newLeaseBusiness, setNewLeaseBusiness] = useState('');
  const [newLeaseRiders, setNewLeaseRiders] = useState('');
  const [newLeaseStart, setNewLeaseStart] = useState('');
  const [newLeaseEnd, setNewLeaseEnd] = useState('');
  const [showAdminCreateModal, setShowAdminCreateModal] = useState(false);
  const [adminCreateType, setAdminCreateType] = useState<
    'bike' | 'rider' | 'business-user' | 'patron-user' | null
  >(null);
  const [newBikeId, setNewBikeId] = useState('');
  const [newBikeBusiness, setNewBikeBusiness] = useState('');
  const [newRiderName, setNewRiderName] = useState('');
  const [newRiderBike, setNewRiderBike] = useState('');
  const [newRiderBusiness, setNewRiderBusiness] = useState('');
  const [newRiderNationalId, setNewRiderNationalId] = useState('');
  const [newRiderBikeChassisNumber, setNewRiderBikeChassisNumber] = useState('');
  const [newRiderDriversLicence, setNewRiderDriversLicence] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');
  const [credentialMessage, setCredentialMessage] = useState<string | null>(null);
  const [patronOverlay, setPatronOverlay] = useState<PatronOverlay>(null);
  const [expandedBikeId, setExpandedBikeId] = useState<string | null>(null);
  const [expandedBusinessId, setExpandedBusinessId] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';
  const canRaiseFault = user?.role === 'business' || user?.role === 'patron';
  const isPatron = user?.role === 'patron';
  const isBusiness = user?.role === 'business';
  const patronBikeIds = useMemo(() => new Set(patronBikesRows.map((b) => b.bikeId)), []);
  const patronRiders = useMemo(() => ridersRows.filter((r) => r.bike !== '—' && patronBikeIds.has(r.bike)), [patronBikeIds]);
  const leasedBusinessesCount = useMemo(
    () => new Set(motorbikeLeases.map((m) => m.business)).size,
    [motorbikeLeases]
  );

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const openAdminCreateModal = (
    type: 'bike' | 'rider' | 'business-user' | 'patron-user'
  ) => {
    setAdminCreateType(type);
    setCredentialMessage(null);
    setShowAdminCreateModal(true);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard – Cruise Logistics</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="flex min-h-screen w-full bg-neutral-50 text-primary-black min-w-0">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden
          />
        )}
        <DashboardSidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          selected={selected}
          setSelected={setSelected}
          role={user?.role}
          onNavigate={() => setSidebarOpen(false)}
        />

        <main className="flex-1 overflow-auto min-w-0">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 bg-white px-4 py-3 sm:px-6 sm:py-4 shadow-sm">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 transition-colors shrink-0"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-primary-black truncate sm:text-2xl">Dashboard</h1>
                <p className="text-neutral-600 text-sm sm:text-base truncate">
                  Welcome back{user?.displayName ? `, ${user.displayName}` : ''}.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                className="relative p-2 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:text-primary-black hover:bg-neutral-50 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              </button>
              <button
                type="button"
                className="p-2 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 transition-colors"
                aria-label="Profile"
              >
                <User className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white p-2 sm:px-4 sm:py-2 text-neutral-600 hover:bg-neutral-50 hover:text-primary-black transition-colors"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline text-sm font-medium">Log out</span>
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {selected === 'dashboard' && isPatron && (
            <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <button
                type="button"
                onClick={() => setPatronOverlay('revenue')}
                className="p-4 sm:p-6 rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow text-left w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-bronze-gold/10 rounded-lg">
                    <DollarSign className="h-5 w-5 text-bronze-gold" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <h3 className="font-medium text-neutral-600 mb-1">Total revenue</h3>
                <p className="text-2xl font-bold text-primary-black">GH¢ {patronTotalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">Click for breakdown</p>
              </button>

              <button
                type="button"
                onClick={() => setPatronOverlay('bikes')}
                className="p-4 sm:p-6 rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow text-left w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Bike className="h-5 w-5 text-purple-600" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <h3 className="font-medium text-neutral-600 mb-1">Number of bikes</h3>
                <p className="text-2xl font-bold text-primary-black">{patronBikesRows.length}</p>
                <p className="text-sm text-green-600 mt-1">Click to view details</p>
              </button>

              <button
                type="button"
                onClick={() => setSelected('riders')}
                className="p-4 sm:p-6 rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow text-left w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <h3 className="font-medium text-neutral-600 mb-1">Riders assigned to my bikes</h3>
                <p className="text-2xl font-bold text-primary-black">{patronRiders.length}</p>
                <p className="text-sm text-green-600 mt-1">Click to open Riders tab</p>
              </button>

              <button
                type="button"
                onClick={() => setPatronOverlay('businesses')}
                className="p-4 sm:p-6 rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow text-left w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <h3 className="font-medium text-neutral-600 mb-1">Businesses my bikes assigned to</h3>
                <p className="text-2xl font-bold text-primary-black">{patronBusinessesRows.length}</p>
                <p className="text-sm text-green-600 mt-1">Click to view details</p>
              </button>
            </div>

            {/* Patron: Payment summary – upcoming, paid by admin, outstanding */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 shadow-sm mb-6 sm:mb-8">
              <h3 className="text-lg font-semibold text-primary-black mb-4">Payments</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-amber-600" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">Upcoming payment</span>
                  </div>
                  <p className="text-2xl font-bold text-primary-black">GH¢ {patronUpcomingPayment.amount.toLocaleString()}</p>
                  <p className="text-sm text-neutral-600 mt-1">Due {patronUpcomingPayment.dueDate}</p>
                  <p className="text-xs text-neutral-500">{patronUpcomingPayment.period}</p>
                </div>
                <div className="rounded-xl border border-green-200 bg-green-50/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-green-700">Paid by admin</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">GH¢ {patronTotalPaid.toLocaleString()}</p>
                  <p className="text-sm text-neutral-600 mt-1">Total received</p>
                </div>
                <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-red-600" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-red-700">Outstanding</span>
                  </div>
                  <p className="text-2xl font-bold text-red-700">GH¢ {patronTotalOutstanding.toLocaleString()}</p>
                  <p className="text-sm text-neutral-600 mt-1">Awaiting payment</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Payment history</p>
                <div className="divide-y divide-neutral-100 rounded-lg border border-neutral-200 overflow-hidden">
                  {patronPaymentHistory.map((item) => (
                    <div key={item.id} className="flex flex-col gap-2 px-4 py-3 bg-white hover:bg-neutral-50 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                      <span className="text-sm text-primary-black">{item.period}</span>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="font-medium tabular-nums text-primary-black">GH¢ {item.amount.toLocaleString()}</span>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium w-fit ${
                          item.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {item.status === 'paid' ? `Paid ${item.paidAt ?? ''}` : 'Outstanding'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {patronOverlay === 'revenue' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-md"
                  onClick={() => setPatronOverlay(null)}
                >
                  <motion.div
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-neutral-200/80 ring-2 sm:ring-4 ring-bronze-gold/10 flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="shrink-0 bg-gradient-to-r from-bronze-gold/20 via-bronze-gold/10 to-transparent border-b border-bronze-gold/20 p-4 sm:p-5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-bronze-gold/20 border border-bronze-gold/30">
                          <DollarSign className="h-6 w-6 text-bronze-gold" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-primary-black">Revenue breakdown</h3>
                          <p className="text-xs text-neutral-500 mt-0.5">Monthly & bi-weekly</p>
                        </div>
                      </div>
                      <button type="button" onClick={() => setPatronOverlay(null)} className="p-2 rounded-xl hover:bg-white/60 transition-colors" aria-label="Close">
                        <X className="h-5 w-5 text-neutral-600" />
                      </button>
                    </div>
                    <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5">
                      <div className="rounded-xl bg-gradient-to-br from-bronze-gold/5 to-transparent border border-bronze-gold/20 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">Total revenue</p>
                        <p className="text-3xl font-bold text-bronze-gold">GH¢ {patronTotalRevenue.toLocaleString()}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 rounded-full bg-bronze-gold" /> Monthly
                        </h4>
                        <div className="space-y-2">
                          {patronRevenueMonthly.map((row, i) => (
                            <motion.div
                              key={row.period}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex justify-between items-center py-2.5 px-3 rounded-lg hover:bg-white transition-colors"
                            >
                              <span className="text-primary-black font-medium">{row.period}</span>
                              <span className="font-bold text-bronze-gold tabular-nums">GH¢ {row.amount.toLocaleString()}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 rounded-full bg-bronze-gold" /> Bi-weekly
                        </h4>
                        <div className="space-y-2">
                          {patronRevenueBiWeekly.map((row, i) => (
                            <motion.div
                              key={row.period}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.15 + i * 0.05 }}
                              className="flex justify-between items-center py-2.5 px-3 rounded-lg hover:bg-white transition-colors"
                            >
                              <span className="text-primary-black font-medium">{row.period}</span>
                              <span className="font-bold text-bronze-gold tabular-nums">GH¢ {row.amount.toLocaleString()}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      </div>
                      <div className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 rounded-full bg-bronze-gold" /> Per bike (earnings by company)
                        </h4>
                        <p className="text-xs text-neutral-500 mb-3">Amount you earn per bike; companies pay differently.</p>
                        <div className="space-y-2">
                          {patronEarningsPerBike.map((row, i) => (
                            <motion.div
                              key={row.bikeId}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.25 + i * 0.05 }}
                              className="flex justify-between items-center py-2.5 px-3 rounded-lg hover:bg-white transition-colors"
                            >
                              <div>
                                <span className="font-medium text-primary-black block">{row.bikeId}</span>
                                <span className="text-xs text-neutral-500">{row.assignedTo} · {row.period}</span>
                              </div>
                              <span className="font-bold text-bronze-gold tabular-nums">GH¢ {row.totalEarnings.toLocaleString()}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
              {patronOverlay === 'bikes' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-md"
                  onClick={() => setPatronOverlay(null)}
                >
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-neutral-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between p-3 sm:p-4 border-b border-neutral-200 bg-neutral-50/50 gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-primary-black truncate">My bikes</h3>
                      <button type="button" onClick={() => setPatronOverlay(null)} className="p-2 rounded-lg hover:bg-neutral-200" aria-label="Close">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="divide-y divide-neutral-100 overflow-y-auto max-h-[70vh]">
                      {patronBikesRows.map((row, index) => (
                        <motion.div
                          key={row.id}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <motion.button
                            type="button"
                            onClick={() => setExpandedBikeId((id) => (id === row.id ? null : row.id))}
                            className="w-full p-3 sm:p-4 text-left transition-colors hover:bg-neutral-50 active:bg-neutral-100 flex flex-wrap items-center gap-2 sm:gap-4"
                            whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                          >
                            <motion.div
                              animate={{ rotate: expandedBikeId === row.id ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="shrink-0"
                            >
                              <ChevronDown className="h-4 w-4 text-neutral-500" />
                            </motion.div>
                            <span className="shrink-0 font-semibold text-primary-black w-20 sm:w-24">{row.bikeId}</span>
                            <span className="shrink-0 text-xs sm:text-sm text-neutral-600 min-w-0">{row.model}</span>
                            <span className="flex-1 min-w-0 truncate text-xs sm:text-sm text-neutral-600">{row.assignedTo}</span>
                            <span className={`shrink-0 px-2 py-1 rounded-lg text-xs font-medium ${
                              row.status === 'active' ? 'bg-green-100 text-green-700' :
                              row.status === 'available' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                            }`}>{row.status}</span>
                          </motion.button>
                          <AnimatePresence initial={false}>
                            {expandedBikeId === row.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden border-t border-neutral-100 bg-neutral-50/80"
                              >
                                <div className="grid grid-cols-2 gap-4 p-4 text-sm">
                                  <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">Bike ID</p>
                                    <p className="font-medium text-primary-black">{row.bikeId}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">Model</p>
                                    <p className="text-primary-black">{row.model}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">Assigned to</p>
                                    <p className="text-primary-black">{row.assignedTo}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">Status</p>
                                    <p className="text-primary-black capitalize">{row.status}</p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
              {patronOverlay === 'businesses' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-md"
                  onClick={() => setPatronOverlay(null)}
                >
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-neutral-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between p-3 sm:p-4 border-b border-neutral-200 bg-neutral-50/50 gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-primary-black min-w-0">Businesses my bikes have been assigned to</h3>
                      <button type="button" onClick={() => setPatronOverlay(null)} className="p-2 rounded-lg hover:bg-neutral-200" aria-label="Close">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="divide-y divide-neutral-100 overflow-y-auto max-h-[70vh]">
                      {patronBusinessesRows.map((row, index) => (
                        <motion.div
                          key={row.id}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <motion.button
                            type="button"
                            onClick={() => setExpandedBusinessId((id) => (id === row.id ? null : row.id))}
                            className="w-full p-3 sm:p-4 text-left transition-colors hover:bg-neutral-50 active:bg-neutral-100 flex flex-wrap items-center gap-2 sm:gap-4"
                            whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                          >
                            <motion.div
                              animate={{ rotate: expandedBusinessId === row.id ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="shrink-0"
                            >
                              <ChevronDown className="h-4 w-4 text-neutral-500" />
                            </motion.div>
                            <span className="shrink-0 font-semibold text-primary-black min-w-0">{row.name}</span>
                            <span className="flex-1 min-w-0 truncate text-xs sm:text-sm text-neutral-600">{row.bikesAssigned}</span>
                            <span className="shrink-0 text-xs sm:text-sm text-neutral-600">{row.startDate}</span>
                            <span className={`shrink-0 px-2 py-1 rounded-lg text-xs font-medium ${
                              row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-neutral-200 text-neutral-700'
                            }`}>{row.status}</span>
                          </motion.button>
                          <AnimatePresence initial={false}>
                            {expandedBusinessId === row.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden border-t border-neutral-100 bg-neutral-50/80"
                              >
                                <div className="grid grid-cols-2 gap-4 p-4 text-sm">
                                  <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">Business</p>
                                    <p className="font-medium text-primary-black">{row.name}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">Status</p>
                                    <p className="text-primary-black">{row.status}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">Bikes assigned</p>
                                    <p className="text-primary-black">{row.bikesAssigned}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">Start date</p>
                                    <p className="text-primary-black">{row.startDate}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">Riders assigned</p>
                                    <ul className="space-y-1.5">
                                      {ridersRows
                                        .filter((r) => r.business === row.name && r.bike !== '—' && patronBikeIds.has(r.bike))
                                        .map((rider) => (
                                          <li key={rider.id} className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-white border border-neutral-100">
                                            <Users className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                                            <span className="font-medium text-primary-black">{rider.name}</span>
                                            <span className="text-neutral-500 text-xs">· {rider.bike}</span>
                                            <span className={`ml-auto px-2 py-0.5 rounded text-xs font-medium ${
                                              rider.status === 'active' ? 'bg-green-100 text-green-700' :
                                              rider.status === 'paused' ? 'bg-yellow-100 text-yellow-700' : 'bg-neutral-200 text-neutral-600'
                                            }`}>{rider.status}</span>
                                          </li>
                                        ))}
                                      {ridersRows.filter((r) => r.business === row.name && r.bike !== '—' && patronBikeIds.has(r.bike)).length === 0 && (
                                        <li className="text-neutral-500 text-sm py-2">No riders on your bikes for this business.</li>
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            </>
            )}

            {selected === 'dashboard' && isBusiness && (
            <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <button
                type="button"
                onClick={() => setSelected('riders')}
                className="p-4 sm:p-6 rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow text-left w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Bike className="h-5 w-5 text-purple-600" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <h3 className="font-medium text-neutral-600 mb-1 text-sm sm:text-base">Bikes leased</h3>
                <p className="text-xl sm:text-2xl font-bold text-primary-black">{businessLeasedBikesCount}</p>
                <p className="text-xs sm:text-sm text-green-600 mt-1">Open Riders tab</p>
              </button>

              <button
                type="button"
                onClick={() => setSelected('riders')}
                className="p-4 sm:p-6 rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow text-left w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <h3 className="font-medium text-neutral-600 mb-1 text-sm sm:text-base">Riders</h3>
                <p className="text-xl sm:text-2xl font-bold text-primary-black">{businessRidersCount}</p>
                <p className="text-xs sm:text-sm text-green-600 mt-1">Open Riders tab</p>
              </button>

              <button
                type="button"
                onClick={() => setSelected('fault-reporting')}
                className="p-4 sm:p-6 rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow text-left w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Wrench className="h-5 w-5 text-amber-600" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <h3 className="font-medium text-neutral-600 mb-1 text-sm sm:text-base">Open faults</h3>
                <p className="text-xl sm:text-2xl font-bold text-primary-black">{faults.filter((f) => f.status === 'active' || f.status === 'paused').length}</p>
                <p className="text-xs sm:text-sm text-amber-600 mt-1">View & raise faults</p>
              </button>

              <div className="p-4 sm:p-6 rounded-xl border border-amber-200 bg-amber-50/50 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <h3 className="font-medium text-neutral-600 mb-1 text-sm sm:text-base">Amount due</h3>
                <p className="text-xl sm:text-2xl font-bold text-primary-black">GH¢ {businessAmountDue.toLocaleString()}</p>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1">Due {businessNextInvoiceDue}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 shadow-sm mb-6 sm:mb-8">
              <h3 className="text-lg font-semibold text-primary-black mb-4">Billing</h3>
              <p className="text-sm text-neutral-600 mb-4">Invoices for your leased bikes. Pay by the due date to avoid service interruption.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">Next invoice</span>
                  <p className="text-2xl font-bold text-primary-black mt-1">GH¢ {businessNextInvoiceAmount.toLocaleString()}</p>
                  <p className="text-sm text-neutral-600 mt-1">Due {businessNextInvoiceDue}</p>
                </div>
                <div className="rounded-xl border border-green-200 bg-green-50/50 p-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-green-700">Paid this period</span>
                  <p className="text-2xl font-bold text-green-700 mt-1">GH¢ {businessInvoices.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0).toLocaleString()}</p>
                  <p className="text-sm text-neutral-600 mt-1">Last 3 months</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">Invoice history</p>
                <div className="divide-y divide-neutral-100 rounded-lg border border-neutral-200 overflow-hidden">
                  {businessInvoices.map((item) => (
                    <div key={item.id} className="flex flex-col gap-2 px-4 py-3 bg-white hover:bg-neutral-50 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                      <span className="text-sm text-primary-black">{item.period}</span>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="font-medium tabular-nums text-primary-black">GH¢ {item.amount.toLocaleString()}</span>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium w-fit ${
                          item.status === 'paid' ? 'bg-green-100 text-green-700' : item.status === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {item.status === 'paid' ? `Paid` : item.status === 'overdue' ? 'Overdue' : `Due ${item.dueDate ?? ''}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </>
            )}

            {selected === 'dashboard' && !isPatron && !isBusiness && (
            <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="p-4 sm:p-6 rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-bronze-gold/10 rounded-lg">
                    <FileText className="h-5 w-5 text-bronze-gold" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <h3 className="font-medium text-neutral-600 mb-1 text-sm sm:text-base">Car Bookings</h3>
                <p className="text-xl sm:text-2xl font-bold text-primary-black">24</p>
                <p className="text-xs sm:text-sm text-green-600 mt-1">+4 this week</p>
              </div>

              <div className="p-4 sm:p-6 rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Car className="h-5 w-5 text-blue-600" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <h3 className="font-medium text-neutral-600 mb-1 text-sm sm:text-base">Cars / Fleet</h3>
                <p className="text-xl sm:text-2xl font-bold text-primary-black">12</p>
                <p className="text-xs sm:text-sm text-green-600 mt-1">All available</p>
              </div>

              <div className="p-4 sm:p-6 rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Bike className="h-5 w-5 text-purple-600" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <h3 className="font-medium text-neutral-600 mb-1 text-sm sm:text-base">Leased Bikes</h3>
                <p className="text-xl sm:text-2xl font-bold text-primary-black">48</p>
                <p className="text-xs sm:text-sm text-green-600 mt-1">3 businesses</p>
              </div>

              <div className="p-4 sm:p-6 rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <h3 className="font-medium text-neutral-600 mb-1 text-sm sm:text-base">Riders</h3>
                <p className="text-xl sm:text-2xl font-bold text-primary-black">42</p>
                <p className="text-xs sm:text-sm text-green-600 mt-1">5 pending assignments</p>
              </div>

              <button
                type="button"
                onClick={() => setShowBusinessesModal(true)}
                className="p-4 sm:p-6 rounded-xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow text-left w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Building2 className="h-5 w-5 text-amber-600" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <h3 className="font-medium text-neutral-600 mb-1 text-sm sm:text-base">Businesses working with us</h3>
                <p className="text-xl sm:text-2xl font-bold text-primary-black">{leasedBusinessesCount}</p>
                <p className="text-xs sm:text-sm text-green-600 mt-1">Click to view all businesses</p>
              </button>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-6 shadow-sm mb-6 sm:mb-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h3 className="text-lg font-semibold text-primary-black">Admin Controls</h3>
                {credentialMessage && (
                  <span className="text-xs text-green-700 bg-green-100 border border-green-200 px-2 py-1 rounded">
                    {credentialMessage}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => openAdminCreateModal('bike')}
                  className="rounded-lg border border-neutral-200 px-4 py-3 text-left hover:bg-neutral-50"
                >
                  <p className="font-medium text-primary-black">Add Bike</p>
                  <p className="text-xs text-neutral-500">Create and assign to business</p>
                </button>
                <button
                  type="button"
                  onClick={() => openAdminCreateModal('rider')}
                  className="rounded-lg border border-neutral-200 px-4 py-3 text-left hover:bg-neutral-50"
                >
                  <p className="font-medium text-primary-black">Add Rider</p>
                  <p className="text-xs text-neutral-500">Assign rider to bike/business</p>
                </button>
                <button
                  type="button"
                  onClick={() => openAdminCreateModal('business-user')}
                  className="rounded-lg border border-neutral-200 px-4 py-3 text-left hover:bg-neutral-50"
                >
                  <p className="font-medium text-primary-black">Add Business Patron</p>
                  <p className="text-xs text-neutral-500">Create credentials for login</p>
                </button>
                <button
                  type="button"
                  onClick={() => openAdminCreateModal('patron-user')}
                  className="rounded-lg border border-neutral-200 px-4 py-3 text-left hover:bg-neutral-50"
                >
                  <p className="font-medium text-primary-black">Add Patron</p>
                  <p className="text-xs text-neutral-500">Create credentials for login</p>
                </button>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
              {/* Recent Activity – TODO 7.2 */}
              <div className="lg:col-span-2">
                <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-primary-black">Recent Activity</h3>
                    <button type="button" className="text-sm text-bronze-gold font-medium hover:underline">
                      View all
                    </button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: FileText, title: 'New car booking', desc: 'Booking #1024 – Mercedes S-Class', time: '2 min ago', color: 'green' },
                      { icon: Users, title: 'Rider assigned', desc: 'Kofi M. assigned to Bike #12', time: '15 min ago', color: 'blue' },
                      { icon: Bike, title: 'Contract signed', desc: 'Business onboarding – 10 bikes', time: '1 hour ago', color: 'purple' },
                      { icon: Wrench, title: 'Maintenance completed', desc: 'Bike #07 – service done', time: '2 hours ago', color: 'orange' },
                      { icon: Bell, title: 'Fault reported', desc: 'Bike #23 – flat tyre', time: '3 hours ago', color: 'red' },
                    ].map((activity, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            activity.color === 'green' ? 'bg-green-100' :
                            activity.color === 'blue' ? 'bg-blue-100' :
                            activity.color === 'purple' ? 'bg-purple-100' :
                            activity.color === 'orange' ? 'bg-orange-100' : 'bg-red-100'
                          }`}
                        >
                          <activity.icon
                            className={`h-4 w-4 ${
                              activity.color === 'green' ? 'text-green-600' :
                              activity.color === 'blue' ? 'text-blue-600' :
                              activity.color === 'purple' ? 'text-purple-600' :
                              activity.color === 'orange' ? 'text-orange-600' : 'text-red-600'
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-primary-black truncate">
                            {activity.title}
                          </p>
                          <p className="text-xs text-neutral-500 truncate">{activity.desc}</p>
                        </div>
                        <span className="text-xs text-neutral-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Stats – TODO 7.2 */}
              <div className="space-y-4 sm:space-y-6">
                <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-primary-black mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">Booking rate</span>
                      <span className="text-sm font-medium text-primary-black">68%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-bronze-gold h-2 rounded-full" style={{ width: '68%' }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">Bikes in use</span>
                      <span className="text-sm font-medium text-primary-black">94%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">Fleet availability</span>
                      <span className="text-sm font-medium text-primary-black">85%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-primary-black mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <Link
                      to="/car-rentals"
                      className="flex items-center justify-between py-2 text-sm text-neutral-600 hover:text-bronze-gold transition-colors"
                    >
                      Car Rentals <ExternalLink className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/motorbike-leasing"
                      className="flex items-center justify-between py-2 text-sm text-neutral-600 hover:text-bronze-gold transition-colors"
                    >
                      Motorbike Leasing <ExternalLink className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/contact"
                      className="flex items-center justify-between py-2 text-sm text-neutral-600 hover:text-bronze-gold transition-colors"
                    >
                      Contact <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            </>
            )}

            {selected === 'car-bookings' && (
              <ManagementTable<CarBookingRow>
                title="Car Bookings"
                subtitle={`${carBookings.length} bookings`}
                columns={[
                  { id: 'ref', label: 'Reference' },
                  { id: 'vehicle', label: 'Vehicle' },
                  { id: 'customer', label: 'Customer' },
                  { id: 'startDate', label: 'Start' },
                  { id: 'endDate', label: 'End' },
                  { id: 'status', label: 'Status', render: (r) => (
                    <span className={`px-2 py-1 rounded-lg text-sm font-medium ${
                      r.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>{r.status}</span>
                  ) },
                ]}
                rows={carBookings}
                getRowKey={(r) => r.id}
                isAdmin={false}
                renderDetail={(row, _onClose) => (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Reference</span><p className="font-medium">{row.ref}</p></div>
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Vehicle</span><p className="font-medium">{row.vehicle}</p></div>
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Customer</span><p className="font-medium">{row.customer}</p></div>
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Start – End</span><p className="font-medium">{row.startDate} – {row.endDate}</p></div>
                      {isAdmin && (
                        <div className="col-span-2 flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setCarBookings((prev) =>
                                prev.map((r) => (r.id === row.id ? { ...r, status: 'accepted' } : r))
                              )
                            }
                            className="px-3 py-2 rounded-lg bg-green-100 text-green-700 border border-green-200 text-sm font-medium"
                          >
                            Mark Accepted
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setCarBookings((prev) =>
                                prev.map((r) => (r.id === row.id ? { ...r, status: 'denied' } : r))
                              )
                            }
                            className="px-3 py-2 rounded-lg bg-red-100 text-red-700 border border-red-200 text-sm font-medium"
                          >
                            Mark Denied
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              />
            )}

            {selected === 'cars' && (
              <ManagementTable<CarRow>
                title="Cars / Fleet"
                subtitle={`${cars.length} vehicles`}
                columns={[
                  { id: 'reg', label: 'Registration' },
                  { id: 'model', label: 'Car Name' },
                  { id: 'amount', label: 'Amount', render: (r) => <span>GH¢ {r.amount.toLocaleString()}</span> },
                  { id: 'location', label: 'Location' },
                  { id: 'dueService', label: 'Due service' },
                  { id: 'status', label: 'Status', render: (r) => (
                    <span className={`px-2 py-1 rounded-lg text-sm font-medium ${
                      r.status === 'active' ? 'bg-green-100 text-green-700' :
                      r.status === 'paused' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>{r.status}</span>
                  ) },
                ]}
                rows={cars}
                getRowKey={(r) => r.id}
                getStatus={(r) => r.status}
                isAdmin={isAdmin}
                onAdd={isAdmin ? () => setShowAddCarModal(true) : undefined}
                onEdit={isAdmin ? (row) => setCars((prev) => prev.map((r) => (r.id === row.id ? { ...row } : r))) : undefined}
                onDelete={isAdmin ? (row) => setCars((prev) => prev.filter((r) => r.id !== row.id)) : undefined}
                renderDetail={(row) => (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Registration</span><p className="font-medium">{row.reg}</p></div>
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Car Name</span><p className="font-medium">{row.model}</p></div>
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Amount</span><p className="font-medium">GH¢ {row.amount.toLocaleString()}</p></div>
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Location</span><p className="font-medium">{row.location}</p></div>
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Due service</span><p className="font-medium">{row.dueService}</p></div>
                      {row.imageUrl && (
                        <div className="col-span-2 p-3 rounded-lg bg-neutral-100">
                          <span className="text-xs text-neutral-500 block mb-2">Car Image</span>
                          <img src={row.imageUrl} alt={row.model} className="w-full max-h-52 object-cover rounded-lg border border-neutral-200" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              />
            )}

            {selected === 'motorbike-leasing' && (
              <ManagementTable<MotorbikeLeaseRow>
                title="Motorbike Leasing"
                subtitle={`${motorbikeLeases.length} contracts`}
                columns={[
                  { id: 'bikeId', label: 'Bikes' },
                  { id: 'business', label: 'Business' },
                  { id: 'startDate', label: 'Start' },
                  { id: 'endDate', label: 'End' },
                  { id: 'riders', label: 'Riders' },
                  { id: 'status', label: 'Status', render: (r) => (
                    <span className={`px-2 py-1 rounded-lg text-sm font-medium ${
                      r.status === 'active' ? 'bg-green-100 text-green-700' :
                      r.status === 'paused' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>{r.status}</span>
                  ) },
                ]}
                rows={motorbikeLeases}
                getRowKey={(r) => r.id}
                getStatus={(r) => r.status}
                isAdmin={isAdmin}
                canRaiseFault={canRaiseFault}
                onAdd={isAdmin ? () => setShowAddLeaseModal(true) : undefined}
                onEdit={isAdmin ? (row) => setMotorbikeLeases((prev) => prev.map((r) => (r.id === row.id ? { ...row } : r))) : undefined}
                onDelete={isAdmin ? (row) => setMotorbikeLeases((prev) => prev.filter((r) => r.id !== row.id)) : undefined}
                onRaiseFault={canRaiseFault ? (_row) => { setSelected('fault-reporting'); } : undefined}
                renderDetail={(row) => (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Bikes</span><p className="font-medium">{row.bikeId}</p></div>
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Business</span><p className="font-medium">{row.business}</p></div>
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Period</span><p className="font-medium">{row.startDate} – {row.endDate}</p></div>
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Riders</span><p className="font-medium">{row.riders}</p></div>
                    </div>
                  </div>
                )}
              />
            )}

            {selected === 'riders' && (
              <ManagementTable<RiderRow>
                title="Riders"
                subtitle={isPatron ? `${patronRiders.length} riders assigned to your bikes` : `${riders.length} riders`}
                columns={[
                  { id: 'name', label: 'Name' },
                  { id: 'bike', label: 'Bike' },
                  { id: 'business', label: 'Business' },
                  { id: 'assignedDate', label: 'Assigned' },
                  { id: 'status', label: 'Status', render: (r) => (
                    <span className={`px-2 py-1 rounded-lg text-sm font-medium ${
                      r.status === 'active' ? 'bg-green-100 text-green-700' :
                      r.status === 'paused' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>{r.status}</span>
                  ) },
                ]}
                rows={isPatron ? patronRiders : riders}
                getRowKey={(r) => r.id}
                getStatus={(r) => r.status}
                isAdmin={isAdmin}
                canRaiseFault={canRaiseFault && !isPatron}
                onAdd={isAdmin ? () => openAdminCreateModal('rider') : undefined}
                onEdit={isAdmin ? (row) => setRiders((prev) => prev.map((r) => (r.id === row.id ? { ...row } : r))) : undefined}
                onDelete={isAdmin ? (row) => setRiders((prev) => prev.filter((r) => r.id !== row.id)) : undefined}
                onRaiseFault={canRaiseFault && !isPatron ? (_row) => setSelected('fault-reporting') : undefined}
                renderDetail={(row) => (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500 block">Name</span><p className="font-medium">{row.name}</p></div>
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500 block">Bike</span><p className="font-medium">{row.bike}</p></div>
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500 block">Business</span><p className="font-medium">{row.business}</p></div>
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500 block">Assigned</span><p className="font-medium">{row.assignedDate}</p></div>
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500 block">National ID</span><p className="font-medium font-mono text-sm">{row.nationalId ?? '—'}</p></div>
                      <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500 block">Bike chassis number</span><p className="font-medium font-mono text-sm">{row.bikeChassisNumber ?? '—'}</p></div>
                      <div className="p-3 rounded-lg bg-neutral-100 sm:col-span-2"><span className="text-xs text-neutral-500 block">Driver&apos;s licence</span><p className="font-medium font-mono text-sm">{row.driversLicence ?? '—'}</p></div>
                    </div>
                  </div>
                )}
              />
            )}

            {selected === 'fault-reporting' && (
              <>
                <div className="max-w-6xl mx-auto mb-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowRaiseFaultModal(true)}
                    className="px-4 py-2 rounded-lg bg-bronze-gold/10 border border-bronze-gold/30 text-bronze-gold font-medium hover:bg-bronze-gold/20 transition-colors"
                  >
                    Add New Fault
                  </button>
                </div>

                <ManagementTable<FaultRow>
                  title="Fault Reporting"
                  subtitle={`${faults.length} reports`}
                  columns={[
                    { id: 'ref', label: 'Ref' },
                    { id: 'asset', label: 'Asset' },
                    { id: 'reportedBy', label: 'Reported by' },
                    { id: 'reportedAt', label: 'Date' },
                    { id: 'description', label: 'Description' },
                    { id: 'status', label: 'Status', render: (r) => (
                      <span className={`px-2 py-1 rounded-lg text-sm font-medium ${
                        r.status === 'active' ? 'bg-green-100 text-green-700' :
                        r.status === 'paused' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>{r.status}</span>
                    ) },
                  ]}
                  rows={faults}
                  getRowKey={(r) => r.id}
                  getStatus={(r) => r.status}
                  isAdmin={isAdmin}
                  canRaiseFault={false}
                  onAdd={isAdmin ? () => setFaults((prev) => [...prev, { id: String(prev.length + 1), ref: `FR-${100 + prev.length}`, asset: '—', reportedBy: '—', reportedAt: '—', description: 'New fault', status: 'active' }]) : undefined}
                  onEdit={isAdmin ? (row) => setFaults((prev) => prev.map((r) => (r.id === row.id ? { ...row } : r))) : undefined}
                  onDelete={isAdmin ? (row) => setFaults((prev) => prev.filter((r) => r.id !== row.id)) : undefined}
                  onRaiseFault={undefined}
                  renderDetail={(row) => (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Ref</span><p className="font-medium">{row.ref}</p></div>
                        <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Asset</span><p className="font-medium">{row.asset}</p></div>
                        <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Reported by</span><p className="font-medium">{row.reportedBy}</p></div>
                        <div className="p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Date</span><p className="font-medium">{row.reportedAt}</p></div>
                        <div className="col-span-2 p-3 rounded-lg bg-neutral-100"><span className="text-xs text-neutral-500">Description</span><p className="font-medium">{row.description}</p></div>
                      </div>
                    </div>
                  )}
                />

                <AnimatePresence>
                  {showRaiseFaultModal && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
                      onClick={() => setShowRaiseFaultModal(false)}
                    >
                      <motion.div
                        initial={{ scale: 0.96, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.96, opacity: 0 }}
                        className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                          <h3 className="text-lg font-semibold text-primary-black">Raise New Fault</h3>
                          <button
                            type="button"
                            onClick={() => setShowRaiseFaultModal(false)}
                            className="p-2 rounded-lg hover:bg-neutral-100"
                            aria-label="Close"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="p-4 space-y-4">
                          <div>
                            <label className="text-sm font-medium text-neutral-700 block mb-1">Asset</label>
                            <input
                              value={newFaultAsset}
                              onChange={(e) => setNewFaultAsset(e.target.value)}
                              placeholder="e.g. Bike #07"
                              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-gold/40"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-neutral-700 block mb-1">Fault Description</label>
                            <textarea
                              value={newFaultDescription}
                              onChange={(e) => setNewFaultDescription(e.target.value)}
                              placeholder="Describe the fault..."
                              rows={4}
                              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-gold/40"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setShowRaiseFaultModal(false)}
                              className="px-3 py-2 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (!newFaultAsset.trim() || !newFaultDescription.trim()) return;
                                setFaults((prev) => [
                                  ...prev,
                                  {
                                    id: String(prev.length + 1),
                                    ref: `FR-${100 + prev.length}`,
                                    asset: newFaultAsset.trim(),
                                    reportedBy: user?.displayName ?? '—',
                                    reportedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                                    description: newFaultDescription.trim(),
                                    status: 'active',
                                  },
                                ]);
                                setNewFaultAsset('');
                                setNewFaultDescription('');
                                setShowRaiseFaultModal(false);
                              }}
                              className="px-3 py-2 rounded-lg bg-bronze-gold/10 border border-bronze-gold/30 text-bronze-gold font-medium hover:bg-bronze-gold/20"
                            >
                              Submit Fault
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            <AnimatePresence>
              {showBusinessesModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
                  onClick={() => setShowBusinessesModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.96, opacity: 0 }}
                    className="w-full max-w-2xl rounded-2xl border border-neutral-200 bg-white shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                      <h3 className="text-lg font-semibold text-primary-black">Businesses working with us</h3>
                      <button type="button" onClick={() => setShowBusinessesModal(false)} className="p-2 rounded-lg hover:bg-neutral-100" aria-label="Close">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="p-4 max-h-[70vh] overflow-y-auto">
                      <div className="divide-y divide-neutral-100 rounded-lg border border-neutral-200 overflow-hidden">
                        {Array.from(new Set(motorbikeLeases.map((m) => m.business))).map((business) => {
                          const contracts = motorbikeLeases.filter((m) => m.business === business);
                          const ridersCount = contracts.reduce((sum, c) => sum + c.riders, 0);
                          return (
                            <div key={business} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3">
                              <span className="font-medium text-primary-black">{business}</span>
                              <div className="text-xs sm:text-sm text-neutral-600 flex gap-3">
                                <span>{contracts.length} contract(s)</span>
                                <span>{ridersCount} rider(s)</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {showAddLeaseModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
                  onClick={() => setShowAddLeaseModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.96, opacity: 0 }}
                    className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                      <h3 className="text-lg font-semibold text-primary-black">Add Motorbike Lease</h3>
                      <button type="button" onClick={() => setShowAddLeaseModal(false)} className="p-2 rounded-lg hover:bg-neutral-100" aria-label="Close">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="p-4 space-y-3">
                      <textarea value={newLeaseBikes} onChange={(e) => setNewLeaseBikes(e.target.value)} placeholder="Bikes (comma separated, e.g. Bike #30, Bike #31)" rows={3} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                      <input value={newLeaseBusiness} onChange={(e) => setNewLeaseBusiness(e.target.value)} placeholder="Business" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                      <input value={newLeaseRiders} onChange={(e) => setNewLeaseRiders(e.target.value)} placeholder="Riders count" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input value={newLeaseStart} onChange={(e) => setNewLeaseStart(e.target.value)} placeholder="Start date" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                        <input value={newLeaseEnd} onChange={(e) => setNewLeaseEnd(e.target.value)} placeholder="End date" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button type="button" onClick={() => setShowAddLeaseModal(false)} className="px-3 py-2 rounded-lg border border-neutral-300 text-neutral-600">Cancel</button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!newLeaseBikes.trim() || !newLeaseBusiness.trim()) return;
                            setMotorbikeLeases((prev) => [
                              ...prev,
                              {
                                id: String(prev.length + 1),
                                bikeId: newLeaseBikes.trim(),
                                business: newLeaseBusiness.trim(),
                                startDate: newLeaseStart.trim() || '—',
                                endDate: newLeaseEnd.trim() || '—',
                                riders: Number(newLeaseRiders) || 0,
                                status: 'active',
                              },
                            ]);
                            setNewLeaseBikes('');
                            setNewLeaseBusiness('');
                            setNewLeaseRiders('');
                            setNewLeaseStart('');
                            setNewLeaseEnd('');
                            setShowAddLeaseModal(false);
                          }}
                          className="px-3 py-2 rounded-lg bg-bronze-gold/10 border border-bronze-gold/30 text-bronze-gold font-medium"
                        >
                          Add Lease
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {showAddCarModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
                  onClick={() => setShowAddCarModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.96, opacity: 0 }}
                    className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                      <h3 className="text-lg font-semibold text-primary-black">Add Car</h3>
                      <button type="button" onClick={() => setShowAddCarModal(false)} className="p-2 rounded-lg hover:bg-neutral-100" aria-label="Close">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="p-4 space-y-3">
                      <input value={newCarModel} onChange={(e) => setNewCarModel(e.target.value)} placeholder="Car name" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                      <input value={newCarAmount} onChange={(e) => setNewCarAmount(e.target.value)} placeholder="Amount (e.g. 1200)" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                      <input value={newCarReg} onChange={(e) => setNewCarReg(e.target.value)} placeholder="Registration (e.g. GT-1111-26)" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                      <div>
                        <label className="text-xs text-neutral-500 block mb-1">Picture upload</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) {
                              setNewCarImageUrl('');
                              return;
                            }
                            setNewCarImageUrl(URL.createObjectURL(file));
                          }}
                          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
                        />
                        {newCarImageUrl && (
                          <img src={newCarImageUrl} alt="Car preview" className="mt-2 w-full max-h-40 object-cover rounded-lg border border-neutral-200" />
                        )}
                      </div>
                      <input value={newCarLocation} onChange={(e) => setNewCarLocation(e.target.value)} placeholder="Location" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                      <input value={newCarDueService} onChange={(e) => setNewCarDueService(e.target.value)} placeholder="Due service date" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                      <div className="flex justify-end gap-2 pt-2">
                        <button type="button" onClick={() => setShowAddCarModal(false)} className="px-3 py-2 rounded-lg border border-neutral-300 text-neutral-600">Cancel</button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!newCarReg.trim() || !newCarModel.trim()) return;
                            setCars((prev) => [
                              ...prev,
                              {
                                id: String(prev.length + 1),
                                reg: newCarReg.trim(),
                                model: newCarModel.trim(),
                                amount: Number(newCarAmount) || 0,
                                imageUrl: newCarImageUrl || undefined,
                                location: newCarLocation.trim() || '—',
                                dueService: newCarDueService.trim() || '—',
                                status: 'active',
                              },
                            ]);
                            setNewCarReg('');
                            setNewCarModel('');
                            setNewCarAmount('');
                            setNewCarImageUrl('');
                            setNewCarLocation('');
                            setNewCarDueService('');
                            setShowAddCarModal(false);
                          }}
                          className="px-3 py-2 rounded-lg bg-bronze-gold/10 border border-bronze-gold/30 text-bronze-gold font-medium"
                        >
                          Add Car
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showAdminCreateModal && adminCreateType && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
                  onClick={() => setShowAdminCreateModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.96, opacity: 0 }}
                    className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                      <h3 className="text-lg font-semibold text-primary-black">
                        {adminCreateType === 'bike' && 'Add Bike'}
                        {adminCreateType === 'rider' && 'Add Rider'}
                        {adminCreateType === 'business-user' && 'Add Business Patron User'}
                        {adminCreateType === 'patron-user' && 'Add Patron User'}
                      </h3>
                      <button type="button" onClick={() => setShowAdminCreateModal(false)} className="p-2 rounded-lg hover:bg-neutral-100" aria-label="Close">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="p-4 space-y-3">
                      {adminCreateType === 'bike' && (
                        <>
                          <input value={newBikeId} onChange={(e) => setNewBikeId(e.target.value)} placeholder="Bike ID (e.g. Bike #28)" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                          <input value={newBikeBusiness} onChange={(e) => setNewBikeBusiness(e.target.value)} placeholder="Business name" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                        </>
                      )}
                      {adminCreateType === 'rider' && (
                        <>
                          <input value={newRiderName} onChange={(e) => setNewRiderName(e.target.value)} placeholder="Rider full name" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                          <input value={newRiderBike} onChange={(e) => setNewRiderBike(e.target.value)} placeholder="Bike ID assigned" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                          <input value={newRiderBusiness} onChange={(e) => setNewRiderBusiness(e.target.value)} placeholder="Business name" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                          <input value={newRiderNationalId} onChange={(e) => setNewRiderNationalId(e.target.value)} placeholder="National ID" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                          <input value={newRiderBikeChassisNumber} onChange={(e) => setNewRiderBikeChassisNumber(e.target.value)} placeholder="Bike chassis number" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                          <input value={newRiderDriversLicence} onChange={(e) => setNewRiderDriversLicence(e.target.value)} placeholder="Drivers licence" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                        </>
                      )}
                      {(adminCreateType === 'business-user' || adminCreateType === 'patron-user') && (
                        <>
                          <input value={newDisplayName} onChange={(e) => setNewDisplayName(e.target.value)} placeholder="Display name" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                          <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="Username" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Password" className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
                        </>
                      )}
                      <div className="flex justify-end gap-2 pt-2">
                        <button type="button" onClick={() => setShowAdminCreateModal(false)} className="px-3 py-2 rounded-lg border border-neutral-300 text-neutral-600">Cancel</button>
                        <button
                          type="button"
                          onClick={() => {
                            if (adminCreateType === 'bike') {
                              if (!newBikeId.trim()) return;
                              setMotorbikeLeases((prev) => [
                                ...prev,
                                {
                                  id: String(prev.length + 1),
                                  bikeId: newBikeId.trim(),
                                  business: newBikeBusiness.trim() || '—',
                                  startDate: '—',
                                  endDate: '—',
                                  riders: 0,
                                  status: 'active',
                                },
                              ]);
                              setNewBikeId('');
                              setNewBikeBusiness('');
                            } else if (adminCreateType === 'rider') {
                              if (!newRiderName.trim()) return;
                              setRiders((prev) => [
                                ...prev,
                                {
                                  id: String(prev.length + 1),
                                  name: newRiderName.trim(),
                                  bike: newRiderBike.trim() || '—',
                                  business: newRiderBusiness.trim() || '—',
                                  assignedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                                  status: 'active',
                                  nationalId: '—',
                                  bikeChassisNumber: '—',
                                  driversLicence: '—',
                                },
                              ]);
                              setNewRiderName('');
                              setNewRiderBike('');
                              setNewRiderBusiness('');
                            } else {
                              if (!newUsername.trim() || !newPassword.trim() || !newDisplayName.trim()) return;
                              const role: UserRole = adminCreateType === 'business-user' ? 'business' : 'patron';
                              addDynamicUser({
                                username: newUsername.trim(),
                                password: newPassword,
                                role,
                                displayName: newDisplayName.trim(),
                              });
                              setCredentialMessage(`Created ${role} login for "${newDisplayName.trim()}" (${newUsername.trim()}).`);
                              setNewDisplayName('');
                              setNewUsername('');
                              setNewPassword('');
                            }
                            setShowAdminCreateModal(false);
                          }}
                          className="px-3 py-2 rounded-lg bg-bronze-gold/10 border border-bronze-gold/30 text-bronze-gold font-medium"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {selected === 'agreement' && (
              <div className="max-w-3xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-primary-black mb-4">Agreement</h2>
                <p className="text-neutral-600 mb-4">Your leasing agreement with Cruise Logistics. View and download your contract details below.</p>
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">Agreement type</span>
                    <span className="font-medium text-primary-black">Bike leasing (Patron)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">Effective date</span>
                    <span className="font-medium text-primary-black">01 Jan 2025</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">End date</span>
                    <span className="font-medium text-primary-black">01 Jan 2026</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-neutral-600">Status</span>
                    <span className="px-2 py-1 rounded-lg bg-green-100 text-green-700 text-sm font-medium">Active</span>
                  </div>
                </div>
                <button type="button" className="mt-4 px-4 py-2 rounded-lg bg-bronze-gold/10 border border-bronze-gold/30 text-bronze-gold font-medium hover:bg-bronze-gold/20 transition-colors">
                  Download agreement
                </button>
              </div>
            )}

            {selected === 'settings' && (
              <div className="max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-primary-black mb-4">Settings</h2>
                <p className="text-neutral-600">Account and application settings will appear here.</p>
              </div>
            )}

            {selected === 'help' && (
              <div className="max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-primary-black mb-4">Help & Support</h2>
                <p className="text-neutral-600">Help articles and support contact will appear here.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
