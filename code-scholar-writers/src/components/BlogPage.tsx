import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getApiUrl } from '@/config/api';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  featured_image: string | null;
  category: string;
  tags: string;
  status: string;
  featured: number;
  meta_title: string;
  meta_description: string;
  view_count: number;
  reading_time: number;
  created_at: string;
  updated_at: string;
}

// interface BlogPageData {
//   blogs: Blog[];
//   total: number;
//   limit: number;
//   offset: number;
//   categories: string[];
// }

const BlogPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 6,
    offset: 0
  });

  // Single blog view or blog listing
  const isSingleBlog = !!slug;

  useEffect(() => {
    if (isSingleBlog) {
      fetchSingleBlog();
    } else {
      fetchBlogs();
    }
  }, [slug, searchTerm, selectedCategory, pagination.offset]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: pagination.limit.toString(),
        offset: pagination.offset.toString()
      });

      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }

      if (selectedCategory) {
        params.append('category', selectedCategory);
      }

      const response = await fetch(`${getApiUrl('get_blogs.php')}?${params}`);
      const data = await response.json();

      if (data.success) {
        setBlogs(data.blogs || []);
        setCategories(data.categories || []);
        setPagination(prev => ({
          ...prev,
          total: data.total || 0
        }));
      } else {
        console.error('Failed to fetch blogs:', data.error);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${getApiUrl('get_blog_by_slug.php')}?slug=${slug}`);
      const data = await response.json();

      if (data.success) {
        setCurrentBlog(data.blog);
        setRelatedBlogs(data.related_blogs || []);
      } else {
        console.error('Failed to fetch blog:', data.error);
        navigate('/blog');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, offset: 0 }));
    fetchBlogs();
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setPagination(prev => ({ ...prev, offset: 0 }));
  };

  const handlePageChange = (newOffset: number) => {
    setPagination(prev => ({ ...prev, offset: newOffset }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Single Blog View
  if (isSingleBlog && currentBlog) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-blue-600">Blog</Link>
              <span>/</span>
              <span className="text-gray-900">{currentBlog.title}</span>
            </div>
          </nav>

          {/* Blog Header */}
          <header className="mb-8">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-2">
                {currentBlog.category}
              </Badge>
              {currentBlog.featured === 1 && (
                <Badge variant="default" className="ml-2">
                  Featured
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {currentBlog.title}
            </h1>
            
            <div className="flex items-center justify-between text-gray-600 mb-6">
              <div className="flex items-center space-x-4">
                <span>By {currentBlog.author}</span>
                <span>•</span>
                <span>{formatDate(currentBlog.created_at)}</span>
                <span>•</span>
                <span>{currentBlog.reading_time} min read</span>
                <span>•</span>
                <span>{currentBlog.view_count} views</span>
              </div>
            </div>

            {currentBlog.featured_image && (
              <div className="mb-8">
                <img
                  src={currentBlog.featured_image}
                  alt={currentBlog.title}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
          </header>

          {/* Blog Content */}
          <Card className="p-8 mb-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: currentBlog.content }}
            />
          </Card>

          {/* Tags */}
          {currentBlog.tags && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {currentBlog.tags.split(',').map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Related Blogs */}
          {relatedBlogs.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Card key={relatedBlog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to={`/blog/${relatedBlog.slug}`}>
                      {relatedBlog.featured_image && (
                        <img
                          src={relatedBlog.featured_image}
                          alt={relatedBlog.title}
                          className="w-full h-32 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {relatedBlog.category}
                        </Badge>
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {relatedBlog.title}
                        </h4>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {stripHtml(relatedBlog.excerpt)}
                        </p>
                        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                          <span>{relatedBlog.author}</span>
                          <span>{relatedBlog.reading_time} min read</span>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="text-center">
            <Button onClick={() => navigate('/blog')} variant="outline">
              ← Back to All Articles
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Blog Listing View
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover insights, tips, and expert advice on academic writing, research, and student success.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80"
              />
              <Button type="submit">Search</Button>
            </form>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter:</span>
              <Button
                size="sm"
                variant={selectedCategory === '' ? 'default' : 'outline'}
                onClick={() => handleCategoryFilter('')}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  size="sm"
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => handleCategoryFilter(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-lg font-medium text-gray-900">No articles found</p>
              <p className="text-gray-500">
                {searchTerm || selectedCategory
                  ? 'Try adjusting your search or filter criteria'
                  : 'Check back later for new articles'}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {blogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <Link to={`/blog/${blog.slug}`}>
                    {blog.featured_image && (
                      <img
                        src={blog.featured_image}
                        alt={blog.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">
                          {blog.category}
                        </Badge>
                        {blog.featured === 1 && (
                          <Badge variant="default">
                            Featured
                          </Badge>
                        )}
                      </div>
                      
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {blog.title}
                      </h2>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {stripHtml(blog.excerpt || blog.content)}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <span>{blog.author}</span>
                          <span>•</span>
                          <span>{formatDate(blog.created_at)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>{blog.reading_time} min read</span>
                          <span>•</span>
                          <span>{blog.view_count} views</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {pagination.total > pagination.limit && (
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  disabled={pagination.offset === 0}
                  onClick={() => handlePageChange(Math.max(0, pagination.offset - pagination.limit))}
                >
                  Previous
                </Button>
                
                <span className="text-sm text-gray-600">
                  Showing {pagination.offset + 1} to {Math.min(pagination.offset + pagination.limit, pagination.total)} of {pagination.total} articles
                </span>
                
                <Button
                  variant="outline"
                  disabled={pagination.offset + pagination.limit >= pagination.total}
                  onClick={() => handlePageChange(pagination.offset + pagination.limit)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;