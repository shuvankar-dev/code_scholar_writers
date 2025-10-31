import PriceCalculator from './PriceCalculator';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Academic Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Elegant gradient overlays */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-100/60 to-indigo-100/60 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-purple-100/60 to-blue-100/60 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-50/80 to-blue-50/80 rounded-full blur-3xl"></div>
        
        {/* Subtle academic pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-[100vh] flex items-center pt-24 pb-50">
        <div className="max-w-[1400px] mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content - Takes 5 columns */}
            <div className="lg:col-span-5 text-gray-800">
              <div className="inline-flex items-center gap-2 bg-white/80 border border-blue-200/50 rounded-full px-4 py-2 mb-6 backdrop-blur-sm shadow-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-blue-700 text-sm font-medium">Trusted Academic Writing Services</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                <span className="text-gray-900">
                  Welcome to
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mt-1">
                  CodeScholar Writers
                </span>
              </h1>
              
              <p className="text-lg md:text-xl mb-6 text-gray-600 leading-relaxed max-w-xl font-light">
                Professional academic writing solutions for students worldwide. Get expert assistance from our team of 
                <span className="text-blue-600 font-medium"> qualified academic writers</span> with 7+ years of experience.
              </p>

              {/* Stats Section */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-gray-100/50 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">9000+</div>
                    <div className="text-sm text-gray-600">Completed Projects</div>
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-gray-100/50 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-600">Satisfaction Rate</div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <span>Explore Services</span>
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