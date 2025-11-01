import { PixelImage } from "@/components/magicui/pixel-image";

const ServicesSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Academic Writing Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive writing solutions tailored to your academic needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Essay Writing */}
          <div className="group bg-white p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-white border border-blue-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              {/* Essay Writing Icon: Pencil */}
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M16.862 3.487a2.06 2.06 0 0 1 2.915 2.915l-9.193 9.193-3.06.34.34-3.06 9.193-9.193z"/>
                <path d="M19.5 6.5l-2-2"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Essay Writing</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Custom essays crafted by expert writers with thorough research and original content.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Argumentative Essays
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Narrative Essays
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Descriptive Essays
              </li>
            </ul>
          </div>

          {/* Dissertation Writing */}
          <div className="group bg-white p-8 rounded-2xl border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-white border border-purple-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              {/* Dissertation Writing Icon: Book */}
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="2"/>
                <path d="M8 4v16"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-purple-700 mb-4">Dissertation Writing</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Comprehensive dissertation support from proposal to final defense preparation.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Research Proposal
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Literature Review
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Data Analysis
              </li>
            </ul>
          </div>

          {/* Thesis Writing */}
          <div className="group bg-white p-8 rounded-2xl border border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-white border border-green-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              {/* Thesis Writing Icon: File/Document */}
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="6" y="4" width="12" height="16" rx="2"/>
                <path d="M9 8h6"/>
                <path d="M9 12h6"/>
                <path d="M9 16h6"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Thesis Writing</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Professional thesis writing services for graduate and postgraduate students.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Master's Thesis
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                PhD Thesis
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Thesis Defense
              </li>
            </ul>
          </div>

          {/* Programming Services */}
          <div className="group bg-white p-8 rounded-2xl border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-white border border-orange-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              {/* Programming Projects Icon: Code Brackets */}
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8 9l-4 3 4 3"/>
                <path d="M16 9l4 3-4 3"/>
                <path d="M12 4v16"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-orange-700 mb-4">Programming Projects</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Expert solutions for coding and software development tasks across multiple programming languages.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Web Development
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Mobile Apps
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Data Analysis
              </li>
            </ul>
          </div>
        </div>

        {/* 360 Solutions - Clean Orbital Layout */}
        <div className="py-12 bg-gray-50 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#a259f7] via-[#ff6a88] to-[#ffb86c] text-white rounded-full text-sm font-semibold mb-4 shadow-lg">
                360 SOLUTIONS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Find Every Solution, From Research to
                <br />
                <span className="bg-gradient-to-r from-[#a259f7] via-[#ff6a88] to-[#ffb86c] bg-clip-text text-transparent">Academic Excellence</span>
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Access our full 360 Solutions, covering everything from research to final submission. Get expert 
                assistance, explore quality services, and invest in your future with comprehensive academic 
                support. It's all here.
              </p>
              <button 
                className="text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
                style={{ background: 'linear-gradient(to right, #6a1b9a, #d32f2f, #f57c00, #fbc02d)' }}
              >
                Get Started Now
              </button>
            </div>

            {/* Orbital Services Layout */}
            <div className="relative max-w-4xl mx-auto">
              {/* Background Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 md:w-96 md:h-96 rounded-full border-2 border-dashed border-gray-200"></div>
              </div>

              {/* Central Image Container */}
              <div className="relative z-10 flex items-center justify-center h-80 md:h-96">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white shadow-2xl border-4 border-white overflow-hidden relative flex items-center justify-center">
                  {/* Student Image with Pixel Animation */}
                  <PixelImage
                    src="/student-success.jpg"
                    customGrid={{ rows: 6, cols: 6 }}
                    grayscaleAnimation
                    pixelFadeInDuration={1200}
                    maxAnimationDelay={1500}
                    colorRevealDelay={1800}
                  />
                </div>
              </div>

              {/* Service Cards - Positioned Around Circle */}
              
              {/* Assignment Help - Top Left */}
              <div className="absolute top-4 left-4 md:top-8 md:left-12">
                <div className="bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-800 text-xs">Assignment Help</span>
                  </div>
                </div>
              </div>

              {/* Essay Writing - Top Center */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
                <div className="bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-800 text-xs">Essay Writing</span>
                  </div>
                </div>
              </div>

              {/* Data Analysis - Top Right */}
              <div className="absolute top-4 right-4 md:top-8 md:right-12">
                <div className="bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-800 text-xs">Data Analysis</span>
                  </div>
                </div>
              </div>

              {/* Programming - Right */}
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1">
                <div className="bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-800 text-xs">Programming</span>
                  </div>
                </div>
              </div>

              {/* Research Papers - Bottom Right */}
              <div className="absolute bottom-4 right-4 md:bottom-8 md:right-12">
                <div className="bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-800 text-xs">Research Papers</span>
                  </div>
                </div>
              </div>

              {/* Thesis Writing - Left */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1">
                <div className="bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-800 text-xs">Thesis Writing</span>
                  </div>
                </div>
              </div>

              {/* CAD Design - Bottom Left */}
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-12">
                <div className="bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-800 text-xs">CAD Design</span>
                  </div>
                </div>
              </div>

              {/* Dissertation - Bottom Center */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1">
                <div className="bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 min-w-[140px]">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-800 text-xs">Dissertation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Moving University Logos Section */}
        <div className="py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Trusted by Students from Top Universities
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Students from leading universities across UK and Australia trust our academic writing services
              </p>
            </div>
            
            {/* Moving Logo Container */}
            <div className="relative">
              {/* Gradient overlays for smooth fade effect */}
              <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
              
              {/* Scrolling Logos */}
              <div className="flex animate-scroll">
                {/* First set of logos */}
                <div className="flex items-center justify-center min-w-max">
                  {/* UK Universities */}
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/OX.png" alt="University of Oxford" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/CAM.png" alt="University of Cambridge" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/LSE.png" alt="London School of Economics" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/ICL.png" alt="Imperial College London" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/UCL.png" alt="University College London" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  {/* Australian Universities */}
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/ANU.png" alt="Australian National University" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/USY.png" alt="University of Sydney" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/UML.png" alt="University of Melbourne" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/UQ.png" alt="University of Queensland" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/UNSW.png" alt="UNSW Sydney" className="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
                
                {/* Duplicate set for seamless loop */}
                <div className="flex items-center justify-center min-w-max">
                  {/* UK Universities */}
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/OX.png" alt="University of Oxford" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/CAM.png" alt="University of Cambridge" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/LSE.png" alt="London School of Economics" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/ICL.png" alt="Imperial College London" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/UCL.png" alt="University College London" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  {/* Australian Universities */}
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/ANU.png" alt="Australian National University" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/USY.png" alt="University of Sydney" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/UML.png" alt="University of Melbourne" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/UQ.png" alt="University of Queensland" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mx-8 bg-gray-50 rounded-xl px-8 py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src="/UnivercityLogo/UNSW.png" alt="UNSW Sydney" className="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CodeScholar Writers?</h3>
            <p className="text-lg text-gray-600">We deliver excellence in every project</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Expert Writers */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Expert Writers</h4>
              <p className="text-gray-600">PhD and Masters degree holders with 7+ years experience</p>
            </div>

            {/* 24/7 Support */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h4>
              <p className="text-gray-600">Round-the-clock customer support and assistance</p>
            </div>

            {/* On-Time Delivery */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">On-Time Delivery</h4>
              <p className="text-gray-600">Always meet deadlines with quality work guaranteed</p>
            </div>

            {/* Plagiarism Free */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Plagiarism Free</h4>
              <p className="text-gray-600">100% original content with plagiarism reports included</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
