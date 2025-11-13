import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import PriceCalculator from './components/PriceCalculator'
import Footer from './components/Footer'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import PricingPage from './pages/PricingPage'
import FAQPage from './pages/FAQPage'
import BlogPage from './components/BlogPage'
import SingleBlogPage from './components/SingleBlogPage'
import ContactPage from './pages/ContactPage'

// Admin Components
import AdminLogin from './components/admin/AdminLogin'
import AdminRegister from './components/admin/AdminRegister'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminOrders from './components/admin/AdminOrders'
import AdminMasterPrice from './components/admin/AdminMasterPrice'
import AdminFAQManagement from './components/admin/AdminFAQManagement'
import AdminBlogManagement from './components/admin/AdminBlogManagement'
import AdminRegistrationLeads from './components/admin/AdminRegistrationLeads'

// Protected Route Component
interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    return <AdminLogin />;
  }
  
  return element;
};

function App() {
  const [showCalculator, setShowCalculator] = useState(false);

  const closeCalculator = () => setShowCalculator(false);
  const openCalculator = () => setShowCalculator(true);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <Navbar onCalculatePrice={openCalculator} />
        
        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={
                <>
                  <HeroSection />
                  <ServicesSection />
                </>
              } 
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/faq" element={<FAQPage />} />
            
            {/* Blog Routes */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<SingleBlogPage />} />
            
            {/* Contact Route */}
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Admin Routes - Public */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            
            {/* Admin Routes - Protected */}
            <Route 
              path="/admin/dashboard" 
              element={<ProtectedRoute element={<AdminDashboard />} />} 
            />
            <Route 
              path="/admin/orders" 
              element={<ProtectedRoute element={<AdminOrders />} />} 
            />
            <Route 
              path="/admin/master-price" 
              element={<ProtectedRoute element={<AdminMasterPrice />} />} 
            />
            <Route 
              path="/admin/faq" 
              element={<ProtectedRoute element={<AdminFAQManagement />} />} 
            />
            <Route 
              path="/admin/blog" 
              element={<ProtectedRoute element={<AdminBlogManagement />} />} 
            />
            <Route 
              path="/admin/registration-leads" 
              element={<ProtectedRoute element={<AdminRegistrationLeads />} />} 
            />
            
            {/* 404 Route - Catch All */}
            <Route 
              path="*" 
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                    <p className="text-lg text-gray-600 mb-8">Page not found</p>
                    <a 
                      href="/" 
                      className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Go Home
                    </a>
                  </div>
                </div>
              } 
            />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />

        {/* Price Calculator Modal */}
        {showCalculator && (
          <div 
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={closeCalculator}
            role="dialog"
            aria-modal="true"
            aria-labelledby="calculator-title"
          >
            <div 
              className="bg-white rounded-lg max-w-4xl w-full my-8 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 sticky top-0 bg-white border-b border-gray-200 rounded-t-lg flex justify-between items-center">
                <h2 
                  id="calculator-title"
                  className="text-xl sm:text-2xl font-bold text-gray-900"
                >
                  Price Calculator
                </h2>
                <button
                  onClick={closeCalculator}
                  className="text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl font-bold transition-colors p-2 -mr-2"
                  aria-label="Close calculator"
                >
                  ×
                </button>
              </div>
              
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                <PriceCalculator />
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
