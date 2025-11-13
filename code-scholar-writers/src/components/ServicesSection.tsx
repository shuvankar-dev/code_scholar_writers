const ServicesSection = () => {
  // University logos data
  const universities = [
    { name: "Oxford", path: "/UnivercityLogo/OX.png" },
    { name: "Cambridge", path: "/UnivercityLogo/CAM.png" },
    { name: "LSE", path: "/UnivercityLogo/LSE.png" },
    { name: "Imperial", path: "/UnivercityLogo/ICL.png" },
    { name: "UCL", path: "/UnivercityLogo/UCL.png" },
    { name: "ANU", path: "/UnivercityLogo/ANU.png" },
    { name: "Sydney", path: "/UnivercityLogo/USY.png" },
    { name: "Melbourne", path: "/UnivercityLogo/UML.png" },
    { name: "Queensland", path: "/UnivercityLogo/UQ.png" },
    { name: "UNSW", path: "/UnivercityLogo/UNSW.png" },
  ];

  const services = [
    {
      title: "Essay Writing",
      description: "Custom essays crafted by expert writers with thorough research and original content.",
      items: ["Argumentative Essays", "Narrative Essays", "Descriptive Essays"],
      color: "blue",
    },
    {
      title: "Dissertation Writing",
      description: "Comprehensive dissertation support from proposal to final defense preparation.",
      items: ["Research Proposal", "Literature Review", "Data Analysis"],
      color: "purple",
    },
    {
      title: "Thesis Writing",
      description: "Professional thesis writing services for graduate and postgraduate students.",
      items: ["Master's Thesis", "PhD Thesis", "Thesis Defense"],
      color: "green",
    },
    {
      title: "Programming Projects",
      description: "Expert solutions for coding and software development tasks across multiple programming languages.",
      items: ["Web Development", "Mobile Apps", "Data Analysis"],
      color: "orange",
    },
  ];

  const features = [
    {
      title: "Expert Writers",
      description: "PhD and Masters degree holders with 7+ years experience",
      gradient: "from-blue-500 to-blue-600",
      icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer support and assistance",
      gradient: "from-green-500 to-green-600",
      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    },
    {
      title: "On-Time Delivery",
      description: "Always meet deadlines with quality work guaranteed",
      gradient: "from-purple-500 to-purple-600",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Plagiarism Free",
      description: "100% original content with plagiarism reports included",
      gradient: "from-orange-500 to-orange-600",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { icon: string; border: string; dot: string } } = {
      blue: { icon: "text-blue-500", border: "border-blue-100", dot: "bg-blue-500" },
      purple: { icon: "text-purple-500", border: "border-purple-100", dot: "bg-purple-500" },
      green: { icon: "text-green-600", border: "border-green-100", dot: "bg-green-500" },
      orange: { icon: "text-orange-500", border: "border-orange-100", dot: "bg-orange-500" },
    };
    return colors[color] || colors.blue;
  };

  const renderServiceIcon = (color: string) => {
    const icons: { [key: string]: string } = {
      blue: "M16.862 3.487a2.06 2.06 0 0 1 2.915 2.915l-9.193 9.193-3.06.34.34-3.06 9.193-9.193z M19.5 6.5l-2-2",
      purple: "M4 4h16v16H4z M8 4v16",
      green: "M6 4h12v16H6z M9 8h6 M9 12h6 M9 16h6",
      orange: "M8 9l-4 3 4 3 M16 9l4 3-4 3 M12 4v16",
    };
    return icons[color] || icons.blue;
  };

  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Academic Writing Services
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Comprehensive writing solutions tailored to your academic needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {services.map((service, index) => {
            const colors = getColorClasses(service.color);
            return (
              <div
                key={index}
                className={`group bg-white p-6 sm:p-8 rounded-2xl border ${colors.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className={`w-8 h-8 ${colors.icon}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={renderServiceIcon(service.color)} />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                      <div className={`w-2 h-2 ${colors.dot} rounded-full flex-shrink-0`}></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Premium Samples Section */}
        <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-3xl p-8 sm:p-12 mb-12 sm:mb-16 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                <span className="px-4 py-1.5 text-sm font-semibold text-white">Premium Quality</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Explore Our Sample Works
              </h3>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                Download high-quality samples from our expert writers and developers
              </p>
            </div>

            {/* Samples Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {[
                {
                  title: "BPP Special",
                  icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                  gradient: "from-purple-500 to-pink-500",
                  category: "Academic",
                  available: true
                },
                {
                  title: "Dissertations",
                  icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                  gradient: "from-blue-500 to-cyan-500",
                  category: "Academic",
                  available: true
                },
                {
                  title: "Machine Learning",
                  icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                  gradient: "from-indigo-500 to-purple-500",
                  category: "Programming",
                  available: false
                },
                {
                  title: "Android Apps",
                  icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
                  gradient: "from-green-500 to-lime-500",
                  category: "Programming",
                  available: false
                }
              ].map((sample, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${sample.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={sample.icon} />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">{sample.category}</span>
                  <h4 className="text-xl font-bold text-white mt-2 mb-3">{sample.title}</h4>
                  {sample.available ? (
                    <button className="w-full py-2.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-white/30">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                      View Sample
                    </button>
                  ) : (
                    <div className="w-full py-2.5 bg-white/10 text-white/70 font-semibold rounded-lg flex items-center justify-center gap-2 backdrop-blur-sm border border-white/20 cursor-not-allowed">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      We Upload Soon
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <a 
                href="/samples"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-900 font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <span>View All Samples</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Moving University Logos Section */}
        <div className="py-12 sm:py-16 bg-white overflow-hidden rounded-3xl mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Trusted by Students from Top Universities
            </h3>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Students from leading universities across UK and Australia trust our services
            </p>
          </div>

          {/* Scrolling Logos */}
          <div className="relative">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 w-12 sm:w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 w-12 sm:w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

            <div className="flex animate-scroll gap-4 sm:gap-8">
              {universities.map((uni) => (
                <div key={uni.name} className="flex items-center mx-4 bg-gray-50 rounded-xl px-6 sm:px-8 py-4 sm:py-6 shadow-sm hover:shadow-md transition-shadow duration-300 min-w-max">
                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      src={uni.path}
                      alt={uni.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}

              {/* Duplicate for seamless loop */}
              {universities.map((uni) => (
                <div key={`${uni.name}-2`} className="flex items-center mx-4 bg-gray-50 rounded-xl px-6 sm:px-8 py-4 sm:py-6 shadow-sm hover:shadow-md transition-shadow duration-300 min-w-max">
                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      src={uni.path}
                      alt={uni.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-50 rounded-3xl p-8 sm:p-12">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose CodeScholar Writers?
            </h3>
            <p className="text-base sm:text-lg text-gray-600">
              We deliver excellence in every project
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg flex-shrink-0`}>
                  <svg className="w-8 sm:w-10 h-8 sm:h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                  </svg>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm sm:text-base text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
