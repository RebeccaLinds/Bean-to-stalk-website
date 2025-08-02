import React from 'react';
import { ArrowLeft, Compass, Star, ShoppingCart, Eye, Award, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { books } from '../../data/books';
import PriceDisplay from '../../components/PriceDisplay';

const YoungExplorersGuides = () => {
  const navigate = useNavigate();

  // Get Young Explorer's Guides from the main books data
  const guides = [
    books.find(book => book.id === 2), // Wilderness Guide
    books.find(book => book.id === 3), // Mindfulness Guide
    books.find(book => book.id === 5)  // Yoga Guide
  ].filter(Boolean);

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
              Young Explorer's Guides
              <span className="text-emerald-600 block">Adventure and Discovery Await</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guides designed to inspire young adventurers to explore the world around them, 
              develop essential life skills, and cultivate a deep connection with nature and themselves.
            </p>
          </div>

          {/* Special Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg">
              <Award className="h-5 w-5 mr-2" />
              Award-Winning Educational Series
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((guide) => (
              <div key={guide.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                {/* Book Cover */}
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-emerald-50 to-green-50 p-6">
                  <div className="flex justify-center h-full">
                    <div className="h-full aspect-7/10 relative">
                      <img 
                        src={guide.image} 
                        alt={guide.title}
                        className="absolute inset-0 w-full h-full object-contain rounded shadow-xl"
                      />
                    </div>
                  </div>
                  
                  {/* Pre-Order Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Pre-Order
                    </span>
                  </div>

                  {/* Bestseller Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Bestseller
                    </span>
                  </div>
                </div>

                {/* Book Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(guide.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{guide.ageRange}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{guide.title}</h3>
                  <p className="text-emerald-600 font-semibold mb-3">{guide.subtitle}</p>
                  <p className="text-gray-600 mb-4 leading-relaxed">{guide.description}</p>

                  {/* Release Date Information */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center text-blue-700">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Expected Release: {guide.releaseDate}</span>
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pages:</span>
                      <span className="font-medium text-gray-900">{guide.pageCount}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">What's Inside:</h4>
                    <ul className="space-y-1">
                      {guide.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                      {guide.features.length > 3 && (
                        <li className="text-sm text-gray-500">
                          +{guide.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between mb-4">
                    <PriceDisplay 
                      usdPrice={guide.price} 
                      className="text-2xl font-bold text-emerald-600"
                      size="xl"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button className={`w-full py-3 rounded-full transition-colors flex items-center justify-center font-semibold ${
                      guide.isPreOrder ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {guide.isPreOrder ? 'Pre-Order Now' : 'Add to Cart'}
                    </button>
                    <button 
                      onClick={() => navigate(`/books/${guide.id}`)}
                      className="w-full border-2 border-emerald-600 text-emerald-600 py-2 rounded-full hover:bg-emerald-600 hover:text-white transition-colors flex items-center justify-center font-semibold"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Series Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Young Explorer's Guides?</h2>
            <p className="text-xl text-gray-600">
              More than just books—they're comprehensive learning experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Compass className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hands-On Learning</h3>
              <p className="text-gray-600">
                Each guide includes practical activities, experiments, and real-world applications 
                that make learning engaging and memorable.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-100 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Award className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert-Reviewed Content</h3>
              <p className="text-gray-600">
                All content is reviewed by child development experts, educators, and specialists 
                to ensure age-appropriate and effective learning.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-100 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Star className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Life Skills Focus</h3>
              <p className="text-gray-600">
                Beyond academic learning, these guides teach essential life skills like problem-solving, 
                resilience, and emotional intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              More Adventures Coming Soon!
            </h2>
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              We're developing new Young Explorer's Guides covering topics like astronomy, 
              marine biology, creative arts, and cultural exploration. Join our newsletter 
              to be the first to know about new releases!
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

export default YoungExplorersGuides;