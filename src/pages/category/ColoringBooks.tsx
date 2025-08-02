import React from 'react';
import { ArrowLeft, Palette, Star, ShoppingCart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PriceDisplay from '../../components/PriceDisplay';

const ColoringBooks = () => {
  const navigate = useNavigate();

  const coloringBooks = [
    {
      id: 1,
      title: "Whimsical Forest Friends",
      subtitle: "A Magical Coloring Adventure",
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QY4pC1bXF9DmtbNXsArH12R8T3wZkySUOzLJa",
      price: "$12.99",
      rating: 5,
      ageRange: "Ages 3-8",
      pages: 48,
      features: [
        "40+ unique illustrations",
        "High-quality paper perfect for crayons, markers, and colored pencils",
        "Single-sided pages to prevent bleed-through"
      ],
      description: "Embark on a magical journey through enchanted forests filled with delightful creatures waiting to be brought to life with color."
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
              Coloring Books
              <span className="text-emerald-600 block">Creative Adventures in Color</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unleash creativity and imagination with our beautifully illustrated coloring books, 
              designed to inspire artistic expression and provide hours of mindful, engaging fun.
            </p>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coloringBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                {/* Book Cover */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-emerald-50 to-green-50 p-6">
                  <div className="flex justify-center h-full">
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="h-full w-auto object-contain rounded shadow-xl"
                    />
                  </div>
                </div>

                {/* Book Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(book.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{book.ageRange}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-emerald-600 font-semibold mb-3">{book.subtitle}</p>
                  <p className="text-gray-600 mb-4 leading-relaxed">{book.description}</p>

                  {/* Book Details */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pages:</span>
                      <span className="font-medium text-gray-900">{book.pages}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {book.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                      {book.features.length > 3 && (
                        <li className="text-sm text-gray-500">
                          +{book.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between mb-4">
                    <PriceDisplay 
                      usdPrice={book.price} 
                      className="text-2xl font-bold text-emerald-600"
                      size="xl"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button className="w-full bg-emerald-600 text-white py-3 rounded-full hover:bg-emerald-700 transition-colors flex items-center justify-center font-semibold">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => navigate(`/books/${book.id}`)}
                      className="w-full border-2 border-emerald-600 text-emerald-600 py-2 rounded-full hover:bg-emerald-600 hover:text-white transition-colors flex items-center justify-center font-semibold"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Placeholder for Future Books */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-dashed border-emerald-200 overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center">
                <div className="text-center">
                  <Palette className="h-16 w-16 text-emerald-300 mx-auto mb-4" />
                  <p className="text-emerald-600 font-medium">More Coloring Adventures Coming Soon!</p>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Future Coloring Books</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We're creating more beautiful coloring books with exciting themes and characters. 
                  Stay tuned for new artistic adventures!
                </p>
                
                <button className="w-full border-2 border-emerald-600 text-emerald-600 py-3 rounded-full hover:bg-emerald-600 hover:text-white transition-colors font-semibold">
                  Join Our Newsletter for Updates
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Benefits of Coloring</h2>
            <p className="text-xl text-gray-600">
              Coloring isn't just fun—it's educational and therapeutic too!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Palette className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Creativity & Expression</h3>
              <p className="text-gray-600">
                Encourages artistic expression and helps children explore their creative potential 
                through color choices and artistic decisions.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-100 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Star className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Focus & Concentration</h3>
              <p className="text-gray-600">
                Develops attention span and concentration skills while providing a calming, 
                meditative activity that reduces stress and anxiety.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-100 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Eye className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Motor Skills</h3>
              <p className="text-gray-600">
                Improves fine motor skills, hand-eye coordination, and pencil grip, 
                preparing children for writing and other detailed tasks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ColoringBooks;