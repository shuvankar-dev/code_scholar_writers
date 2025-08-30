import { useState, useEffect } from 'react';

// Types for pricing data
interface PricingTier {
  id: number;
  name: string;
  description: string;
  features: string[];
  pricePerPage: number;
  turnaroundTime: string;
  revisions: string;
  support: string;
  popular?: boolean;
}

interface ServicePricing {
  serviceType: string;
  tiers: PricingTier[];
}

interface AcademicLevel {
  level: string;
  multiplier: number;
}

interface UrgencyOption {
  time: string;
  multiplier: number;
}

const PricingPage = () => {
  const [pricingData, setPricingData] = useState<ServicePricing[]>([]);
  const [selectedService, setSelectedService] = useState<string>('Academic Writing');
  const [selectedLevel, setSelectedLevel] = useState<string>('College');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('7 days');
  const [pages, setPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API
  const academicLevels: AcademicLevel[] = [
    { level: 'High School', multiplier: 1.0 },
    { level: 'College', multiplier: 1.2 },
    { level: 'University', multiplier: 1.4 },
    { level: 'Masters', multiplier: 1.6 },
    { level: 'PhD', multiplier: 2.0 }
  ];

  const urgencyOptions: UrgencyOption[] = [
    { time: '14+ days', multiplier: 0.8 },
    { time: '10 days', multiplier: 1.0 },
    { time: '7 days', multiplier: 1.2 },
    { time: '5 days', multiplier: 1.4 },
    { time: '3 days', multiplier: 1.8 },
    { time: '24 hours', multiplier: 2.5 },
    { time: '12 hours', multiplier: 3.5 },
    { time: '6 hours', multiplier: 5.0 }
  ];

  useEffect(() => {
    const fetchPricingData = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPricingData: ServicePricing[] = [
        {
          serviceType: 'Academic Writing',
          tiers: [
            {
              id: 1,
              name: 'Standard',
              description: 'Perfect for regular assignments and essays',
              features: [
                'High-quality writing',
                'Basic research',
                'Standard formatting',
                '3 free revisions',
                'Email support',
                'Plagiarism report'
              ],
              pricePerPage: 12,
              turnaroundTime: '7 days',
              revisions: '3 free',
              support: 'Email'
            },
            {
              id: 2,
              name: 'Premium',
              description: 'Enhanced quality with expert writers',
              features: [
                'Expert-level writing',
                'In-depth research',
                'Advanced formatting',
                '5 free revisions',
                'Priority support',
                'Plagiarism report',
                'Quality assurance review'
              ],
              pricePerPage: 18,
              turnaroundTime: '5 days',
              revisions: '5 free',
              support: 'Priority',
              popular: true
            },
            {
              id: 3,
              name: 'Platinum',
              description: 'Ultimate quality with top-tier experts',
              features: [
                'Top-tier expert writers',
                'Comprehensive research',
                'Premium formatting',
                'Unlimited revisions',
                '24/7 VIP support',
                'Advanced plagiarism report',
                'Quality assurance review',
                'Progress updates'
              ],
              pricePerPage: 25,
              turnaroundTime: '3 days',
              revisions: 'Unlimited',
              support: '24/7 VIP'
            }
          ]
        },
        {
          serviceType: 'Programming',
          tiers: [
            {
              id: 4,
              name: 'Basic',
              description: 'Simple programming tasks and assignments',
              features: [
                'Code development',
                'Basic documentation',
                'Testing included',
                '2 free revisions',
                'Email support'
              ],
              pricePerPage: 20,
              turnaroundTime: '5 days',
              revisions: '2 free',
              support: 'Email'
            },
            {
              id: 5,
              name: 'Advanced',
              description: 'Complex projects with advanced features',
              features: [
                'Advanced development',
                'Comprehensive documentation',
                'Full testing suite',
                '4 free revisions',
                'Priority support',
                'Code review'
              ],
              pricePerPage: 35,
              turnaroundTime: '7 days',
              revisions: '4 free',
              support: 'Priority',
              popular: true
            },
            {
              id: 6,
              name: 'Enterprise',
              description: 'Large-scale applications and systems',
              features: [
                'Enterprise-level development',
                'Full documentation',
                'Comprehensive testing',
                'Unlimited revisions',
                '24/7 support',
                'Code review',
                'Performance optimization',
                'Deployment assistance'
              ],
              pricePerPage: 50,
              turnaroundTime: '10 days',
              revisions: 'Unlimited',
              support: '24/7'
            }
          ]
        },
        {
          serviceType: 'Data Analysis',
          tiers: [
            {
              id: 7,
              name: 'Basic Analysis',
              description: 'Standard statistical analysis and reporting',
              features: [
                'Descriptive statistics',
                'Basic visualizations',
                'SPSS/R analysis',
                'Standard report',
                '2 free revisions'
              ],
              pricePerPage: 25,
              turnaroundTime: '5 days',
              revisions: '2 free',
              support: 'Email'
            },
            {
              id: 8,
              name: 'Advanced Analysis',
              description: 'Complex statistical modeling and analysis',
              features: [
                'Advanced statistical tests',
                'Custom visualizations',
                'Multiple software tools',
                'Detailed interpretation',
                '4 free revisions',
                'Data cleaning included'
              ],
              pricePerPage: 40,
              turnaroundTime: '7 days',
              revisions: '4 free',
              support: 'Priority',
              popular: true
            },
            {
              id: 9,
              name: 'Research Grade',
              description: 'Publication-ready analysis and methodology',
              features: [
                'Research-grade analysis',
                'Publication-ready figures',
                'Methodology section',
                'Statistical consultation',
                'Unlimited revisions',
                'Data validation',
                'Results interpretation'
              ],
              pricePerPage: 60,
              turnaroundTime: '10 days',
              revisions: 'Unlimited',
              support: '24/7'
            }
          ]
        }
      ];
      
      setPricingData(mockPricingData);
      setLoading(false);
    };

    fetchPricingData();
  }, []);

  const currentServicePricing = pricingData.find(service => service.serviceType === selectedService);
  
  const calculatePrice = (basePrice: number) => {
    const levelMultiplier = academicLevels.find(level => level.level === selectedLevel)?.multiplier || 1;
    const urgencyMultiplier = urgencyOptions.find(urgency => urgency.time === selectedUrgency)?.multiplier || 1;
    
    return Math.round(basePrice * levelMultiplier * urgencyMultiplier * pages);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading pricing information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Transparent Pricing</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Choose the perfect plan for your academic needs with our flexible pricing options
          </p>
        </div>
      </section>

      {/* Price Calculator */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Calculate Your Price</h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
              <select 
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {pricingData.map(service => (
                  <option key={service.serviceType} value={service.serviceType}>
                    {service.serviceType}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Level</label>
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {academicLevels.map(level => (
                  <option key={level.level} value={level.level}>
                    {level.level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
              <select 
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {urgencyOptions.map(urgency => (
                  <option key={urgency.time} value={urgency.time}>
                    {urgency.time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pages</label>
              <input 
                type="number"
                value={pages}
                onChange={(e) => setPages(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{selectedService} Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that best fits your requirements</p>
          </div>

          {currentServicePricing && (
            <div className="grid md:grid-cols-3 gap-8">
              {currentServicePricing.tiers.map((tier) => (
                <div 
                  key={tier.id}
                  className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                    tier.popular 
                      ? 'border-2 border-blue-500 transform scale-105' 
                      : 'border border-gray-200'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <p className="text-gray-600 mb-4">{tier.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-blue-600">
                        ${calculatePrice(tier.pricePerPage)}
                      </span>
                      <span className="text-gray-500"> total</span>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      Base: ${tier.pricePerPage}/page × {pages} page(s)
                      <br />
                      Level: {selectedLevel} | Deadline: {selectedUrgency}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery:</span>
                      <span className="font-medium text-gray-900">{tier.turnaroundTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Revisions:</span>
                      <span className="font-medium text-gray-900">{tier.revisions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Support:</span>
                      <span className="font-medium text-gray-900">{tier.support}</span>
                    </div>
                  </div>

                  <button 
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                        : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    Order Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Pricing FAQ</h2>
          
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What's included in the base price?</h3>
              <p className="text-gray-600">
                Our base price includes high-quality writing, research, proper formatting, plagiarism report, 
                and the specified number of free revisions based on your chosen tier.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How does academic level affect pricing?</h3>
              <p className="text-gray-600">
                Higher academic levels require more expertise and research depth. PhD-level work requires 
                specialized knowledge and carries a 2x multiplier, while high school work has no additional charge.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I get a discount for larger orders?</h3>
              <p className="text-gray-600">
                Yes! We offer volume discounts for orders over 10 pages. Contact our support team for 
                custom pricing on large projects or multiple assignments.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, bank transfers, and cryptocurrency payments. 
                All transactions are secured with 256-bit SSL encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied students who have achieved academic success with our help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300">
              Order Now
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
