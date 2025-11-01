import PriceCalculator from './PriceCalculator';

const HeroSection = () => {
  return (
  <section className="relative bg-white overflow-hidden">
      {/* Academic Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Elegant gradient overlays */}
  <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#A259F7]/40 via-[#FF6A88]/40 to-[#FFD36E]/40 rounded-full blur-3xl"></div>
  <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-[#FF6A88]/40 to-[#FFD36E]/40 rounded-full blur-3xl"></div>
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#A259F7]/30 to-[#FFD36E]/30 rounded-full blur-3xl"></div>
        
        {/* Subtle academic pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
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
                <div className="bg-gradient-to-r from-[#A259F7]/80 via-[#FF6A88]/80 to-[#FFD36E]/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-[#A259F7]/30 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#A259F7] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">9000+</div>
                    <div className="text-sm text-white/80">Completed Projects</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-[#FF6A88]/80 via-[#FFD36E]/80 to-[#A259F7]/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-[#FFD36E]/30 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FFD36E] rounded-full flex items-center justify-center">
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
              <button className="bg-gradient-to-r from-[#a259f7] via-[#ff6a88] to-[#ffb86c] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105">
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

      {/* Moving Services Section - Positioned lower to avoid overlap */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-white/60 via-white/30 to-transparent pb-8 pt-20">
        {/* Moving Academic Services Section */}
        <div className="overflow-hidden">
          <div className="relative flex items-center">
            
            {/* Gradient overlays for smooth fade effect */}
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white/80 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white/80 to-transparent z-10"></div>
            
            {/* Scrolling Services - Only icons move */}
            <div className="flex animate-scroll-reverse">
              {/* First set - Core Services */}
              <div className="flex items-center justify-center min-w-max py-3">
                <div className="flex items-center mx-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2.5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">📝</span>
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">Essay Writing</span>
                </div>
                
                <div className="flex items-center mx-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2.5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-purple-600 rounded-md flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">📊</span>
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">Programming</span>
                </div>
                
                <div className="flex items-center mx-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2.5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-green-600 rounded-md flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">📄</span>
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">Coursework</span>
                </div>
                
                <div className="flex items-center mx-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2.5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-orange-600 rounded-md flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">🔍</span>
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">Case Studies</span>
                </div>
                
                <div className="flex items-center mx-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2.5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-red-600 rounded-md flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">✏️</span>
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">Assignments</span>
                </div>
                
                <div className="flex items-center mx-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2.5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-indigo-600 rounded-md flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">✂️</span>
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">Editing</span>
                </div>
                
                <div className="flex items-center mx-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2.5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-teal-600 rounded-md flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">🎓</span>
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">Thesis</span>
                </div>
              </div>
              
              {/* Duplicate for seamless loop */}
              <div className="flex items-center justify-center min-w-max py-3">
                <div className="flex items-center mx-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2.5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">📝</span>
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">Essay Writing</span>
                </div>
                
                <div className="flex items-center mx-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2.5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-purple-600 rounded-md flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">📊</span>
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">Programming</span>
                </div>
                
                <div className="flex items-center mx-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2.5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-green-600 rounded-md flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">📄</span>
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">Coursework</span>
                </div>
                
                <div className="flex items-center mx-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2.5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-orange-600 rounded-md flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">🔍</span>
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">Case Studies</span>
                </div>
                
                <div className="flex items-center mx-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2.5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-red-600 rounded-md flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">✏️</span>
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">Assignments</span>
                </div>
                
                <div className="flex items-center mx-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2.5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-indigo-600 rounded-md flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">✂️</span>
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">Editing</span>
                </div>
                
                <div className="flex items-center mx-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2.5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-teal-600 rounded-md flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">🎓</span>
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">Thesis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;