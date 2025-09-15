import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

const AdminFAQManagement = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    display_order: 0,
    is_active: 1
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    fetchFAQs();
  }, [navigate]);

  const fetchFAQs = async () => {
    try {
      const response = await fetch('http://localhost/codescholarwriters-api/get_faqs.php?admin=true');
      const data = await response.json();

      if (data.success) {
        setFaqs(data.faqs || []);
      } else {
        showToastMessage('Failed to load FAQs: ' + data.error, 'error');
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      showToastMessage('Error fetching FAQs: ' + error, 'error');
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

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      category: '',
      display_order: 0,
      is_active: 1
    });
    setEditingFaq(null);
    setShowAddForm(false);
  };

  const handleAddFAQ = async () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      showToastMessage('Question and answer are required', 'error');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('http://localhost/codescholarwriters-api/add_faq.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: formData.question.trim(),
          answer: formData.answer.trim(),
          category: formData.category.trim() || 'General',
          display_order: formData.display_order,
          is_active: formData.is_active
        }),
      });

      const result = await response.json();

      if (result.success) {
        showToastMessage('FAQ added successfully!', 'success');
        fetchFAQs();
        resetForm();
      } else {
        showToastMessage('Failed to add FAQ: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Add FAQ error:', error);
      showToastMessage('Error adding FAQ: ' + error, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleEditFAQ = async () => {
    if (!editingFaq || !formData.question.trim() || !formData.answer.trim()) {
      showToastMessage('Question and answer are required', 'error');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('http://localhost/codescholarwriters-api/update_faq.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingFaq.id,
          question: formData.question.trim(),
          answer: formData.answer.trim(),
          category: formData.category.trim() || 'General',
          display_order: formData.display_order,
          is_active: formData.is_active
        }),
      });

      const result = await response.json();

      if (result.success) {
        showToastMessage('FAQ updated successfully!', 'success');
        fetchFAQs();
        resetForm();
      } else {
        showToastMessage('Failed to update FAQ: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Update FAQ error:', error);
      showToastMessage('Error updating FAQ: ' + error, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFAQ = async (faqId: number) => {
    if (!confirm('Are you sure you want to delete this FAQ? This action cannot be undone.')) {
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('http://localhost/codescholarwriters-api/delete_faq.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: faqId }),
      });

      const result = await response.json();

      if (result.success) {
        showToastMessage('FAQ deleted successfully!', 'success');
        fetchFAQs();
      } else {
        showToastMessage('Failed to delete FAQ: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Delete FAQ error:', error);
      showToastMessage('Error deleting FAQ: ' + error, 'error');
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      display_order: faq.display_order,
      is_active: faq.is_active
    });
    setShowAddForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading FAQs...</p>
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
              <h1 className="text-3xl font-bold text-white mb-2">FAQ Management</h1>
              <p className="text-gray-400">Manage frequently asked questions</p>
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
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add New FAQ
              </Button>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="bg-gray-800 border-gray-700 p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label className="text-gray-300 text-sm font-medium">
                  Question *
                </Label>
                <Input
                  type="text"
                  value={formData.question}
                  onChange={(e) => handleInputChange('question', e.target.value)}
                  className="bg-gray-600 border-gray-500 text-white focus:border-blue-500 mt-2"
                  placeholder="Enter the FAQ question"
                />
              </div>

              <div className="md:col-span-2">
                <Label className="text-gray-300 text-sm font-medium">
                  Answer *
                </Label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => handleInputChange('answer', e.target.value)}
                  rows={4}
                  className="w-full mt-2 p-3 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter the detailed answer"
                />
              </div>

              <div>
                <Label className="text-gray-300 text-sm font-medium">
                  Category
                </Label>
                <Input
                  type="text"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="bg-gray-600 border-gray-500 text-white focus:border-blue-500 mt-2"
                  placeholder="e.g., General, Services, Payment"
                />
              </div>

              <div>
                <Label className="text-gray-300 text-sm font-medium">
                  Display Order
                </Label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => handleInputChange('display_order', parseInt(e.target.value) || 0)}
                  className="bg-gray-600 border-gray-500 text-white focus:border-blue-500 mt-2"
                  placeholder="0"
                />
              </div>

              <div>
                <Label className="text-gray-300 text-sm font-medium">
                  Status
                </Label>
                <select
                  value={formData.is_active}
                  onChange={(e) => handleInputChange('is_active', parseInt(e.target.value))}
                  className="w-full mt-2 p-3 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={editingFaq ? handleEditFAQ : handleAddFAQ}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {saving ? 'Saving...' : (editingFaq ? 'Update FAQ' : 'Add FAQ')}
              </Button>
              <Button
                onClick={resetForm}
                variant="outline"
                className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* FAQ List */}
        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">All FAQs</h2>
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {faqs.length} items
            </span>
          </div>

          <div className="space-y-4">
            {faqs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg font-medium text-gray-400">No FAQs found</p>
                  <p className="text-gray-500">Click "Add New FAQ" to create your first FAQ</p>
                </div>
              </div>
            ) : (
              faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-gray-700 border border-gray-600 rounded-lg p-4 hover:bg-gray-650 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {faq.question}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          faq.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {faq.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {faq.answer}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>Category: {faq.category}</span>
                        <span>Order: {faq.display_order}</span>
                        <span>Updated: {new Date(faq.updated_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        onClick={() => startEdit(faq)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDeleteFAQ(faq.id)}
                        disabled={saving}
                        className="bg-red-600 hover:bg-red-700 text-white px-3"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
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

export default AdminFAQManagement;