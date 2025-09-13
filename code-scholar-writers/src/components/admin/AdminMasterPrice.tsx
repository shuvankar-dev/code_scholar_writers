import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PriceItem {
  id: number;
  price_type: string;
  price_key: string;
  price_value: string;
  currency: string;
  description: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

interface OrganizedPrices {
  base: PriceItem[];
  academic_level: PriceItem[];
  urgency: PriceItem[];
  addon: PriceItem[];
  tool: PriceItem[];
}

const AdminMasterPrice = () => {
  const [prices, setPrices] = useState<OrganizedPrices>({
    base: [],
    academic_level: [],
    urgency: [],
    addon: [],
    tool: []
  });
  const [editingPrices, setEditingPrices] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    fetchPrices();
  }, [navigate]);

  const fetchPrices = async () => {
    try {
      const response = await fetch('http://localhost/codescholarwriters-api/admin/get_prices.php');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      console.log('Raw API response:', text); // Debug log
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid JSON response from server');
      }

      console.log('Parsed data:', data); // Debug log

      if (data.success) {
        setPrices(data.prices || {
          base: [],
          academic_level: [],
          urgency: [],
          addon: [],
          tool: []
        });
        
        // Initialize editing prices with current values
        const editingState: {[key: string]: string} = {};
        if (data.all_prices && Array.isArray(data.all_prices)) {
          data.all_prices.forEach((price: PriceItem) => {
            editingState[price.price_key] = price.price_value;
          });
        }
        setEditingPrices(editingState);
        
        console.log('Prices loaded successfully:', data.prices); // Debug log
      } else {
        showToastMessage('Failed to load prices: ' + (data.error || 'Unknown error'), 'error');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      showToastMessage('Error fetching prices: ' + error, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handlePriceChange = (priceKey: string, value: string) => {
    setEditingPrices(prev => ({
      ...prev,
      [priceKey]: value
    }));
  };

  const updateSinglePrice = async (priceKey: string) => {
    setSaving(true);
    try {
      const response = await fetch('http://localhost/codescholarwriters-api/admin/update_prices.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        credentials: 'include', // Include cookies for session
        body: JSON.stringify({
          action: 'update_single',
          price_key: priceKey,
          price_value: parseFloat(editingPrices[priceKey])
        }),
      });

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Response text:', text);
        throw new Error('Invalid JSON response from server');
      }

      if (result.success) {
        showToastMessage('Price updated successfully!', 'success');
        fetchPrices(); // Refresh the data
      } else {
        showToastMessage('Failed to update price: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Update error:', error);
      showToastMessage('Error updating price: ' + error, 'error');
    } finally {
      setSaving(false);
    }
  };

  const updateAllPrices = async () => {
    setSaving(true);
    try {
      const priceUpdates = Object.entries(editingPrices).map(([price_key, price_value]) => ({
        price_key,
        price_value: parseFloat(price_value)
      }));

      const response = await fetch('http://localhost/codescholarwriters-api/admin/update_prices.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        credentials: 'include', // Include cookies for session
        body: JSON.stringify({
          action: 'update_multiple',
          prices: priceUpdates
        }),
      });

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Response text:', text);
        throw new Error('Invalid JSON response from server');
      }

      if (result.success) {
        showToastMessage('All prices updated successfully!', 'success');
        fetchPrices(); // Refresh the data
      } else {
        showToastMessage('Failed to update prices: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Update error:', error);
      showToastMessage('Error updating prices: ' + error, 'error');
    } finally {
      setSaving(false);
    }
  };

  const formatPriceKey = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getPriceTypeIcon = (type: string) => {
    switch (type) {
      case 'base':
        return (
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        );
      case 'academic_level':
        return (
          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        );
      case 'urgency':
        return (
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'addon':
        return (
          <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
      case 'tool':
        return (
          <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
    }
  };

  const getPriceTypeTitle = (type: string) => {
    switch (type) {
      case 'base':
        return 'Base Prices';
      case 'academic_level':
        return 'Academic Level Multipliers';
      case 'urgency':
        return 'Urgency Multipliers';
      case 'addon':
        return 'Add-on Services';
      case 'tool':
        return 'Tool Multipliers';
      default:
        return 'Other Prices';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading prices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Master Price Configuration</h1>
              <p className="text-gray-400">Manage all pricing rules and multipliers</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate('/admin/dashboard')}
                variant="outline"
                className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Back to Dashboard
              </Button>
              <Button
                onClick={updateAllPrices}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {saving ? 'Saving...' : 'Save All Changes'}
              </Button>
            </div>
          </div>
        </div>

        {/* Price Categories */}
        <div className="space-y-8">
          {Object.entries(prices).map(([type, priceList]) => (
            <Card key={type} className="bg-gray-800 border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-700 rounded-lg">
                  {getPriceTypeIcon(type)}
                </div>
                <h2 className="text-xl font-bold text-white">{getPriceTypeTitle(type)}</h2>
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {priceList.length} items
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {priceList.map((price: PriceItem) => (
                  <div
                    key={price.price_key}
                    className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:bg-gray-650 transition-colors"
                  >
                    <div className="mb-3">
                      <Label className="text-gray-300 text-sm font-medium">
                        {formatPriceKey(price.price_key)}
                      </Label>
                      <p className="text-gray-500 text-xs mt-1">{price.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          value={editingPrices[price.price_key] || ''}
                          onChange={(e) => handlePriceChange(price.price_key, e.target.value)}
                          className="bg-gray-600 border-gray-500 text-white focus:border-blue-500"
                          placeholder="0.00"
                        />
                      </div>
                      <Button
                        size="sm"
                        onClick={() => updateSinglePrice(price.price_key)}
                        disabled={saving}
                        className="bg-green-600 hover:bg-green-700 text-white px-3"
                      >
                        Save
                      </Button>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-gray-400">
                        Currency: {price.currency}
                      </span>
                      <span className="text-gray-400">
                        Updated: {new Date(price.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Card */}
        <Card className="bg-gray-800 border-gray-700 p-6 mt-8">
          <h3 className="text-lg font-bold text-white mb-4">Price Configuration Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(prices).map(([type, priceList]) => (
              <div key={type} className="text-center">
                <div className="flex justify-center mb-2 p-2 bg-gray-700 rounded-lg w-12 h-12 mx-auto items-center">
                  {getPriceTypeIcon(type)}
                </div>
                <p className="text-white font-medium">{priceList.length}</p>
                <p className="text-gray-400 text-sm">{getPriceTypeTitle(type)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-4 z-[99999] max-w-sm">
          <div className={`${toastType === 'success' ? 'bg-green-600 border-green-800' : 'bg-red-600 border-red-800'} text-white px-6 py-4 rounded-lg shadow-2xl border-l-4 animate-slide-in backdrop-blur-sm border`}>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {toastType === 'success' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
              <div className="flex-1">
                <p className="font-bold text-sm">{toastType === 'success' ? 'Success!' : 'Error!'}</p>
                <p className="text-xs mt-1 opacity-90">{toastMessage}</p>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className={`ml-3 transition-colors flex-shrink-0 rounded-full p-1 ${toastType === 'success' ? 'text-green-200 hover:text-white bg-green-700 hover:bg-green-800' : 'text-red-200 hover:text-white bg-red-700 hover:bg-red-800'}`}
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

export default AdminMasterPrice;