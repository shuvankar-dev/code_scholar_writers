const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center overflow-hidden">
      {/* Academic Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Elegant gradient overlays */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-100/60 to-indigo-100/60 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-purple-100/60 to-blue-100/60 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-50/80 to-blue-50/80 rounded-full blur-3xl"></div>
        
        {/* Subtle academic pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-gray-800">
          <div className="inline-flex items-center gap-2 bg-white/80 border border-blue-200/50 rounded-full px-4 py-2 mb-6 backdrop-blur-sm shadow-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-700 text-sm font-medium">Trusted Academic Writing Services</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gray-900">
              Welcome to
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mt-2">
              CodeScholar Writers
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-600 leading-relaxed max-w-xl font-light">
            Professional academic writing solutions for students worldwide. Get expert assistance from our team of 
            <span className="text-blue-600 font-medium"> qualified academic writers</span> with 7+ years of experience.
          </p>

          {/* Academic Stats */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-3 shadow-sm">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">1000+</div>
                <div className="text-sm text-gray-600">Completed Projects</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-3 shadow-sm">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Academic CTA Button */}
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2">
              <span>Explore Services</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        </div>

        {/* Right Content - Academic Price Calculator */}
        <div className="relative group">
          {/* Subtle glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-200/30 via-indigo-200/30 to-purple-200/30 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
          
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-8 max-w-md mx-auto lg:mx-0 border border-gray-200/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Calculate Your Price</h3>
                <p className="text-sm text-gray-600">Instant academic quote</p>
              </div>
            </div>
            
            <form className="space-y-6">
              {/* Service Type */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Service Type
                </label>
                <select className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white">
                  <option>Select service type</option>
                  <option>Essay Writing</option>
                  <option>Research Paper</option>
                  <option>Assignment</option>
                  <option>Coding Project</option>
                </select>
              </div>

              {/* Pages and Level */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Pages</label>
                  <input 
                    type="number" 
                    placeholder="1" 
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Academic Level</label>
                  <select className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white">
                    <option>Level</option>
                    <option>High School</option>
                    <option>College</option>
                    <option>University</option>
                    <option>PhD</option>
                  </select>
                </div>
              </div>

              {/* Deadline */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  Deadline
                </label>
                <select className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white">
                  <option>Select deadline</option>
                  <option>24 hours</option>
                  <option>3 days</option>
                  <option>1 week</option>
                  <option>2 weeks</option>
                </select>
              </div>

              {/* Price Display */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Estimated Price:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">$25.00</span>
                </div>
              </div>

              {/* Academic Get Started Button */}
              <button 
                type="button" 
                className="group relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <span>Get Started Now</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
