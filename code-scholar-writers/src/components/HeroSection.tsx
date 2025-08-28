const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 flex items-center overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to
            <span className="block text-yellow-300">
              CodeScholar Writers
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed max-w-xl">
            Innovative writing solutions for the digital age. Get expert academic assistance from our team of professional writers with 7+ years of experience.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg">1000+ Completed Assignments</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg">98% Customer Satisfaction</span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg">
            View Services
          </button>
        </div>

        {/* Right Content - Price Calculator */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto lg:mx-0">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Calculate Your Price</h3>
          </div>
          
          <p className="text-gray-600 mb-6">Get an instant quote for your academic writing needs</p>

          <form className="space-y-6">
            {/* Service Type */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                Service Type
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Pages</label>
                <input type="number" placeholder="1" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                Deadline
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select deadline</option>
                <option>24 hours</option>
                <option>3 days</option>
                <option>1 week</option>
                <option>2 weeks</option>
              </select>
            </div>

            {/* Get Started Button */}
            <button type="button" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg">
              Get Started Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
