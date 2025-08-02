import React, { useState } from 'react';
import { BookOpen, Palette, Compass, Brain, Heart, Gamepad2, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();
  const [selectedAgeRange, setSelectedAgeRange] = useState('');
  const [showActivityAgeFilter, setShowActivityAgeFilter] = useState(false);

  const ageRanges = [
    { id: 'little-learners', label: 'Little Learners', ages: '3-5 years' },
    { id: 'elementary-excellence', label: 'Elementary Excellence', ages: '6-8 years' },
    { id: 'primary-powerhouses', label: 'Primary Powerhouses', ages: '9-12 years' }
  ];

  const categories = [
    {
      icon: BookOpen,
      title: "Story Books",
      description: "Magical tales that spark imagination",
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1Q8L1tnVa0qKxWunwPiU3QjyleA7dmhMLtg4aC",
      route: "/category/story-books"
    },
    {
      icon: Palette,
      title: "Coloring Books",
      description: "Creative adventures in color",
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QteZxh8WVFO8cpWDJTmCLSb4qfEahevZis6Iz",
      route: "/category/coloring-books"
    },
    {
      icon: Compass,
      title: "Young Explorers Guides",
      description: "Adventure and discovery await",
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1Qy0J7SCYowXdrJHpBFgYnuWS5G3T8NLzP1M9O",
      route: "/category/young-explorers-guides"
    },
    {
      icon: Gamepad2,
      title: "Activity Books",
      description: "Interactive fun and games",
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QK7nLpCyiOYgGWJN48dnRt3vrMsV6Tek1Zfxu",
      hasAgeFilter: true,
      route: "/category/activity-books"
    },
    {
      icon: Heart,
      title: "Activities",
      description: "Free educational resources and lesson plans",
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QVdEoyCmPrJG6EubnCoXONKAVlcxMw9h7sPfI",
      route: "/activities"
    },
    {
      icon: Brain,
      title: "Enroll in Classes",
      description: "Story writing courses for young authors",
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QtSCow8WVFO8cpWDJTmCLSb4qfEahevZis6Iz",
      route: "/kids-classes"
    }
  ];

  const handleCategoryClick = (category) => {
    if (category.hasAgeFilter) {
      setShowActivityAgeFilter(!showActivityAgeFilter);
    } else {
      navigate(category.route);
    }
  };

  const handleActivityBookAgeSelection = (ageRangeId) => {
    // Map age range IDs to age filters for the books page
    const ageMapping = {
      'little-learners': '3-5',
      'elementary-excellence': '6-8', 
      'primary-powerhouses': '9+'
    };
    
    const ageFilter = ageMapping[ageRangeId];
    // Navigate to books page with Activity Books category and age filter
    navigate(`/books?category=activity-books&age=${ageFilter}`);
  };
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Background decorative elements matching Hero section */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-green-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-teal-200 rounded-full opacity-35 animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-14 h-14 bg-emerald-300 rounded-full opacity-25 animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the perfect books and resources for every stage of your child's learning journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index}>
                <div 
                  onClick={() => handleCategoryClick(category)}
                  className="bg-white hover:bg-emerald-50 relative p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer group shadow-lg border border-emerald-100"
                >
                  {/* Image placeholder area - will be replaced with actual images */}
                  <div className="w-full h-48 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                    {category.image ? (
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <Icon className="h-16 w-16 text-emerald-400 mb-2" strokeWidth={1.5} />
                        <p className="text-emerald-600 text-sm font-medium">Image Coming Soon</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 flex items-center justify-center">
                      {category.title}
                      {category.hasAgeFilter && (
                        <ChevronDown className={`ml-2 h-5 w-5 text-emerald-600 transition-transform duration-300 ${showActivityAgeFilter ? 'rotate-180' : ''}`} />
                      )}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Subtle hover accent */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-emerald-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Age Range Filter for Activity Books */}
                {category.hasAgeFilter && showActivityAgeFilter && (
                  <div className="mt-4 bg-white rounded-2xl shadow-lg border border-emerald-200 p-6 transform transition-all duration-300">
                    <h4 className="text-lg font-bold text-emerald-800 mb-4 text-center">Choose Age Range</h4>
                    <div className="space-y-3">
                      {ageRanges.map((range) => (
                        <button
                          key={range.id}
                          onClick={() => {
                            handleActivityBookAgeSelection(range.id);
                          }}
                          className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            selectedAgeRange === range.id
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-800'
                              : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300'
                          }`}
                        >
                          <div className="font-semibold">{range.label}</div>
                          <div className="text-sm opacity-75">{range.ages}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;