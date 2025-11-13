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
