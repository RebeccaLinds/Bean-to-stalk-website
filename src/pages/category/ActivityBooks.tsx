import React from 'react';
import { ArrowLeft, Gamepad2, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ActivityBooks = () => {
  const navigate = useNavigate();

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
              Activity Books
              <span className="text-emerald-600 block">Interactive Fun and Games</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Engaging activity books that combine learning with play, featuring puzzles, games, 
              and interactive exercises designed to entertain while educating.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl text-center">
              <div className="bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100 p-8 rounded-2xl mb-8">
                <Gamepad2 className="h-24 w-24 text-emerald-500 mx-auto mb-4 opacity-80" />
                <div className="flex items-center justify-center mb-4">
                  <Clock className="h-5 w-5 text-emerald-600 mr-2" />
                  <span className="text-emerald-600 font-semibold">Coming Soon</span>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Exciting Activity Books in Development!
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We're creating amazing interactive activity books filled with puzzles, games, 
                mazes, word searches, and creative challenges that will keep young minds engaged 
                and entertained for hours.
              </p>

              <div className="bg-emerald-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-emerald-800 mb-4">What to Expect:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      <span className="text-emerald-700">Brain-teasing puzzles</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      <span className="text-emerald-700">Creative drawing activities</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      <span className="text-emerald-700">Educational word games</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      <span className="text-emerald-700">Logic challenges</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      <span className="text-emerald-700">Interactive mazes</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      <span className="text-emerald-700">STEM activities</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-emerald-600 text-white py-4 rounded-full hover:bg-emerald-700 transition-colors font-semibold text-lg">
                  Notify Me When Available
                </button>
                <button 
                  onClick={() => navigate('/newsletter')}
                  className="w-full border-2 border-emerald-600 text-emerald-600 py-3 rounded-full hover:bg-emerald-600 hover:text-white transition-colors font-semibold"
                >
                  Join Our Newsletter for Updates
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Activity Books */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Activity Books Matter</h2>
            <p className="text-xl text-gray-600">
              Activity books provide essential developmental benefits while keeping learning fun
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Star className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cognitive Development</h3>
              <p className="text-gray-600">
                Puzzles and brain teasers enhance problem-solving skills, logical thinking, 
                and cognitive flexibility in young learners.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-100 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Gamepad2 className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Screen-Free Entertainment</h3>
              <p className="text-gray-600">
                Provides engaging, educational entertainment without screens, promoting 
                focused attention and reducing digital dependency.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-100 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Clock className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Independent Learning</h3>
              <p className="text-gray-600">
                Encourages self-directed learning and builds confidence as children 
                complete challenges and activities on their own.
              </p>
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
              Subscribe to our newsletter and be the first to hear about our new activity books, 
              get exclusive previews, and receive special launch discounts.
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

export default ActivityBooks;