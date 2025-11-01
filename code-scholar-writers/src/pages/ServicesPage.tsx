import { useState, useEffect } from 'react';

// Types for service data
interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  features: string[];
  icon: string;
  turnaroundTime: string;
  samples: string[];
}

interface ServiceCategory {
  name: string;
  description: string;
  services: Service[];
}

const ServicesPage = () => {
  const [services, setServices] = useState<ServiceCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Mock API call - replace with actual API
  useEffect(() => {
    const fetchServices = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual API call
      const mockServices: ServiceCategory[] = [
        {
          name: "Academic Writing",
          description: "Comprehensive writing services for all academic levels",
          services: [
            {
              id: 1,
              name: "Essay Writing",
              description: "Custom essays tailored to your requirements with thorough research and original content.",
              category: "Academic Writing",
              features: [
                "100% Original Content",
                "In-depth Research",
                "Proper Citations",
                "Free Revisions",
                "Plagiarism Report"
              ],
              icon: "📝",
              turnaroundTime: "24 hours",
              samples: ["Argumentative Essays", "Narrative Essays", "Descriptive Essays"]
            },
            {
              id: 2,
              name: "Research Papers",
              description: "Comprehensive research papers with extensive literature review and analysis.",
              category: "Academic Writing",
              features: [
                "Extensive Research",
                "Statistical Analysis",
                "Literature Review",
                "Methodology Section",
                "APA/MLA Formatting"
              ],
              icon: "🔬",
              turnaroundTime: "3-5 days",
              samples: ["Scientific Research", "Social Studies", "Literature Analysis"]
            },
            {
              id: 3,
              name: "Dissertation Writing",
              description: "Complete dissertation writing service from proposal to final submission.",
              category: "Academic Writing",
              features: [
                "Chapter-wise Delivery",
                "Expert Supervision",
                "Data Analysis",
                "Defense Preparation",
                "Unlimited Revisions"
              ],
              icon: "🎓",
              turnaroundTime: "2-4 weeks",
              samples: ["PhD Dissertations", "Master's Thesis", "Research Proposals"]
            }
          ]
        },
        {
          name: "Programming & Development",
          description: "Complete programming solutions and web development services",
          services: [
            {
              id: 4,
              name: "Web Development",
              description: "Full-stack web development using modern technologies and frameworks.",
              category: "Programming & Development",
              features: [
                "Responsive Design",
                "Modern Frameworks",
                "Database Integration",
                "API Development",
                "Deployment Support"
              ],
              icon: "💻",
              turnaroundTime: "1-2 weeks",
              samples: ["React Applications", "E-commerce Sites"]
            },
            {
              id: 5,
              name: "Mobile App Development",
              description: "Native and cross-platform mobile application development.",
              category: "Programming & Development",
              features: [
                "iOS & Android",
                "Cross-platform Solutions",
                "UI/UX Design",
                "Backend Integration",
                "App Store Submission"
              ],
              icon: "📱",
              turnaroundTime: "2-4 weeks",
              samples: ["Flutter Apps", "React Native", "Native iOS/Android"]
            },
            {
              id: 6,
              name: "Programming Assignments",
              description: "Help with programming assignments in various languages and frameworks.",
              category: "Programming & Development",
              features: [
                "Multiple Languages",
                "Code Documentation",
                "Testing & Debugging",
                "Performance Optimization",
                "Code Explanation"
              ],
              icon: "⚡",
              turnaroundTime: "1-3 days",
              samples: ["Python Scripts", "Java Projects", "C++ Programs"]
            }
          ]
        },
        {
          name: "Data Analysis",
          description: "Statistical analysis and data science solutions",
          services: [
            {
              id: 7,
              name: "Statistical Analysis",
              description: "Comprehensive statistical analysis using SPSS, R, Python, and other tools.",
              category: "Data Analysis",
              features: [
                "SPSS Analysis",
                "R Programming",
                "Python Data Science",
                "Statistical Reports",
                "Data Visualization"
              ],
              icon: "📊",
              turnaroundTime: "2-5 days",
              samples: ["SPSS Output", "R Analysis", "Python Jupyter Notebooks"]
            },
            {
              id: 8,
              name: "Data Visualization",
              description: "Create compelling visualizations and dashboards for your data.",
              category: "Data Analysis",
              features: [
                "Interactive Dashboards",
                "Custom Charts",
                "Tableau Expertise",
                "Power BI Solutions",
                "Web-based Viz"
              ],
              icon: "📈",
              turnaroundTime: "1-3 days",
              samples: ["Tableau Dashboards", "Power BI Reports", "D3.js Charts"]
            }
          ]
        }
      ];
      
      setServices(mockServices);
      setLoading(false);
    };

    fetchServices();
  }, []);

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(category => category.name === selectedCategory);

  const categories = ['all', ...services.map(cat => cat.name)];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading our services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive academic and technical solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Services' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {filteredServices.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.services.map((service) => (
                  <div 
                    key={service.id} 
                    className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                  >
                    {/* Service Header */}
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-4">{service.icon}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing & Timeline */}
                    {/* <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Starting from:</span>
                        <span className="text-2xl font-bold text-blue-600">${service.basePrice}/page</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Delivery:</span>
                        <span className="text-sm font-semibold text-green-600">{service.turnaroundTime}</span>
                      </div>
                    </div> */}

                    {/* Sample Types */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Types:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.samples.map((sample, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {sample}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button 
                        className="text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105"
                        style={{ background: 'linear-gradient(to right, #6a1b9a, #d32f2f, #f57c00, #fbc02d)' }}
                      >
                        Order Now
                      </button>
                      <button 
                        className="w-full text-white py-3 rounded-lg font-semibold transition-all duration-300"
                        style={{ background: 'linear-gradient(to right, #6a1b9a, #d32f2f, #f57c00, #fbc02d)' }}
                      >
                        Get Free Quote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Need a Custom Solution?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Don't see exactly what you need? We offer custom solutions tailored to your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105"
              style={{ background: 'linear-gradient(to right, #6a1b9a, #d32f2f, #f57c00, #fbc02d)' }}
            >
              Contact Us
            </button>
            <button 
              className="text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105"
              style={{ background: 'linear-gradient(to right, #6a1b9a, #d32f2f, #f57c00, #fbc02d)' }}
            >
              Calculate Price
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
