import React, { useState } from 'react';
import { BookOpen, Beaker, PenTool, Heart, Download, Eye, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import EmailCollectionModal from '../components/EmailCollectionModal';

const Activities = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen, color: 'emerald' },
    { id: 'stem', name: 'STEM', icon: Beaker, color: 'blue' },
    { id: 'reading-writing', name: 'Reading & Writing', icon: PenTool, color: 'purple' },
    { id: 'arts', name: 'Arts', icon: PenTool, color: 'pink' },
    { id: 'brain-body', name: 'Brain & Body Health', icon: Heart, color: 'red' }
  ];

  const resources = [
    {
      id: 1,
      title: "Creative Writing Prompts: You finish the story",
      description: "Spark your child's imagination with 5 captivating story starters! Young writers will embark on creative adventures by completing these open-ended narratives.",
      category: 'reading-writing',
      type: 'Activity Pack',
      pages: 14,
      rating: 5,
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QnRsYEYZkbzfRgLaWFodKm502ZpQGq7vAT9e1",
      previewUrl: "/activities/creative-writing-prompts-preview",
      downloadUrl: "/downloads/creative-writing-prompts.pdf",
      features: [
        "5 age-appropriate story prompts designed to ignite creativity",
        "Clear instructions for independent or guided use",
        "Lined writing sheets for story continuation",
        "Thoughtful reflection questions to deepen the writing experience",
        "Submission guidelines for publishing opportunity"
      ],
      bookCompanion: "Creative Writing Adventures",
      isNew: true,
      hasPublishingOpportunity: true,
      isComingSoon: false
    },
    {
      id: 2,
      title: "Wilderness Survival Activity Pack",
      description: "Companion activities for the Young Explorer's Guide to Wilderness & Outdoor Survival Skills",
      category: 'stem',
      type: 'Activity Pack',
      pages: 24,
      rating: 5,
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QKXUClY8yiOYgGWJN48dnRt3vrMsV6Tek1Zfx",
      previewUrl: "/activities/wilderness-survival-preview",
      downloadUrl: "/downloads/wilderness-survival-pack.pdf",
      features: [
        "15 hands-on outdoor activities",
        "Safety checklists and guides",
        "Nature identification sheets",
        "Emergency preparedness exercises"
      ],
      bookCompanion: "Young Explorer's Guide to Wilderness & Outdoor Survival Skills",
      isComingSoon: true
    },
    {
      id: 3,
      title: "Mindfulness Journal for Kids",
      description: "Daily reflection and mindfulness exercises to accompany meditation practices",
      category: 'brain-body',
      type: 'Journal',
      pages: 32,
      rating: 5,
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QUfJolYsdUx2HNFVwhIvgPBDLM6ecoGRsCj7z",
      previewUrl: "/activities/mindfulness-journal-preview",
      downloadUrl: "/downloads/mindfulness-journal.pdf",
      features: [
        "30 days of guided reflections",
        "Breathing exercise cards",
        "Emotion tracking charts",
        "Gratitude practice pages"
      ],
      bookCompanion: "A Young Explorer's Guide to Mindfulness and Meditation",
      isComingSoon: true
    },
    {
      id: 4,
      title: "Science Experiment Lab Sheets",
      description: "Structured worksheets for conducting safe home science experiments",
      category: 'stem',
      type: 'Worksheet Pack',
      pages: 28,
      rating: 5,
      image: "",
      previewUrl: "/activities/science-lab-sheets-preview",
      downloadUrl: "/downloads/science-lab-sheets.pdf",
      features: [
        "Hypothesis and observation sheets",
        "Safety protocol checklists",
        "Results recording templates",
        "Extension activity suggestions"
      ],
      bookCompanion: "Little Scientists Lab Book",
      isComingSoon: true
    },
    {
      id: 5,
      title: "Story Explorer's Sketch Book Practice Sheets",
      description: "Step-by-step practice pages for developing artistic skills",
      category: 'arts',
      type: 'Practice Pack',
      pages: 36,
      rating: 5,
      image: "",
      previewUrl: "/activities/art-technique-preview",
      downloadUrl: "/downloads/art-technique-sheets.pdf",
      features: [
        "Drawing technique tutorials",
        "Color theory exercises",
        "Composition practice sheets",
        "Art history mini-lessons"
      ],
      bookCompanion: "Story Explorer's Sketch Book",
      isComingSoon: true
    },
    {
      id: 6,
      title: "Reading Comprehension Activities",
      description: "Interactive exercises to enhance reading skills and comprehension",
      category: 'reading-writing',
      type: 'Activity Pack',
      pages: 32,
      rating: 4,
      image: "",
      previewUrl: "/activities/reading-comprehension-preview",
      downloadUrl: "/downloads/reading-comprehension-activities.pdf",
      features: [
        "Story analysis worksheets",
        "Vocabulary building exercises",
        "Character study templates",
        "Discussion question guides"
      ],
      bookCompanion: "Various Story Books",
      isComingSoon: true
    }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  const handleDownload = (resource) => {
    // Special handling for Creative Writing Prompts - show email modal
    if (resource.id === 1 && !resource.isComingSoon) {
      setSelectedResource(resource);
      setIsEmailModalOpen(true);
      return;
    }

    if (resource.isComingSoon) {
      addToast({
        type: 'info',
        title: 'Coming Soon',
        message: `${resource.title} will be available soon. We'll notify you when it's ready!`,
        duration: 3000
      });
      return;
    }

    addToast({
      type: 'success',
      title: 'Download Started',
      message: `${resource.title} is being downloaded.`,
      duration: 3000
    });
  };

  const handleEmailSubmitted = () => {
    setIsEmailModalOpen(false);
    addToast({
      type: 'success',
      title: 'Download Started!',
      message: 'Your free Creative Writing Prompts resource is opening in a new tab.',
      duration: 4000
    });
  };

  const handlePreview = (resource) => {
    if (resource.isComingSoon) {
      addToast({
        type: 'info',
        title: 'Coming Soon',
        message: `Preview for ${resource.title} will be available soon.`,
        duration: 3000
      });
      return;
    }

    addToast({
      type: 'info',
      title: 'Preview Coming Soon',
      message: `Preview for ${resource.title} will be available soon.`,
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Educational Activities &
              <span className="text-emerald-600 block">Digital Resources</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Companion content designed to help you get started, or enhance learning 
              with our Young Explorer's Guide books and more!
            </p>
          </div>

          {/* Category Filter with Consistent Styling */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                {/* Resource Image */}
                <div className="relative h-48 overflow-hidden">
                  {resource.image ? (
                    <>
                      <img 
                        src={resource.image} 
                        alt={resource.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error(`Failed to load image for ${resource.title}:`, e);
                          e.currentTarget.src = "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QyaPpazYowXdrJHpBFgYnuWS5G3T8NLzP1M9O";
                        }}
                      />
                      
                      {/* Coming Soon Overlay */}
                      {resource.isComingSoon && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="bg-white rounded-full p-4">
                            <Clock className="h-8 w-8 text-gray-600" />
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    // Solid color background for resources without images
                    <div className="w-full h-full bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 opacity-60">
                          <BookOpen className="h-10 w-10 text-emerald-600" />
                        </div>
                        <p className="text-emerald-600 font-medium text-sm">Resource Preview Coming Soon</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Resource Info */}
                <div className="p-6">
                  {/* Status Pills - Aligned to Left with 16px Padding */}
                  <div className="flex flex-col gap-2 mb-4 pl-4">
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        resource.isComingSoon 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-emerald-500 text-white'
                      }`}>
                        {resource.isComingSoon ? 'Coming Soon' : resource.type}
                      </span>
                      {resource.isNew && !resource.isComingSoon && (
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          New!
                        </span>
                      )}
                    </div>
                    {resource.hasPublishingOpportunity && !resource.isComingSoon && (
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold self-start">
                        Publishing Opportunity
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    {/* Only show rating if not coming soon */}
                    {!resource.isComingSoon && (
                      <div className="flex text-yellow-400">
                        {[...Array(resource.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    )}
                    <span className="text-emerald-600 text-sm font-medium">
                      {categories.find(cat => cat.id === resource.category)?.name}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{resource.description}</p>

                  {/* Special Publishing Opportunity Notice */}
                  {resource.hasPublishingOpportunity && !resource.isComingSoon && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3 mb-4">
                      <p className="text-sm text-purple-700 font-medium">
                        ✨ Each submission has the chance to win a complimentary publishing package through Bean to Stalk Young Authors Club!
                      </p>
                    </div>
                  )}

                  {/* Companion Book */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Companion to:</span> {resource.bookCompanion}
                    </p>
                  </div>

                  {/* Features - All Features Displayed */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Includes:</h4>
                    <ul className="space-y-1">
                      {resource.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleDownload(resource)}
                      className={`w-full py-3 rounded-full transition-colors flex items-center justify-center font-semibold ${
                        resource.isComingSoon
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                      aria-label={`Download ${resource.title}`}
                      disabled={resource.isComingSoon}
                    >
                      {resource.isComingSoon ? (
                        <>
                          <Clock className="h-4 w-4 mr-2" />
                          Coming Soon
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download Free
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-600">Resources for this category are coming soon!</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Email Collection Modal */}
      <EmailCollectionModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        resource={selectedResource}
        onEmailSubmitted={handleEmailSubmitted}
      />
    </div>
  );
};

export default Activities;