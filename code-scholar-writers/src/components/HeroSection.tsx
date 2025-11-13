import { useState } from 'react';
import PriceCalculator from './PriceCalculator';

const HeroSection = () => {
  const [showModal, setShowModal] = useState(false);

  const handleRegisterClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '918777841275'; 
    const message = encodeURIComponent('Hi, I want to know more about registration.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Academic Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.01)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-[100vh] flex items-center pt-24 pb-12 md:pb-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content - Takes 5 columns */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 bg-white border-2 border-[#A259F7] rounded-full px-4 py-2 mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-3 h-3 bg-[#FFD36E] rounded-full animate-pulse"></div>
                <span className="text-[#A259F7] text-xs sm:text-sm font-semibold">Trusted Academic Writing Services</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                <span className="text-gray-900">
                  Welcome to
                </span>
                <span className="block bg-gradient-to-r from-[#a259f7] via-[#ff6a88] to-[#ffb86c] bg-clip-text text-transparent mt-1">
                  CodeScholar Writers
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl mb-6 text-gray-800 leading-relaxed max-w-xl font-light">
                Professional academic writing solutions for students worldwide. Get expert assistance from our team of
                <span className="font-medium text-[#a259f7]"> qualified academic writers</span> with 7+ years of experience.
              </p>

              {/* Stats Section */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8">
                <div 
                  className="backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/20 flex items-center gap-3 hover:shadow-xl transition-shadow duration-300"
                  style={{ background: 'linear-gradient(to right, #2563eb, #1e40af)' }}
                >
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg sm:text-xl font-bold text-white">9000+</div>
                    <div className="text-xs sm:text-sm text-white/80 whitespace-nowrap">Completed Projects</div>
                  </div>
                </div>

                <div 
                  className="backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/20 flex items-center gap-3 hover:shadow-xl transition-shadow duration-300"
                  style={{ background: 'linear-gradient(to right, #10b981, #059669)' }}
                >
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg sm:text-xl font-bold text-white">98%</div>
                    <div className="text-xs sm:text-sm text-white/80 whitespace-nowrap">Satisfaction Rate</div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                onClick={handleRegisterClick}
                className="w-full sm:w-auto text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center sm:justify-start gap-2 group"
                style={{ background: 'linear-gradient(to right, #6a1b9a, #d32f2f, #f57c00, #fbc02d)' }}
              >
                <span>Register Now</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Right Content - Main Price Calculator - Takes 7 columns */}
            <div className="lg:col-span-7 relative mt-8 lg:mt-0">
              <PriceCalculator />
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-[#a259f7] to-[#ff6a88] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3">
              Coming Soon!
            </h2>
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Registration page is under development. For now, you can contact us on WhatsApp to get more information and register your account.
            </p>

            {/* WhatsApp Button */}
            <button 
              onClick={handleWhatsAppClick}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Contact on WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
