import PriceCalculator from './PriceCalculator';

const HeroSection = () => {
  return (
  <section className="relative bg-white overflow-hidden">
      {/* Academic Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle academic pattern only */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.01)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-[100vh] flex items-center pt-24 pb-50">
        <div className="max-w-[1400px] mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content - Takes 5 columns */}
            <div className="lg:col-span-5 text-white">
              <div className="inline-flex items-center gap-2 bg-white border-2 border-[#A259F7] rounded-full px-4 py-2 mb-6 shadow-lg">
                <div className="w-3 h-3 bg-[#FFD36E] rounded-full animate-pulse"></div>
                <span className="text-[#A259F7] text-sm font-semibold">Trusted Academic Writing Services</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                <span className="text-gray-900">
                  Welcome to
                </span>
                <span className="block bg-gradient-to-r from-[#a259f7] via-[#ff6a88] to-[#ffb86c] bg-clip-text text-transparent mt-1">
                  CodeScholar Writers
                </span>
              </h1>
              
              <p className="text-lg md:text-xl mb-6 text-gray-800 leading-relaxed max-w-xl font-light drop-shadow">
                Professional academic writing solutions for students worldwide. Get expert assistance from our team of
                <span className="font-medium text-[#a259f7]"> qualified academic writers</span> with 7+ years of experience.
              </p>

              {/* Stats Section */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div 
                  className="backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/20 flex items-center gap-3"
                  style={{ background: 'linear-gradient(to right, #2563eb, #1e40af)' }}
                >
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">9000+</div>
                    <div className="text-sm text-white/80">Completed Projects</div>
                  </div>
                </div>
                <div 
                  className="backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/20 flex items-center gap-3"
                  style={{ background: 'linear-gradient(to right, #10b981, #059669)' }}
                >
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">98%</div>
                    <div className="text-sm text-white/80">Satisfaction Rate</div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                className="text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105"
                style={{ background: 'linear-gradient(to right, #6a1b9a, #d32f2f, #f57c00, #fbc02d)' }}
              >
                <div className="relative flex items-center gap-2">
                  <span>Register Now</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Right Content - Main Price Calculator - Takes 7 columns */}
            <div className="lg:col-span-7 relative">
              <PriceCalculator />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;