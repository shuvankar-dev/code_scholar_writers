const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About CodeScholar Writers</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Your trusted partner in academic excellence, providing top-quality writing services with 7+ years of experience
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  Founded in 2017, CodeScholar Writers began as a small team of passionate educators and writers 
                  who recognized the growing need for high-quality academic assistance in the digital age.
                </p>
                <p>
                  What started as a mission to help struggling students has evolved into a comprehensive platform 
                  serving thousands of students worldwide. Our founders, Dr. Sarah Mitchell and Prof. James Chen, 
                  both experienced academics, envisioned a service that would bridge the gap between complex 
                  academic requirements and student understanding.
                </p>
                <p>
                  Today, we've grown to a team of over 150+ expert writers, researchers, and subject matter 
                  specialists, all united by our commitment to academic excellence and student success.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">7+</div>
                  <div className="text-gray-600">Years of Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">150+</div>
                  <div className="text-gray-600">Expert Writers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and define who we are as a company
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Academic Excellence */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Academic Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We maintain the highest standards of academic integrity and quality in every project we deliver, 
                ensuring original, well-researched content.
              </p>
            </div>

            {/* Student Success */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Student Success</h3>
              <p className="text-gray-600 leading-relaxed">
                Your success is our success. We're committed to helping you achieve your academic goals 
                through personalized support and guidance.
              </p>
            </div>

            {/* Transparency */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Transparency</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in honest communication, clear pricing, and transparent processes. 
                No hidden fees, no surprises - just straightforward service.
              </p>
            </div>

            {/* Innovation */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
              <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                We continuously evolve our methods and tools to provide cutting-edge solutions 
                that meet the changing needs of modern education.
              </p>
            </div>

            {/* 24/7 Support */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200">
              <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Academic deadlines don't wait, and neither do we. Our support team is available 
                around the clock to assist you whenever you need help.
              </p>
            </div>

            {/* Global Reach */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Reach</h3>
              <p className="text-gray-600 leading-relaxed">
                We serve students worldwide, understanding diverse academic systems and 
                cultural contexts to provide truly global educational support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals leading our mission to transform academic assistance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Founder 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">SD</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Shuvankar Das</h3>
              <p className="text-blue-600 font-semibold mb-4">Co-Founder & CEO</p>
              <p className="text-gray-600 leading-relaxed">
                PhD in Educational Psychology, 15+ years in academic consulting. Passionate about 
                bridging the gap between complex academic requirements and student success.
              </p>
            </div>

            {/* Founder 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">SS</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Saikat Saha</h3>
              <p className="text-purple-600 font-semibold mb-4">Co-Founder & CTO</p>
              <p className="text-gray-600 leading-relaxed">
                Professor of Computer Science, expert in educational technology. Leads our 
                technical innovation and platform development initiatives.
              </p>
            </div>

            {/* Team Member */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">AR</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ananya Roy</h3>
              <p className="text-green-600 font-semibold mb-4">Head of Quality Assurance</p>
              <p className="text-gray-600 leading-relaxed">
                PhD in Literature, ensures every piece of work meets our rigorous quality standards. 
                Oversees our team of expert editors and reviewers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience the Difference?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have achieved academic success with our help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105"
              style={{ background: 'linear-gradient(to right, #6a1b9a, #d32f2f, #f57c00, #fbc02d)' }}
            >
              Get Started Today
            </button>
            <button 
              className="text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105"
              style={{ background: 'linear-gradient(to right, #6a1b9a, #d32f2f, #f57c00, #fbc02d)' }}
            >
              View Our Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
