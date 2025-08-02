import React, { useState } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { books, getBooksByCategory } from '../data/books';
import BookCard from '../components/BookCard';
import { useNavigate, useLocation } from 'react-router-dom';

const Books = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parse URL parameters for initial filter state
  const urlParams = new URLSearchParams(location.search);
  const initialCategory = urlParams.get('category');
  const initialAge = urlParams.get('age');
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedAges, setSelectedAges] = useState<string[]>(
    initialAge ? [initialAge] : []
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showAgeDropdown, setShowAgeDropdown] = useState(false);

  const categoryOptions = [
    { id: 'coloring-books', name: 'Coloring Books', matchTerms: ['coloring'] },
    { id: 'story-books', name: 'Story Books', matchTerms: ['story'] },
    { id: 'activity-books', name: 'Activity Books', matchTerms: ['activity', 'arts'] },
    { id: 'young-explorers-guides', name: 'Young Explorers Guides', matchTerms: ['educational', 'wellness'] }
  ];

  const ageOptions = [
    { id: '3-5', name: '3-5 years' },
    { id: '6-8', name: '6-8 years' },
    { id: '9+', name: '9+ years' }
  ];

  // Helper function to check if a book matches age filter
  const matchesAgeFilter = (book, ageFilters) => {
    if (ageFilters.length === 0) return true;
    
    // Coloring books match all age categories
    if (book.category.toLowerCase().includes('coloring')) {
      return true;
    }
    
    // Story Explorer's Sketch Book matches all age categories
    if (book.title === "Story Explorer's Sketch Book") {
      return true;
    }
    
    // Extract age from book.age string and match against filters
    const bookAge = book.age.toLowerCase();
    
    return ageFilters.some(ageFilter => {
      switch (ageFilter) {
        case '3-5':
          return bookAge.includes('3') || bookAge.includes('4') || bookAge.includes('5') || bookAge.includes('3+');
        case '6-8':
          return bookAge.includes('6') || bookAge.includes('7') || bookAge.includes('8') || 
                 bookAge.includes('ages 8-12') || bookAge.includes('ages 5-10');
        case '9+':
          return bookAge.includes('9') || bookAge.includes('10') || bookAge.includes('11') || 
                 bookAge.includes('12') || bookAge.includes('ages 8-12') || bookAge.includes('ages 5-10');
        default:
          return false;
      }
    });
  };

  // Helper function to check if a book matches category filter
  const matchesCategoryFilter = (book, categoryFilters) => {
    if (categoryFilters.length === 0) return true;
    
    return categoryFilters.some(categoryFilter => {
      const category = categoryOptions.find(cat => cat.id === categoryFilter);
      if (!category) return false;
      
      // Story Explorer's Sketch Book should appear in Activity Books filter
      if (categoryFilter === 'activity-books' && book.title === "Story Explorer's Sketch Book") {
        return true;
      }
      
      return category.matchTerms.some(term => 
        book.category.toLowerCase().includes(term.toLowerCase())
      );
    });
  };

  const filteredBooks = books.filter(book => {
    const matchesCategory = matchesCategoryFilter(book, selectedCategories);
    const matchesAge = matchesAgeFilter(book, selectedAges);
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesAge && matchesSearch;
  });

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAgeToggle = (ageId) => {
    setSelectedAges(prev => 
      prev.includes(ageId)
        ? prev.filter(id => id !== ageId)
        : [...prev, ageId]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedAges([]);
    setSearchTerm('');
    // Update URL to remove parameters
    navigate('/books', { replace: true });
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedAges.length > 0 || searchTerm.length > 0;

  const handleViewDetails = (bookId: number) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Hero Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Our Book Collection
              <span className="text-emerald-600 block">Inspiring Young Minds</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our carefully curated collection of educational books, coloring adventures, 
              and inspiring stories designed to nurture curiosity and creativity.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="space-y-4">
              {/* Search with Magnifying Glass Icon */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search books by title, subtitle, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap gap-4 items-center">
                {/* Category Filter Dropdown */}
                <div className="relative z-50 md:z-50">
                  <button
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    className="flex items-center justify-between min-w-[200px] px-4 py-3 border border-gray-300 rounded-xl hover:border-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  >
                    <span className="text-gray-700">
                      {selectedCategories.length === 0 
                        ? 'All Categories' 
                        : selectedCategories.length === 1
                        ? categoryOptions.find(cat => cat.id === selectedCategories[0])?.name
                        : `${selectedCategories.length} Categories`
                      }
                    </span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showCategoryDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-60">
                      <div className="p-2">
                        {categoryOptions.map(category => (
                          <label key={category.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category.id)}
                              onChange={() => handleCategoryToggle(category.id)}
                              className="mr-3 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                            />
                            <span className="text-gray-700">{category.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Age Filter Dropdown */}
                <div className="relative z-40 md:z-50">
                  <button
                    onClick={() => setShowAgeDropdown(!showAgeDropdown)}
                    className="flex items-center justify-between min-w-[150px] px-4 py-3 border border-gray-300 rounded-xl hover:border-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  >
                    <span className="text-gray-700">
                      {selectedAges.length === 0 
                        ? 'All Ages' 
                        : selectedAges.length === 1
                        ? ageOptions.find(age => age.id === selectedAges[0])?.name
                        : `${selectedAges.length} Ages`
                      }
                    </span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showAgeDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showAgeDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                      <div className="p-2">
                        {ageOptions.map(age => (
                          <label key={age.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedAges.includes(age.id)}
                              onChange={() => handleAgeToggle(age.id)}
                              className="mr-3 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                            />
                            <span className="text-gray-700">{age.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Clear Filters Button */}
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="flex items-center px-4 py-3 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All
                  </button>
                )}
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map(categoryId => {
                    const category = categoryOptions.find(cat => cat.id === categoryId);
                    return (
                      <span key={categoryId} className="inline-flex items-center bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                        {category?.name}
                        <button
                          onClick={() => handleCategoryToggle(categoryId)}
                          className="ml-2 hover:text-emerald-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    );
                  })}
                  {selectedAges.map(ageId => {
                    const age = ageOptions.find(a => a.id === ageId);
                    return (
                      <span key={ageId} className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {age?.name}
                        <button
                          onClick={() => handleAgeToggle(ageId)}
                          className="ml-2 hover:text-blue-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    );
                  })}
                  {searchTerm && (
                    <span className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      Search: "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm('')}
                        className="ml-2 hover:text-gray-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid - Single Continuous Flow Layout */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold text-gray-700">
              {filteredBooks.length} Book{filteredBooks.length !== 1 ? 's' : ''} Found
              {hasActiveFilters && (
                <span className="text-emerald-600 ml-2">
                  (filtered from {books.length} total)
                </span>
              )}
            </h2>
            
            {/* Filter Summary */}
            {hasActiveFilters && (
              <div className="text-sm text-gray-500">
                {selectedCategories.length > 0 && `${selectedCategories.length} categor${selectedCategories.length !== 1 ? 'ies' : 'y'}`}
                {selectedCategories.length > 0 && selectedAges.length > 0 && ' • '}
                {selectedAges.length > 0 && `${selectedAges.length} age range${selectedAges.length !== 1 ? 's' : ''}`}
                {searchTerm && (selectedCategories.length > 0 || selectedAges.length > 0) && ' • '}
                {searchTerm && 'search active'}
              </div>
            )}
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria.</p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      </div>

      {/* Click outside to close dropdowns */}
      <div 
        className={`fixed inset-0 z-40 ${showCategoryDropdown || showAgeDropdown ? 'block' : 'hidden'}`}
        onClick={() => {
          setShowCategoryDropdown(false);
          setShowAgeDropdown(false);
        }}
      />
    </>
  );
};

export default Books;