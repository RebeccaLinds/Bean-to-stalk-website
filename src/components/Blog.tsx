import React, { useEffect } from 'react';
import { Calendar, User, ArrowRight, BookOpen, RefreshCw, AlertCircle } from 'lucide-react';
import { useBlogPosts } from '../hooks/useBlogPosts';

const Blog = () => {
  const { posts, loading, error, refreshPosts } = useBlogPosts();

  // Load Beehiiv script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://subscribe-forms.beehiiv.com/embed.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://subscribe-forms.beehiiv.com/embed.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // Sort posts by date (most recent first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Blog Posts...</h2>
            <p className="text-gray-600">Fetching the latest content from our blog</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-green-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-teal-200 rounded-full opacity-35 animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Learning & Growing
              <span className="text-emerald-600 block">Together</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover insights, tips, and inspiration for nurturing young minds and creating 
              meaningful learning experiences at home and beyond.
            </p>
            
            {/* Refresh Button */}
            <div className="mt-8">
              <button
                onClick={refreshPosts}
                className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors font-semibold"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Posts
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
                <p className="text-amber-800 text-sm">
                  <strong>Note:</strong> Currently showing cached content. {error}
                </p>
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="max-w-4xl mx-auto">
              {/* Blog Posts - Vertical Stack */}
              {sortedPosts.length > 0 ? (
                <div className="space-y-8">
                  {sortedPosts.map((post, index) => {
                    const isFeatured = index === 0; // First post is featured
                    
                    if (isFeatured) {
                      // Featured Post Layout
                      return (
                        <article key={post.id} className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer" onClick={() => window.open(post.url, '_blank', 'noopener,noreferrer')}>
                          <div className="grid lg:grid-cols-2 gap-0">
                            <div className="relative h-80 lg:h-auto">
                              <img 
                                src={post.image} 
                                alt={post.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1Q2OWhX04KuyGpwxk16Y9eoV0QXRs5cPHaMnLZ";
                                }}
                              />
                              <div className="absolute top-6 left-6">
                                <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                  Featured
                                </span>
                              </div>
                            </div>
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                              <div className="flex items-center mb-4">
                                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold mr-4">
                                  {post.category}
                                </span>
                                <span className="text-gray-500 text-sm">{post.readTime}</span>
                              </div>
                              
                              <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                {post.title}
                              </h2>
                              
                              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                {post.excerpt}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <User className="h-5 w-5 text-gray-400 mr-2" />
                                  <span className="text-gray-600 mr-4">{post.author}</span>
                                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                                  <span className="text-gray-600">{post.date}</span>
                                </div>
                                
                                <div className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors flex items-center">
                                  Read More
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    } else {
                      // Regular Post Layout
                      return (
                        <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group cursor-pointer" onClick={() => window.open(post.url, '_blank', 'noopener,noreferrer')}>
                          <div className="grid md:grid-cols-3 gap-0">
                            <div className="relative h-48 md:h-auto overflow-hidden">
                              <img 
                                src={post.image} 
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                  e.currentTarget.src = "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QyaPpazYowXdrJHpBFgYnuWS5G3T8NLzP1M9O";
                                }}
                              />
                            </div>
                            
                            <div className="md:col-span-2 p-6">
                              <div className="flex items-center mb-3">
                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mr-3">
                                  {post.category}
                                </span>
                                <span className="text-gray-500 text-sm">{post.readTime}</span>
                              </div>
                              
                              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                                {post.title}
                              </h3>
                              
                              <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                                {post.excerpt}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-sm text-gray-500">
                                  <User className="h-4 w-4 mr-1" />
                                  <span className="mr-3">{post.author}</span>
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{post.date}</span>
                                </div>
                                
                                <div className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center">
                                  Read
                                  <ArrowRight className="ml-1 h-4 w-4" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    }
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts available</h3>
                  <p className="text-gray-600 mb-4">We're working on bringing you fresh content!</p>
                  <button
                    onClick={refreshPosts}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
          </div>
        </div>
      </section>

    {/* Newsletter Signup Section - Full Width */}
    <section className="py-16 bg-gradient-to-r from-emerald-600 to-green-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-xl text-emerald-100 leading-relaxed">
              Get the latest parenting tips and educational insights delivered to your inbox. 
              Join our community of parents and educators!
            </p>
          </div>
          
          {/* Beehiiv Embed - Full Width with Better Spacing */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 overflow-hidden">
              <iframe 
                src="https://subscribe-forms.beehiiv.com/e0338010-561b-45bd-9793-aa87e1fcac4e"
                className="beehiiv-embed w-full"
                data-test-id="beehiiv-embed"
                frameBorder="0"
                scrolling="no"
                style={{
                  width: '100%',
                  height: '600px',
                  margin: 0,
                  borderRadius: '12px',
                  backgroundColor: 'transparent',
                  boxShadow: 'none'
                }}
                title="Newsletter Subscription"
              />
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-emerald-100 text-sm">
              📧 Weekly insights • 🎯 Educational tips • 🚀 New resource announcements
            </p>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Blog;