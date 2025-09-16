import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText } from 'lucide-react';

interface Order {
  id: number;
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_type: string;
  assignment_type: string;
  academic_level: string;
  pages: number;
  words: number;
  deadline_date: string;
  deadline_time: string;
  subject: string;
  instructions: string;
  total_price: number;
  currency: string;
  status: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [updateLoading, setUpdateLoading] = useState<string | null>(null);
  const [orderFiles, setOrderFiles] = useState<{[orderId: string]: any[]}>({});
  const [loadingFiles, setLoadingFiles] = useState<{[orderId: string]: boolean}>({});
  const navigate = useNavigate();

  // Check if user is logged in
  const fetchOrderFiles = async (orderId: string) => {
    if (orderFiles[orderId] || loadingFiles[orderId]) return;
    
    setLoadingFiles(prev => ({ ...prev, [orderId]: true }));
    
    try {
      const response = await fetch(`http://localhost/codescholarwriters-api/admin/get_order_files.php?order_id=${orderId}`);
      const data = await response.json();
      
      if (data.success) {
        setOrderFiles(prev => ({ ...prev, [orderId]: data.files }));
      }
    } catch (error) {
      console.error('Error fetching order files:', error);
    } finally {
      setLoadingFiles(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const downloadFile = async (fileId: string, filename: string) => {
    try {
      const response = await fetch(`http://localhost/codescholarwriters-api/admin/download_file.php?file_id=${fileId}`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Failed to download file');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchOrders();
  }, [navigate, statusFilter]);

  const fetchOrders = async () => {
    try {
      const url = statusFilter 
        ? `http://localhost/codescholarwriters-api/admin/get_orders.php?status=${statusFilter}`
        : 'http://localhost/codescholarwriters-api/admin/get_orders.php';
        
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
        // Auto-load file counts for all orders using numeric ID
        data.orders.forEach((order: Order) => {
          fetchOrderFileCount(order.id.toString());
        });
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // New function to get file count without loading state
  const fetchOrderFileCount = async (orderId: string) => {
    if (orderFiles[orderId]) return;
    
    try {
      const response = await fetch(`http://localhost/codescholarwriters-api/admin/get_order_files.php?order_id=${orderId}`);
      const data = await response.json();
      
      if (data.success) {
        setOrderFiles(prev => ({ ...prev, [orderId]: data.files }));
      }
    } catch (error) {
      console.error('Error fetching order file count:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdateLoading(orderId);
    try {
      const response = await fetch('http://localhost/codescholarwriters-api/admin/update_order.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          status: newStatus
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update the order in the local state
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.order_id === orderId 
              ? { ...order, status: newStatus, updated_at: new Date().toISOString() }
              : order
          )
        );
      } else {
        alert('Failed to update order status: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Error updating order status. Please try again.');
    } finally {
      setUpdateLoading(null);
    }
  };

  const updatePaymentStatus = async (orderId: string, newPaymentStatus: string) => {
    setUpdateLoading(orderId);
    try {
      const response = await fetch('http://localhost/codescholarwriters-api/admin/update_order.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          payment_status: newPaymentStatus
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update the order in the local state
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.order_id === orderId 
              ? { ...order, payment_status: newPaymentStatus, updated_at: new Date().toISOString() }
              : order
          )
        );
      } else {
        alert('Failed to update payment status: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Error updating payment status. Please try again.');
    } finally {
      setUpdateLoading(null);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentBadgeColor = (paymentStatus: string) => {
    switch (paymentStatus) {
      case 'unpaid': return 'bg-red-100 text-red-800 border-red-200';
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'refunded': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Order Management</h1>
            <p className="text-gray-400">Manage customer orders and track their progress</p>
          </div>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-white font-medium">Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <span className="text-gray-400">
              Total: {orders.length} order{orders.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                    Service
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">
                    Payment
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                    Deadline
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Files
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-4 text-center text-gray-400">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-750">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{order.order_id}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        <div className="text-sm text-white">{order.customer_name}</div>
                        <div className="text-xs text-gray-400">{order.customer_email}</div>
                        {order.customer_phone && (
                          <div className="text-xs text-gray-400">{order.customer_phone}</div>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-4 hidden lg:table-cell">
                        <div className="text-sm text-white">{order.service_type}</div>
                        <div className="text-xs text-gray-400">
                          {order.academic_level}
                          {order.pages && ` • ${order.pages} pages`}
                          {order.words && ` • ${order.words} words`}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {order.currency === 'USD' ? '$' : '₹'}{order.total_price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.order_id, e.target.value)}
                          disabled={updateLoading === order.order_id}
                          className={`text-xs px-2 py-1 rounded-full border ${getStatusBadgeColor(order.status)} focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <select
                          value={order.payment_status}
                          onChange={(e) => updatePaymentStatus(order.order_id, e.target.value)}
                          disabled={updateLoading === order.order_id}
                          className={`text-xs px-2 py-1 rounded-full border ${getPaymentBadgeColor(order.payment_status)} focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto`}
                        >
                          <option value="unpaid">Unpaid</option>
                          <option value="paid">Paid</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                        <div className="text-sm text-white">
                          {order.deadline_date}
                        </div>
                        <div className="text-xs text-gray-400">
                          {order.deadline_time}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          {orderFiles[order.order_id] ? (
                            <>
                              <div className="flex items-center space-x-1 mb-1">
                                <FileText className="w-4 h-4 text-blue-400" />
                                <span className="text-sm text-white font-medium">
                                  {orderFiles[order.order_id].length}
                                </span>
                              </div>
                              {orderFiles[order.order_id].length > 0 && (
                                <div className="space-y-1 max-w-[150px]">
                                  {orderFiles[order.order_id].map((file: any) => (
                                    <button
                                      key={file.id}
                                      onClick={() => downloadFile(file.id, file.original_filename)}
                                      className="flex items-center space-x-1 text-xs text-blue-400 hover:text-blue-300 transition-colors bg-blue-900/20 hover:bg-blue-900/40 px-2 py-1 rounded border border-blue-700/30 w-full text-left"
                                      title={`Download: ${file.original_filename}`}
                                    >
                                      <Download className="w-3 h-3 flex-shrink-0" />
                                      <span className="truncate">
                                        {file.original_filename}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="flex items-center space-x-1 text-gray-400">
                              <FileText className="w-4 h-4" />
                              <span className="text-sm">0</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => alert(`Order Details:\n\nOrder ID: ${order.order_id}\nCustomer: ${order.customer_name}\nEmail: ${order.customer_email}\nPhone: ${order.customer_phone || 'Not provided'}\n\nService: ${order.service_type}\nAcademic Level: ${order.academic_level}\nPages: ${order.pages || 'N/A'}\nWords: ${order.words || 'N/A'}\n\nSubject: ${order.subject || 'N/A'}\nInstructions: ${order.instructions || 'No special instructions'}\n\nDeadline: ${order.deadline_date} ${order.deadline_time}\nPrice: ${order.currency === 'USD' ? '$' : '₹'}${order.total_price}`)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;