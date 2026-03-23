import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ScrollToTop } from './components/ScrollToTop';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicLayout } from './layouts/PublicLayout';
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { Services } from './pages/Services';
import { CarRentals } from './pages/CarRentals';
import { MotorbikeLeasing } from './pages/MotorbikeLeasing';
import { HowItWorks } from './pages/HowItWorks';
import { RulesRequirements } from './pages/RulesRequirements';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="services" element={<Services />} />
            <Route path="car-rentals" element={<CarRentals />} />
            <Route path="motorbike-leasing" element={<MotorbikeLeasing />} />
            <Route path="how-it-works" element={<HowItWorks />} />
            <Route path="rules-requirements" element={<RulesRequirements />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
