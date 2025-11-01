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

interface DynamicPrices {
  price_per_word: number;
  data_analysis_base: number;
  programming_base: number;
  academic_multipliers: { [key: string]: number };
  urgency_multipliers: { [key: string]: number };
  addon_prices: { [key: string]: number };
  tool_multipliers: { [key: string]: number };
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

  // Customer details for order
  const [customerData, setCustomerData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    subject: '',
    instructions: ''
  });

  // File upload state
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [dynamicPrices, setDynamicPrices] = useState<DynamicPrices | null>(null);
  const [pricesLoading, setPricesLoading] = useState(true);

  // Fetch master prices from database
  const fetchMasterPrices = async () => {
    try {
      const response = await fetch('http://localhost/codescholarwriters-api/admin/get_prices.php');
      const data = await response.json();

      if (data.success) {
        const prices = data.prices;
        
        // Transform the master prices into a usable format
        const dynamicPricesData: DynamicPrices = {
          price_per_word: 2.00, // default fallback
          data_analysis_base: 5000.00,
          programming_base: 10000.00,
          academic_multipliers: {},
          urgency_multipliers: {},
          addon_prices: {},
          tool_multipliers: {}
        };

        // Process base prices
        prices.base?.forEach((price: any) => {
          if (price.price_key === 'price_per_word') {
            dynamicPricesData.price_per_word = parseFloat(price.price_value);
          } else if (price.price_key === 'data_analysis_base') {
            dynamicPricesData.data_analysis_base = parseFloat(price.price_value);
          } else if (price.price_key === 'programming_base') {
            dynamicPricesData.programming_base = parseFloat(price.price_value);
          }
        });

        // Process academic level multipliers
        prices.academic_level?.forEach((price: any) => {
          dynamicPricesData.academic_multipliers[price.price_key] = parseFloat(price.price_value);
        });

        // Process urgency multipliers
        prices.urgency?.forEach((price: any) => {
          dynamicPricesData.urgency_multipliers[price.price_key] = parseFloat(price.price_value);
        });

        // Process addon prices
        prices.addon?.forEach((price: any) => {
          dynamicPricesData.addon_prices[price.price_key] = parseFloat(price.price_value);
        });

        // Process tool multipliers
        prices.tool?.forEach((price: any) => {
          dynamicPricesData.tool_multipliers[price.price_key] = parseFloat(price.price_value);
        });

        setDynamicPrices(dynamicPricesData);
        console.log('Dynamic prices loaded:', dynamicPricesData);
      } else {
        console.error('Failed to fetch master prices:', data.error);
        // Keep default hardcoded prices as fallback
      }
    } catch (error) {
      console.error('Error fetching master prices:', error);
      // Keep default hardcoded prices as fallback
    } finally {
      setPricesLoading(false);
    }
  };

  // Mock data for now (will replace with API calls)
  useEffect(() => {
    // Fetch master prices from API
    fetchMasterPrices();
    
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
        { id: 1, name: '12 Hours', hours: 12, multiplier: 2500 },
        { id: 2, name: '24 Hours', hours: 24, multiplier: 2000 },
        { id: 3, name: '48 Hours', hours: 48, multiplier: 1500 },
        { id: 4, name: '3 Days', hours: 72, multiplier: 1000 },
        { id: 5, name: '5 Days', hours: 120, multiplier: 500 },
        { id: 6, name: '7 Days', hours: 168, multiplier: 0 },
        { id: 7, name: '14 Days', hours: 336, multiplier: -500 },
        { id: 8, name: '30 Days', hours: 720, multiplier: -1000 }
      ],
      academicLevels: [
        { id: 1, name: 'High School', multiplier: 0 },
        { id: 2, name: 'Undergraduate', multiplier: 500 },
        { id: 3, name: 'Graduate/Masters', multiplier: 1000 },
        { id: 4, name: 'PhD/Doctorate', multiplier: 2000 }
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
        { id: 1, tool_name: 'Excel Analysis', price_multiplier: 0 },
        { id: 2, tool_name: 'Power BI', price_multiplier: 1000 },
        { id: 3, tool_name: 'Tableau', price_multiplier: 1500 },
        { id: 4, tool_name: 'Python (Pandas/NumPy)', price_multiplier: 2000 },
        { id: 5, tool_name: 'R Statistical Analysis', price_multiplier: 1800 },
        { id: 6, tool_name: 'SPSS', price_multiplier: 800 },
        { id: 7, tool_name: 'SAS', price_multiplier: 2200 },
        { id: 8, tool_name: 'Other Tools', price_multiplier: 500 }
      ]
    });
  }, []);

  // Handle customer data input changes
  const handleCustomerInputChange = (field: string, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif'
    ];

    const validFiles = files.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        alert(`File type not supported: ${file.name}`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert(`File too large: ${file.name}. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  // Remove uploaded file
  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Get file icon based on type
  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) return '📄';
    if (file.type.includes('word')) return '📝';
    if (file.type.includes('excel') || file.type.includes('sheet')) return '📊';
    if (file.type.includes('csv')) return '📋';
    if (file.type.includes('image')) return '🖼️';
    return '📎';
  };

  // Submit order to database
  const handleOrderSubmit = async () => {
    if (!customerData.customer_name || !customerData.customer_email) {
      alert('Please fill in required customer details');
      return;
    }

    setOrderLoading(true);
    
    try {
      const service = calculatorData.services.find(s => s.id === Number(formData.serviceId));
      const academicLevel = calculatorData.academicLevels.find(al => al.id === Number(formData.academicLevelId));
      const urgencyOption = calculatorData.urgencyOptions.find(uo => uo.id === Number(formData.urgencyId));
      
      // Calculate deadline date/time
      const deadlineDate = new Date();
      deadlineDate.setHours(deadlineDate.getHours() + (urgencyOption?.hours || 168));
      
      const orderData = {
        customer_name: customerData.customer_name,
        customer_email: customerData.customer_email,
        customer_phone: customerData.customer_phone,
        service_type: service?.name || '',
        assignment_type: service?.name || '',
        academic_level: academicLevel?.name || '',
        pages: service?.unit_type === 'words' ? Math.ceil(Number(formData.units) / 250) : null,
        words: service?.unit_type === 'words' ? Number(formData.units) : null,
        deadline_date: deadlineDate.toISOString().split('T')[0],
        deadline_time: deadlineDate.toTimeString().split(' ')[0],
        subject: customerData.subject,
        instructions: customerData.instructions || formData.projectDescription,
        total_price: calculatedPrice,
        currency: formData.currency
      };

      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('order_data', JSON.stringify(orderData));
      
      // Add files
      uploadedFiles.forEach((file) => {
        formDataToSend.append(`files[]`, file);
      });

      const response = await fetch('http://localhost/codescholarwriters-api/admin/create_order_with_files.php', {
        method: 'POST',
        body: formDataToSend, // Don't set Content-Type header for FormData
      });

      const result = await response.json();

      if (result.success) {
        setOrderSuccess(`Order created successfully! Order ID: ${result.order_id}${uploadedFiles.length > 0 ? `. ${uploadedFiles.length} file(s) uploaded.` : ''}`);
        setShowToast(true);
        
        // Show toast message
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
        
        // Reset forms and files
        setShowOrderForm(false);
        setUploadedFiles([]);
        setCustomerData({
          customer_name: '',
          customer_email: '',
          customer_phone: '',
          subject: '',
          instructions: ''
        });
        setFormData({
          serviceId: '',
          units: '',
          urgencyId: '',
          academicLevelId: '',
          selectedAddon: '',
          toolSelection: '',
          projectDescription: '',
          currency: 'INR'
        });
        setCalculatedPrice(0);
        setSelectedService(null);
      } else {
        alert('Error creating order: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Error submitting order. Please try again.');
      console.error('Order submission error:', error);
    } finally {
      setOrderLoading(false);
    }
  };

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
    if (!formData.serviceId || !formData.academicLevelId || !formData.urgencyId || !dynamicPrices) {
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

      // Calculate base price based on service type using dynamic prices
      switch (service.unit_type) {
        case 'words':
          const wordCount = Number(formData.units) || 0;
          basePrice = wordCount * dynamicPrices.price_per_word; // Use dynamic price per word
          break;
        case 'tools':
          // For data analysis tools
          const selectedTool = calculatorData.toolOptions.find(tool => tool.id === Number(formData.toolSelection));
          const toolKey = selectedTool?.tool_name.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'excel_analysis';
          const toolAddition = dynamicPrices.tool_multipliers[toolKey] || selectedTool?.price_multiplier || 0;
          basePrice = dynamicPrices.data_analysis_base + toolAddition; // Use dynamic data analysis base price with addition
          break;
        case 'description':
          // For programming projects - use dynamic programming base price
          basePrice = dynamicPrices.programming_base;
          break;
        default:
          basePrice = 1000;
      }

      // Apply academic level addition using dynamic prices
      const academicKey = academicLevel.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const academicAddition = dynamicPrices.academic_multipliers[academicKey] || academicLevel.multiplier;
      basePrice += academicAddition;

      // Apply urgency addition using dynamic prices
      const urgencyKey = urgencyOption.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const urgencyAddition = dynamicPrices.urgency_multipliers[urgencyKey] || urgencyOption.multiplier;
      basePrice += urgencyAddition;

      // Add addon price if selected using dynamic prices
      if (formData.selectedAddon) {
        const addon = calculatorData.addons.find(a => a.id === Number(formData.selectedAddon));
        if (addon) {
          const addonKey = addon.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
          const addonPrice = dynamicPrices.addon_prices[addonKey] || addon.price;
          
          if (addon.price_type === 'fixed') {
            basePrice += addonPrice;
          } else if (addon.price_type === 'percentage') {
            basePrice *= (1 + addonPrice / 100);
          } else if (addon.price_type === 'per_word' && service.unit_type === 'words') {
            basePrice += addonPrice * Number(formData.units);
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
      if (selectedService.unit_type === 'tools' && !formData.toolSelection) {
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
                  {tool.tool_name} (+₹{tool.price_multiplier})
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
        borderWidth={2}
        duration={50}
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

      {/* Loading State for Prices */}
      {pricesLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pricing information...</p>
        </div>
      ) : (

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
                {level.name} (+₹{level.multiplier})
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
                {option.name} (+₹{option.multiplier})
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
          className="w-full text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(to right, #6a1b9a, #d32f2f, #f57c00, #fbc02d)' }}
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
        {calculatedPrice > 0 && !showOrderForm && (
          <div className="space-y-3">
            <button
              type="button"
              className="w-full text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg"
              style={{ background: 'linear-gradient(to right, #6a1b9a, #d32f2f, #f57c00, #fbc02d)' }}
              onClick={() => setShowOrderForm(true)}
            >
              Order Now - {formData.currency === 'USD' ? '$' : '₹'}{calculatedPrice.toLocaleString('en-IN')}
            </button>
            <button
              type="button"
              className="w-full text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg"
              style={{ background: 'linear-gradient(to right, #6a1b9a, #d32f2f, #f57c00, #fbc02d)' }}
              onClick={() => alert('Quote request functionality will be implemented soon!')}
            >
              Request Custom Quote
            </button>
          </div>
        )}

        {/* Customer Details Form */}
        {showOrderForm && (
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Customer Details</h4>
            
            {orderSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {orderSuccess}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={customerData.customer_name}
                  onChange={(e) => handleCustomerInputChange('customer_name', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={customerData.customer_email}
                  onChange={(e) => handleCustomerInputChange('customer_email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={customerData.customer_phone}
                  onChange={(e) => handleCustomerInputChange('customer_phone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject/Topic
                </label>
                <input
                  type="text"
                  value={customerData.subject}
                  onChange={(e) => handleCustomerInputChange('subject', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Assignment subject or topic"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Instructions
              </label>
              <textarea
                value={customerData.instructions}
                onChange={(e) => handleCustomerInputChange('instructions', e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any specific requirements or instructions for your order"
              />
            </div>

            {/* File Upload Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attach Files (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.jpg,.jpeg,.png,.gif"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-600 font-medium">Click to upload files</span>
                    <span className="text-xs text-gray-500 mt-1">
                      Support: PDF, Word, Excel, CSV, Images (Max 10MB each)
                    </span>
                  </div>
                </label>
              </div>
              
              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h5>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{getFileIcon(file)}</span>
                          <div>
                            <span className="text-sm font-medium text-gray-900">{file.name}</span>
                            <span className="text-xs text-gray-500 ml-2">
                              ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleOrderSubmit}
                disabled={orderLoading}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg disabled:opacity-50"
              >
                {orderLoading ? 'Placing Order...' : `Place Order - ${formData.currency === 'USD' ? '$' : '₹'}${calculatedPrice.toLocaleString('en-IN')}`}
              </button>
              
              <button
                type="button"
                onClick={() => setShowOrderForm(false)}
                className="px-6 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
      )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-4 z-[99999] max-w-sm">
          <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl border-l-4 border-green-800 animate-slide-in backdrop-blur-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="font-bold text-sm">Order Received!</p>
                <p className="text-xs text-green-100 mt-1">We got your order. We will confirm you by email/phone number.</p>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="ml-3 text-green-200 hover:text-white transition-colors flex-shrink-0 bg-green-700 hover:bg-green-800 rounded-full p-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceCalculator;
