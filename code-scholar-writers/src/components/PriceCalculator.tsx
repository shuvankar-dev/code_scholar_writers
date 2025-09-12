import { useState, useEffect } from 'react';
import { ShineBorder } from '@/components/magicui/shine-border';

// Type definitions
interface Service {
  id: number;
  name: string;
  slug: string;
  unit_type: string;
  unit_label: string;
  min_units: number;
  requires_description: boolean;
  has_tool_options: boolean;
}

interface UrgencyOption {
  id: number;
  name: string;
  hours: number;
  multiplier: number;
}

interface AcademicLevel {
  id: number;
  name: string;
  multiplier: number;
}

interface Addon {
  id: number;
  name: string;
  price: number;
  price_type: string;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface ToolOption {
  id: number;
  tool_name: string;
  price_multiplier: number;
}

interface CalculatorData {
  services: Service[];
  urgencyOptions: UrgencyOption[];
  academicLevels: AcademicLevel[];
  addons: Addon[];
  currencies: Currency[];
  toolOptions: ToolOption[];
}

const PriceCalculator = () => {
  // Form state
  const [formData, setFormData] = useState({
    serviceId: '',
    units: '',
    urgencyId: '',
    academicLevelId: '',
    selectedAddon: '', // Changed from array to single selection
    toolSelection: '', // For data analysis
    projectDescription: '', // For coding projects
    currency: 'INR'
  });

  // Data from API (will be fetched later)
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({
    services: [],
    urgencyOptions: [],
    academicLevels: [],
    addons: [],
    currencies: [],
    toolOptions: []
  });

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // Mock data for now (will replace with API calls)
  useEffect(() => {
    // Simulate API data
    setCalculatorData({
      services: [
        {
          id: 1,
          name: 'Assignment Help',
          slug: 'assignment-help',
          unit_type: 'words',
          unit_label: 'Total Word Count',
          min_units: 250,
          requires_description: false,
          has_tool_options: false
        },
        {
          id: 2,
          name: 'Essay Writing',
          slug: 'essay-writing',
          unit_type: 'words',
          unit_label: 'Total Word Count',
          min_units: 250,
          requires_description: false,
          has_tool_options: false
        },
        {
          id: 3,
          name: 'Report Writing',
          slug: 'report-writing',
          unit_type: 'words',
          unit_label: 'Total Word Count',
          min_units: 500,
          requires_description: false,
          has_tool_options: false
        },
        {
          id: 4,
          name: 'Editing & Proofreading',
          slug: 'editing-proofreading',
          unit_type: 'words',
          unit_label: 'Total Word Count',
          min_units: 250,
          requires_description: false,
          has_tool_options: false
        },
        {
          id: 5,
          name: 'Data Analysis',
          slug: 'data-analysis',
          unit_type: 'tools',
          unit_label: 'Select Analysis Tool',
          min_units: 1,
          requires_description: false,
          has_tool_options: true
        },
        {
          id: 6,
          name: 'Coding Projects',
          slug: 'coding-projects',
          unit_type: 'description',
          unit_label: 'Project Description',
          min_units: 1,
          requires_description: true,
          has_tool_options: false
        }
      ],
      urgencyOptions: [
        { id: 1, name: '12 Hours', hours: 12, multiplier: 2.50 },
        { id: 2, name: '24 Hours', hours: 24, multiplier: 2.00 },
        { id: 3, name: '48 Hours', hours: 48, multiplier: 1.75 },
        { id: 4, name: '3 Days', hours: 72, multiplier: 1.50 },
        { id: 5, name: '5 Days', hours: 120, multiplier: 1.25 },
        { id: 6, name: '7 Days', hours: 168, multiplier: 1.00 },
        { id: 7, name: '14 Days', hours: 336, multiplier: 0.90 },
        { id: 8, name: '30 Days', hours: 720, multiplier: 0.80 }
      ],
      academicLevels: [
        { id: 1, name: 'High School', multiplier: 1.00 },
        { id: 2, name: 'Undergraduate', multiplier: 1.25 },
        { id: 3, name: 'Graduate/Masters', multiplier: 1.50 },
        { id: 4, name: 'PhD/Doctorate', multiplier: 1.80 }
      ],
      addons: [
        { id: 1, name: 'Plagiarism Report', price: 5.00, price_type: 'fixed' },
        { id: 2, name: 'Grammarly Check', price: 0.01, price_type: 'per_word' },
        { id: 3, name: 'Turnitin Report', price: 10.00, price_type: 'fixed' },
        { id: 4, name: 'Additional References', price: 8.00, price_type: 'fixed' },
        { id: 5, name: 'Charts & Graphs', price: 15.00, price_type: 'fixed' },
        { id: 6, name: 'Expedited Delivery', price: 25.00, price_type: 'percentage' },
        { id: 7, name: 'Multiple Drafts', price: 12.00, price_type: 'fixed' },
        { id: 8, name: 'PowerPoint Slides', price: 20.00, price_type: 'fixed' }
      ],
      currencies: [
        { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
        { code: 'USD', name: 'US Dollar', symbol: '$' }
      ],
      toolOptions: [
        { id: 1, tool_name: 'Excel Analysis', price_multiplier: 1.00 },
        { id: 2, tool_name: 'Power BI', price_multiplier: 1.25 },
        { id: 3, tool_name: 'Tableau', price_multiplier: 1.30 },
        { id: 4, tool_name: 'Python (Pandas/NumPy)', price_multiplier: 1.40 },
        { id: 5, tool_name: 'R Statistical Analysis', price_multiplier: 1.35 },
        { id: 6, tool_name: 'SPSS', price_multiplier: 1.20 },
        { id: 7, tool_name: 'SAS', price_multiplier: 1.45 },
        { id: 8, tool_name: 'Other Tools', price_multiplier: 1.15 }
      ]
    });
  }, []);

  // Handle form input changes
  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // If service changes, update selected service and reset related fields
    if (field === 'serviceId') {
      const service = calculatorData.services.find(s => s.id === Number(value));
      setSelectedService(service || null);
      setFormData(prev => ({
        ...prev,
        units: '',
        toolSelection: '',
        projectDescription: ''
      }));
    }
  };

  // Calculate price based on form data
  const calculatePrice = () => {
    if (!formData.serviceId || !formData.academicLevelId || !formData.urgencyId) {
      return;
    }

    setLoading(true);

    // Simulate API calculation delay
    setTimeout(() => {
      let basePrice = 0;
      
      // Base price calculation based on service and units
      const service = calculatorData.services.find(s => s.id === Number(formData.serviceId));
      const academicLevel = calculatorData.academicLevels.find(al => al.id === Number(formData.academicLevelId));
      const urgencyOption = calculatorData.urgencyOptions.find(uo => uo.id === Number(formData.urgencyId));
      
      if (!service || !academicLevel || !urgencyOption) {
        setLoading(false);
        return;
      }

      // Calculate base price based on service type
      switch (service.unit_type) {
        case 'words':
          const wordCount = Number(formData.units) || 0;
          basePrice = wordCount * 2; // ₹2 per word base rate
          break;
        case 'selection':
          // For data analysis tools
          const selectedTool = calculatorData.toolOptions.find(tool => tool.tool_name === formData.toolSelection);
          basePrice = 5000 * (selectedTool?.price_multiplier || 1); // Base ₹5000 for data analysis
          break;
        case 'description':
          // For programming projects - fixed base rate
          basePrice = 10000; // Base ₹10000 for programming projects
          break;
        default:
          basePrice = 1000;
      }

      // Apply academic level multiplier
      basePrice *= academicLevel.multiplier;

      // Apply urgency multiplier
      basePrice *= urgencyOption.multiplier;

      // Add addon price if selected
      if (formData.selectedAddon) {
        const addon = calculatorData.addons.find(a => a.id === Number(formData.selectedAddon));
        if (addon) {
          if (addon.price_type === 'fixed') {
            basePrice += addon.price;
          } else if (addon.price_type === 'percentage') {
            basePrice *= (1 + addon.price);
          } else if (addon.price_type === 'per_word' && service.unit_type === 'words') {
            basePrice += addon.price * Number(formData.units);
          }
        }
      }

      // Round to nearest rupee
      const finalPrice = Math.round(basePrice);
      setCalculatedPrice(finalPrice);
      setLoading(false);
    }, 1000);
  };

  // Check if form is valid for calculation
  const isFormValid = () => {
    if (!formData.serviceId || !formData.academicLevelId || !formData.urgencyId) {
      return false;
    }
    
    if (selectedService) {
      if (selectedService.unit_type === 'words' && !formData.units) {
        return false;
      }
      if (selectedService.unit_type === 'selection' && !formData.toolSelection) {
        return false;
      }
      if (selectedService.unit_type === 'description' && !formData.projectDescription) {
        return false;
      }
    }
    
    return true;
  };

  // Render different input fields based on service type
  const renderUnitInput = () => {
    if (!selectedService) return null;

    switch (selectedService.unit_type) {
      case 'words':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {selectedService.unit_label}
            </label>
            <input
              type="number"
              min={selectedService.min_units}
              value={formData.units}
              onChange={(e) => handleInputChange('units', e.target.value)}
              placeholder={`Min: ${selectedService.min_units}`}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Approximately {formData.units ? Math.ceil(Number(formData.units) / 250) : 0} pages (250 words per page)
            </p>
          </div>
        );

      case 'tools':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {selectedService.unit_label}
            </label>
            <select
              value={formData.toolSelection}
              onChange={(e) => handleInputChange('toolSelection', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select analysis tool</option>
              {calculatorData.toolOptions.map(tool => (
                <option key={tool.id} value={tool.id}>
                  {tool.tool_name} (×{tool.price_multiplier})
                </option>
              ))}
            </select>
          </div>
        );

      case 'description':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {selectedService.unit_label}
            </label>
            <textarea
              value={formData.projectDescription}
              onChange={(e) => handleInputChange('projectDescription', e.target.value)}
              placeholder="Please describe your coding project requirements, programming language, complexity, etc."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Provide detailed requirements for accurate pricing
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative overflow-hidden w-full max-w-4xl mx-auto lg:mx-0 rounded-2xl bg-white min-h-[600px]">
      <ShineBorder 
        shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} 
        borderWidth={4}
        duration={3}
      />
      <div className="relative z-10 p-8 w-full h-full">
        {/* Calculator Header */}
        <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Calculate Your Price</h3>
      </div>
      
      <p className="text-gray-600 mb-8">Get an instant quote for your academic writing needs</p>

      <form className="space-y-8">
        {/* Service Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2"></div>
              Service Type
            </div>
          </label>
          <select
            value={formData.serviceId}
            onChange={(e) => handleInputChange('serviceId', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select service type</option>
            {calculatorData.services.map(service => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Unit Input */}
        {selectedService && renderUnitInput()}

        {/* Academic Level */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <div className="w-4 h-4 "></div>
            Academic Level
          </label>
          <select
            value={formData.academicLevelId}
            onChange={(e) => handleInputChange('academicLevelId', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select academic level</option>
            {calculatorData.academicLevels.map(level => (
              <option key={level.id} value={level.id}>
                {level.name} (×{level.multiplier})
              </option>
            ))}
          </select>
        </div>

        {/* Urgency/Deadline */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <div className="w-4 h-4 "></div>
            Deadline
          </label>
          <select
            value={formData.urgencyId}
            onChange={(e) => handleInputChange('urgencyId', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select deadline</option>
            {calculatorData.urgencyOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.name} (×{option.multiplier})
              </option>
            ))}
          </select>
        </div>
    </div>

      {/* Add-ons Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Add-ons */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <div className="w-4 h-4 "></div>
            Add-ons
          </label>
          <select
            value={formData.selectedAddon}
            onChange={(e) => handleInputChange('selectedAddon', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">No add-ons</option>
            {calculatorData.addons.map(addon => (
              <option key={addon.id} value={addon.id}>
                {addon.name} - {addon.price_type === 'fixed' && `₹${addon.price}`}
                {addon.price_type === 'percentage' && `+${addon.price}%`}
                {addon.price_type === 'per_word' && `₹${addon.price}/word`}
              </option>
            ))}
          </select>
        </div>

      {/* Currency Selection */}
          <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <div className="w-4 h-4 "></div>
            Currency
          </label>
          <select
            value={formData.currency}
            onChange={(e) => handleInputChange('currency', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {calculatorData.currencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.symbol} {currency.name} ({currency.code})
              </option>
            ))}
          </select>
        </div>
        
        {/* Empty space for alignment */}
        <div></div>
      </div>

        {/* Calculate Button */}
        <button
          type="button"
          onClick={calculatePrice}
          disabled={!isFormValid() || loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Calculating...' : 'Calculate Price'}
        </button>

        {/* Price Display */}
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-sm text-gray-600 mb-1">Estimated Price</p>
          <p className="text-xl font-bold text-blue-600">
            {calculatedPrice > 0 ? `₹ ${calculatedPrice.toLocaleString('en-IN')}` : '₹ ---.--'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Final price may vary based on requirements
          </p>
          {calculatedPrice > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2">Price breakdown:</p>
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span>{calculatorData.services.find(s => s.id === Number(formData.serviceId))?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Academic Level:</span>
                  <span>{calculatorData.academicLevels.find(al => al.id === Number(formData.academicLevelId))?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deadline:</span>
                  <span>{calculatorData.urgencyOptions.find(uo => uo.id === Number(formData.urgencyId))?.name}</span>
                </div>
                {formData.selectedAddon && (
                  <div className="flex justify-between">
                    <span>Add-on:</span>
                    <span>{calculatorData.addons.find(a => a.id === Number(formData.selectedAddon))?.name}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Order/Quote Button - Show after price calculation */}
        {calculatedPrice > 0 && (
          <div className="space-y-3">
            <button
              type="button"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg"
              onClick={() => alert('Order functionality will be implemented soon!')}
            >
              Order Now - ₹{calculatedPrice.toLocaleString('en-IN')}
            </button>
            <button
              type="button"
              className="w-full bg-white border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300"
              onClick={() => alert('Quote request functionality will be implemented soon!')}
            >
              Request Custom Quote
            </button>
          </div>
        )}
      </form>
      </div>
    </div>
  );
};

export default PriceCalculator;
