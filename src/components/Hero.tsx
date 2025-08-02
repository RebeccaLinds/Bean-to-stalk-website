import React from 'react';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { books } from '../data/books';

const Hero = () => {
  const navigate = useNavigate();

  // Get book data from the main books array
  const whimsicalForestFriends = books.find(book => book.id === 1);
  const mindfulnessGuide = books.find(book => book.id === 3);
  const wildernessGuide = books.find(book => book.id === 2);
  const bearAndMagic = books.find(book => book.id === 4);

  const handleExploreActivities = () => {
    navigate('/activities');
  };

  const handleBookClick = (bookId: number) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-green-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-teal-200 rounded-full opacity-35 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <Sparkles className="h-8 w-8 text-emerald-500 mr-3" />
              <span className="text-emerald-600 font-semibold text-lg">Growing Young Minds</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Where Learning
              <span className="text-emerald-600 block">Grows & Thrives</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover magical books and educational resources that nurture curiosity, 
              creativity, and a lifelong love of learning in every child.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/books')}
                className="bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Explore Books
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={handleExploreActivities}
                className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Activities
              </button>
            </div>
          </div>

          {/* Right content - Featured books with responsive mobile layout */}
          <div className="relative">
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-2 gap-6">
              <div className="transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div 
                  className="cursor-pointer group relative"
                  onClick={() => handleBookClick(1)}
                >
                  <div className="w-64 aspect-square relative">
                    <img 
                      src={whimsicalForestFriends?.image} 
                      alt="Whimsical Forest Friends" 
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group-hover:scale-105"
                    />
                  </div>
                  {/* Fixed hover overlay - properly positioned */}
                  <div className="absolute inset-0 bg-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                    <span className="bg-white text-emerald-600 px-4 py-2 rounded-full font-semibold shadow-lg">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
              <div className="transform -rotate-3 hover:rotate-0 transition-transform duration-300 mt-8">
                <div 
                  className="cursor-pointer group relative"
                  onClick={() => handleBookClick(3)}
                >
                  <div className="w-64 aspect-7/10 relative">
                    <img 
                      src={mindfulnessGuide?.image} 
                      alt="Young Explorer's Guide to Mindfulness and Meditation" 
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group-hover:scale-105"
                    />
                  </div>
                  {/* Fixed hover overlay - properly positioned */}
                  <div className="absolute inset-0 bg-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                    <span className="bg-white text-emerald-600 px-4 py-2 rounded-full font-semibold shadow-lg">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Bookshelf Layout - Vertical with 2 books per shelf */}
            <div className="md:hidden space-y-8">
              {/* First Shelf */}
              <div className="relative">
                <div className="flex justify-center items-end space-x-4 mb-4">
                  <div className="w-32 transition-transform duration-300">
                    <div 
                      className="cursor-pointer group relative w-full h-full"
                      onClick={() => handleBookClick(1)}
                    >
                      <div className="w-full aspect-square relative">
                        <img 
                          src={whimsicalForestFriends?.image} 
                          alt="Whimsical Forest Friends" 
                          className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {/* Mobile hover overlay - properly positioned */}
                      <div className="absolute inset-0 bg-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <span className="bg-white text-emerald-600 px-2 py-1 rounded text-xs font-semibold">
                          View
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-32 transition-transform duration-300">
                    <div 
                      className="cursor-pointer group relative w-full h-full"
                      onClick={() => handleBookClick(3)}
                    >
                      <div className="w-full aspect-7/10 relative">
                        <img 
                          src={mindfulnessGuide?.image} 
                          alt="Young Explorer's Guide to Mindfulness and Meditation" 
                          className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {/* Mobile hover overlay - properly positioned */}
                      <div className="absolute inset-0 bg-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <span className="bg-white text-emerald-600 px-2 py-1 rounded text-xs font-semibold">
                          View
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Shelf */}
                <div className="h-3 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg shadow-lg mx-4"></div>
                <div className="h-2 bg-gradient-to-b from-amber-200 to-amber-300 rounded-b-lg shadow-md mx-2 -mt-1"></div>
              </div>

              {/* Second Shelf */}
              <div className="relative">
                <div className="flex justify-center items-end space-x-4 mb-4">
                  <div className="w-32 transition-transform duration-300">
                    <div 
                      className="cursor-pointer group relative w-full h-full"
                      onClick={() => handleBookClick(2)}
                    >
                      <div className="w-full aspect-7/10 relative">
                        <img 
                          src={wildernessGuide?.image} 
                          alt="Young Explorer's Guide to Wilderness" 
                          className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {/* Mobile hover overlay - properly positioned */}
                      <div className="absolute inset-0 bg-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <span className="bg-white text-emerald-600 px-2 py-1 rounded text-xs font-semibold">
                          View
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-32 transition-transform duration-300">
                    <div 
                      className="cursor-pointer group relative w-full h-full"
                      onClick={() => handleBookClick(4)}
                    >
                      <div className="w-full aspect-square relative">
                        <img 
                          src={bearAndMagic?.image} 
                          alt="The Bear and His Magic" 
                          className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {/* Mobile hover overlay - properly positioned */}
                      <div className="absolute inset-0 bg-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <span className="bg-white text-emerald-600 px-2 py-1 rounded text-xs font-semibold">
                          View
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Shelf */}
                <div className="h-3 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg shadow-lg mx-4"></div>
                <div className="h-2 bg-gradient-to-b from-amber-200 to-amber-300 rounded-b-lg shadow-md mx-2 -mt-1"></div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm transform rotate-12 shadow-lg">
              Coming Soon!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;