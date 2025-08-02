import React from 'react';
import { ArrowLeft, BookOpen, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StoryBooks = () => {
  const navigate = useNavigate();

  const storyBooks = [
    {
      id: 1,
      title: "The Bear and His Magic",
      subtitle: "Coming Soon!",
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1Q94jQK7z0DrMRfhw6QJFIlLWVaPUcYu4in9Zt",
      status: "coming-soon",
      description: "A magical adventure awaits with our lovable bear character and his enchanting journey of discovery.",
      expectedRelease: "Spring 2025",
      ageRange: "Ages 4-8",
      category: "Adventure"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Kids Corner
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Story Books
              <span className="text-emerald-600 block">Magical Tales That Spark Imagination</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover enchanting stories that transport young readers to magical worlds, 
              fostering imagination, empathy, and a lifelong love of reading.
            </p>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storyBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                {/* Book Cover */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Coming Soon
                    </span>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {book.category}
                    </span>
                  </div>
                </div>

                {/* Book Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">{book.ageRange}</span>
                    <div className="flex items-center text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-xs">{book.expectedRelease}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-emerald-600 font-semibold mb-3">{book.subtitle}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">{book.description}</p>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button className="w-full bg-gray-300 text-gray-500 py-3 rounded-full font-semibold cursor-not-allowed">
                      <BookOpen className="h-4 w-4 mr-2 inline" />
                      Coming Soon
                    </button>
                    <button className="w-full border-2 border-emerald-600 text-emerald-600 py-2 rounded-full hover:bg-emerald-600 hover:text-white transition-colors font-semibold">
                      Notify Me When Available
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Placeholder for Future Books */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-dashed border-emerald-200 overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100 flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="h-16 w-16 text-emerald-400 mx-auto mb-4 opacity-60" />
                  <p className="text-emerald-600 font-medium">More Stories Coming Soon!</p>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Future Adventures</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We're working on more magical stories to delight and inspire young readers. 
                  Stay tuned for exciting new adventures!
                </p>
                
                <button className="w-full border-2 border-emerald-600 text-emerald-600 py-3 rounded-full hover:bg-emerald-600 hover:text-white transition-colors font-semibold">
                  Join Our Newsletter for Updates
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Be the First to Know!
            </h2>
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              Subscribe to our newsletter and be the first to hear about new story book releases, 
              special previews, and exclusive content for young readers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border-0 focus:ring-4 focus:ring-white/30 text-gray-900 placeholder-gray-500"
              />
              <button className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoryBooks;