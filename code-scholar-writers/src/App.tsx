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

function App() {
  const [showCalculator, setShowCalculator] = useState(false)

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar onCalculatePrice={() => setShowCalculator(true)} />
        
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <ServicesSection />
            </>
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
        
        <Footer />

        {/* Price Calculator Modal/Overlay */}
        {showCalculator && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Price Calculator</h2>
                  <button
                    onClick={() => setShowCalculator(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
                <PriceCalculator />
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
