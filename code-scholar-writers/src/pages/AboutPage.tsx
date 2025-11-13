import { useState, useEffect, useRef, type FC, type ReactNode } from 'react';

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

      {/* Our Story Section - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Story Content */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                  📖 Our Journey
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Empowering Students Since 2017
                </h2>
              </div>

              <div className="space-y-6">
                {/* Story Card 1 */}
                <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                      🎯
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">The Beginning</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Founded in 2017, CodeScholar Writers began as a small team of passionate educators and writers 
                        who recognized the growing need for high-quality academic assistance in the digital age.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Story Card 2 */}
                <div className="group relative bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                      🚀
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">The Evolution</h3>
                      <p className="text-gray-700 leading-relaxed">
                        What started as a mission to help struggling students has evolved into a comprehensive platform 
                        serving thousands of students worldwide. Our founders, Dr. Sarah Mitchell and Prof. James Chen, 
                        both experienced academics, envisioned a service that would bridge the gap between complex 
                        academic requirements and student understanding.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Story Card 3 */}
                <div className="group relative bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                      ⭐
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Today & Beyond</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Today, we've grown to a team of over 150+ expert writers, researchers, and subject matter 
                        specialists, all united by our commitment to academic excellence and student success.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Animated Stats */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="grid grid-cols-2 gap-8">
                  <StatCard 
                    end={7} 
                    suffix="+" 
                    label="Years of Experience"
                    color="blue"
                    icon="🎓"
                  />
                  <StatCard 
                    end={10000} 
                    suffix="+" 
                    label="Projects Completed"
                    color="purple"
                    icon="📚"
                  />
                  <StatCard 
                    end={150} 
                    suffix="+" 
                    label="Expert Writers"
                    color="green"
                    icon="✍️"
                  />
                  <StatCard 
                    end={98} 
                    suffix="%" 
                    label="Satisfaction Rate"
                    color="orange"
                    icon="⭐"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - Professional & Compact */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #6366f1 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Growth Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A timeline of milestones that shaped our commitment to academic excellence
            </p>
          </div>

          {/* Compact Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-indigo-200"></div>

            <div className="space-y-12">
              <CompactTimelineItem 
                year="2017"
                title="Foundation"
                description="CodeScholar Writers was born from a vision to revolutionize academic assistance."
              />
              <CompactTimelineItem 
                year="2018"
                title="First 100 Projects"
                description="Reached our first major milestone with a 95% satisfaction rate."
                alignRight
              />
              <CompactTimelineItem 
                year="2020"
                title="Global Expansion"
                description="Extended services to students across 25 countries worldwide."
              />
              <CompactTimelineItem 
                year="2022"
                title="10,000+ Projects"
                description="Celebrated completing over 10,000 academic projects."
                alignRight
              />
              <CompactTimelineItem 
                year="2025"
                title="Industry Leader"
                description="150+ expert writers serving students globally with 98% satisfaction."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">
              ✨ What Sets Us Apart
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Students Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes CodeScholar Writers the preferred choice for academic excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🎯"
              title="Expert Writers"
              description="Our team consists of PhD holders and subject matter experts with years of academic writing experience."
              color="blue"
            />
            <FeatureCard 
              icon="⚡"
              title="Fast Turnaround"
              description="Meet tight deadlines without compromising quality. We deliver on time, every time."
              color="purple"
            />
            <FeatureCard 
              icon="🔒"
              title="100% Confidential"
              description="Your privacy is our priority. All information is encrypted and never shared with third parties."
              color="green"
            />
            <FeatureCard 
              icon="✅"
              title="Original Content"
              description="Every piece is written from scratch and checked through advanced plagiarism detection tools."
              color="orange"
            />
            <FeatureCard 
              icon="💬"
              title="24/7 Support"
              description="Round-the-clock customer support to assist you at any stage of your project."
              color="teal"
            />
            <FeatureCard 
              icon="🔄"
              title="Free Revisions"
              description="Unlimited revisions until you're completely satisfied with the final result."
              color="indigo"
            />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              💎 Core Values
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Drives Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and define who we are as a company
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard 
              icon="🎓"
              title="Academic Excellence"
              description="We maintain the highest standards of academic integrity and quality in every project we deliver, ensuring original, well-researched content."
              gradient="from-blue-500 to-blue-600"
            />
            <ValueCard 
              icon="🚀"
              title="Student Success"
              description="Your success is our success. We're committed to helping you achieve your academic goals through personalized support and guidance."
              gradient="from-purple-500 to-purple-600"
            />
            <ValueCard 
              icon="👁️"
              title="Transparency"
              description="We believe in honest communication, clear pricing, and transparent processes. No hidden fees, no surprises - just straightforward service."
              gradient="from-green-500 to-green-600"
            />
            <ValueCard 
              icon="💡"
              title="Innovation"
              description="We continuously evolve our methods and tools to provide cutting-edge solutions that meet the changing needs of modern education."
              gradient="from-orange-500 to-orange-600"
            />
            <ValueCard 
              icon="⏰"
              title="24/7 Availability"
              description="Academic deadlines don't wait, and neither do we. Our support team is available around the clock to assist you whenever you need help."
              gradient="from-teal-500 to-teal-600"
            />
            <ValueCard 
              icon="🌍"
              title="Global Reach"
              description="We serve students worldwide, understanding diverse academic systems and cultural contexts to provide truly global educational support."
              gradient="from-indigo-500 to-indigo-600"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience the Difference?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have achieved academic success with our help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-2xl"
              style={{ background: 'linear-gradient(to right, #6a1b9a, #d32f2f, #f57c00, #fbc02d)' }}
            >
              Get Started Today
            </button>
            <button 
              className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-2xl"
            >
              View Our Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Compact Timeline Item Component - NEW PROFESSIONAL VERSION
type CompactTimelineItemProps = {
  year: string;
  title: string;
  description: string;
  alignRight?: boolean;
};

const CompactTimelineItem: FC<CompactTimelineItemProps> = ({ 
  year, 
  title, 
  description, 
  alignRight = false 
}) => {
  return (
    <div className={`relative flex items-center ${alignRight ? 'md:justify-end' : 'md:justify-start'}`}>
      {/* Timeline dot */}
      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-4 h-4 rounded-full bg-white border-4 border-indigo-600 shadow-lg"></div>
      </div>

      {/* Content card */}
      <div className={`ml-20 md:ml-0 md:w-5/12 ${alignRight ? 'md:mr-auto md:ml-0 md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
          {/* Year badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold mb-3 ${alignRight ? 'md:float-right md:ml-4' : 'md:float-left md:mr-4'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {year}
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

// Feature Card Component
type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  color: 'blue' | 'purple' | 'green' | 'orange' | 'teal' | 'indigo';
};

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    teal: 'from-teal-500 to-teal-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
      <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[color]} rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

// Value Card Component
type ValueCardProps = {
  icon: string;
  title: string;
  description: string;
  gradient: string;
};

const ValueCard: FC<ValueCardProps> = ({ icon, title, description, gradient }) => {
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group">
      <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${gradient}`}></div>
      <div className="p-8">
        <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 text-3xl text-white group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// Animated Counter Component
type StatCardProps = {
  end: number;
  suffix?: string;
  label: string;
  color: 'blue' | 'purple' | 'green' | 'orange';
  icon?: ReactNode | string;
};

const StatCard: FC<StatCardProps> = ({ end, suffix = '', label, color, icon }) => {
  const [count, setCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const counterRef = useRef<HTMLDivElement | null>(null);

  const colors: Record<StatCardProps['color'], string> = {
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
  };

  const bgColors: Record<StatCardProps['color'], string> = {
    blue: 'bg-blue-50',
    purple: 'bg-purple-50',
    green: 'bg-green-50',
    orange: 'bg-orange-50',
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | undefined;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const easeOutQuad = progress * (2 - progress);
      const currentCount = Math.floor(easeOutQuad * end);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end]);

  return (
    <div 
      ref={counterRef}
      className={`text-center p-6 rounded-2xl ${bgColors[color]} border-2 border-transparent hover:border-${color}-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className={`text-5xl font-bold ${colors[color]} mb-2 tabular-nums`}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-600 font-medium leading-tight">
        {label}
      </div>
    </div>
  );
};

export default AboutPage;
