import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  featured_image: string;
  category: string;
  tags: string;
  status: 'draft' | 'published';
  meta_title: string;
  meta_description: string;
  reading_time: number;
  view_count: number;
  is_featured: number;
  created_at: string;
  updated_at: string;
}

const AdminBlogManagement = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    featured_image: '',
    category: '',
    tags: '',
    status: 'draft' as 'draft' | 'published',
    meta_title: '',
    meta_description: '',
    is_featured: 0
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    fetchBlogs();
  }, [navigate]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost/codescholarwriters-api/get_blogs.php?admin=true');
      const data = await response.json();

      if (data.success) {
        setBlogs(data.blogs || []);
      } else {
        showToastMessage('Failed to load blogs: ' + data.error, 'error');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      showToastMessage('Error fetching blogs: ' + error, 'error');
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      featured_image: '',
      category: '',
      tags: '',
      status: 'draft',
      meta_title: '',
      meta_description: '',
      is_featured: 0
    });
    setEditingBlog(null);
    setShowAddForm(false);
  };

  const handleAddBlog = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      showToastMessage('Title and content are required', 'error');
      return;
    }

    setSaving(true);
    try {
      const slug = generateSlug(formData.title);
      const response = await fetch('http://localhost/codescholarwriters-api/add_blog.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          slug: slug,
          excerpt: formData.excerpt.trim(),
          content: formData.content.trim(),
          author: formData.author.trim() || 'Admin',
          featured_image: formData.featured_image.trim(),
          category: formData.category.trim() || 'General',
          tags: formData.tags.trim(),
          status: formData.status,
          meta_title: formData.meta_title.trim(),
          meta_description: formData.meta_description.trim(),
          is_featured: formData.is_featured
        }),
      });

      const result = await response.json();

      if (result.success) {
        showToastMessage('Blog added successfully!', 'success');
        fetchBlogs();
        resetForm();
      } else {
        showToastMessage('Failed to add blog: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Add blog error:', error);
      showToastMessage('Error adding blog: ' + error, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleEditBlog = async () => {
    if (!editingBlog || !formData.title.trim() || !formData.content.trim()) {
      showToastMessage('Title and content are required', 'error');
      return;
    }

    setSaving(true);
    try {
      const slug = generateSlug(formData.title);
      const response = await fetch('http://localhost/codescholarwriters-api/update_blog.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingBlog.id,
          title: formData.title.trim(),
          slug: slug,
          excerpt: formData.excerpt.trim(),
          content: formData.content.trim(),
          author: formData.author.trim() || 'Admin',
          featured_image: formData.featured_image.trim(),
          category: formData.category.trim() || 'General',
          tags: formData.tags.trim(),
          status: formData.status,
          meta_title: formData.meta_title.trim(),
          meta_description: formData.meta_description.trim(),
          is_featured: formData.is_featured
        }),
      });

      const result = await response.json();

      if (result.success) {
        showToastMessage('Blog updated successfully!', 'success');
        fetchBlogs();
        resetForm();
      } else {
        showToastMessage('Failed to update blog: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Update blog error:', error);
      showToastMessage('Error updating blog: ' + error, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBlog = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      const response = await fetch('http://localhost/codescholarwriters-api/delete_blog.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (result.success) {
        showToastMessage('Blog deleted successfully!', 'success');
        fetchBlogs();
      } else {
        showToastMessage('Failed to delete blog: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Delete blog error:', error);
      showToastMessage('Error deleting blog: ' + error, 'error');
    }
  };

  const startEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      featured_image: blog.featured_image,
      category: blog.category,
      tags: blog.tags,
      status: blog.status,
      meta_title: blog.meta_title,
      meta_description: blog.meta_description,
      is_featured: blog.is_featured
    });
    setShowAddForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-800 pt-20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
              <p className="text-gray-600 mt-1">Manage your blog posts and content</p>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={() => navigate('/admin/dashboard')}
                variant="outline"
                className="bg-gray-50 hover:bg-gray-100"
              >
                Back to Dashboard
              </Button>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add New Blog
              </Button>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            {toastMessage}
          </div>
        )}

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="mb-6 bg-gray-700 border-gray-600">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">
                {editingBlog ? 'Edit Blog' : 'Add New Blog'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <Label htmlFor="title" className="text-gray-200">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter blog title"
                    className="mt-1 bg-gray-600 border-gray-500 text-white placeholder-gray-300"
                  />
                </div>

                {/* Excerpt */}
                <div className="md:col-span-2">
                  <Label htmlFor="excerpt" className="text-gray-200">Excerpt</Label>
                  <textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder="Brief description of the blog post"
                    className="mt-1 w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-600 text-white placeholder-gray-300"
                    rows={3}
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-2">
                  <Label htmlFor="content" className="text-gray-200">Content *</Label>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Blog content (HTML supported)"
                    className="mt-1 w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-600 text-white placeholder-gray-300"
                    rows={10}
                  />
                </div>

                {/* Author */}
                <div>
                  <Label htmlFor="author" className="text-gray-200">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    placeholder="Author name"
                    className="mt-1 bg-gray-600 border-gray-500 text-white placeholder-gray-300"
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category" className="text-gray-200">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="Blog category"
                    className="mt-1 bg-gray-600 border-gray-500 text-white placeholder-gray-300"
                  />
                </div>

                {/* Featured Image */}
                <div>
                  <Label htmlFor="featured_image" className="text-gray-200">Featured Image URL</Label>
                  <Input
                    id="featured_image"
                    value={formData.featured_image}
                    onChange={(e) => handleInputChange('featured_image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1 bg-gray-600 border-gray-500 text-white placeholder-gray-300"
                  />
                </div>

                {/* Tags */}
                <div>
                  <Label htmlFor="tags" className="text-gray-200">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="tag1, tag2, tag3"
                    className="mt-1 bg-gray-600 border-gray-500 text-white placeholder-gray-300"
                  />
                </div>

                {/* Status */}
                <div>
                  <Label htmlFor="status" className="text-gray-200">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-600 text-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                {/* Featured */}
                <div>
                  <Label htmlFor="is_featured" className="text-gray-200">Featured</Label>
                  <select
                    id="is_featured"
                    value={formData.is_featured}
                    onChange={(e) => handleInputChange('is_featured', parseInt(e.target.value))}
                    className="mt-1 w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-600 text-white"
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </select>
                </div>

                {/* Meta Title */}
                <div>
                  <Label htmlFor="meta_title" className="text-gray-200">Meta Title (SEO)</Label>
                  <Input
                    id="meta_title"
                    value={formData.meta_title}
                    onChange={(e) => handleInputChange('meta_title', e.target.value)}
                    placeholder="SEO meta title"
                    className="mt-1 bg-gray-600 border-gray-500 text-white placeholder-gray-300"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <Label htmlFor="meta_description" className="text-gray-200">Meta Description (SEO)</Label>
                  <Input
                    id="meta_description"
                    value={formData.meta_description}
                    onChange={(e) => handleInputChange('meta_description', e.target.value)}
                    placeholder="SEO meta description"
                    className="mt-1 bg-gray-600 border-gray-500 text-white placeholder-gray-300"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={resetForm}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={editingBlog ? handleEditBlog : handleAddBlog}
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {saving ? 'Saving...' : (editingBlog ? 'Update Blog' : 'Add Blog')}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Blogs List */}
        <Card className="bg-gray-700 border-gray-600">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Existing Blogs ({blogs.length})
            </h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-300">Loading blogs...</p>
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-300">No blogs found. Click "Add New Blog" to create your first blog post.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-600">
                  <thead className="bg-gray-600">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                        Views
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-700 divide-y divide-gray-600">
                    {blogs.map((blog) => (
                      <tr key={blog.id} className="hover:bg-gray-600">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-white">
                              {blog.title}
                              {blog.is_featured === 1 && (
                                <Badge 
                                  variant="secondary" 
                                  className="ml-2 bg-purple-100 text-purple-800 border-purple-300"
                                >
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-300">
                              By {blog.author}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge 
                            variant="outline" 
                            className="bg-blue-100 text-blue-800 border-blue-300"
                          >
                            {blog.category}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge 
                            variant={blog.status === 'published' ? 'default' : 'secondary'}
                            className={blog.status === 'published' 
                              ? 'bg-green-100 text-green-800 border-green-300' 
                              : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                            }
                          >
                            {blog.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {blog.view_count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(blog.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEditBlog(blog)}
                            className="text-blue-400 hover:text-blue-300 border-blue-400 hover:border-blue-300"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="text-red-400 hover:text-red-300 border-red-400 hover:border-red-300"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminBlogManagement;