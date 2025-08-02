import React, { useState } from 'react';
import { Star, Clock, Users, Award, Play, Eye, CheckCircle, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Course } from '../data/courses';
import PriceDisplay from './PriceDisplay';

interface CourseCardProps {
  course: Course;
  onEnroll: (course: Course) => void;
  isEnrolling?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll, isEnrolling = false }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleViewCurriculum = () => {
    navigate(`/course/${course.id}`);
  };

  const handleEnrollNow = () => {
    if (!course.isComingSoon && course.inStock) {
      onEnroll(course);
    }
  };

  const getAvailabilityStatus = () => {
    if (course.isComingSoon) return 'Coming Soon';
    if (!course.inStock) return 'Sold Out';
    if (course.maxEnrollment && course.currentEnrollment && course.currentEnrollment >= course.maxEnrollment) {
      return 'Full';
    }
    return 'Available';
  };

  const isAvailable = course.inStock && !course.isComingSoon && 
    (!course.maxEnrollment || !course.currentEnrollment || course.currentEnrollment < course.maxEnrollment);

  // Check if we should use a solid color background instead of image
  const shouldUseSolidBackground = !course.image || course.image === '' || imageError;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      {/* Course Image or Solid Background */}
      <div className="relative h-48 overflow-hidden">
        {shouldUseSolidBackground ? (
          // Solid color background for courses without images
          <div className="w-full h-full bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100 flex items-center justify-center relative">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 opacity-60">
                <Play className="h-10 w-10 text-emerald-600" />
              </div>
              <p className="text-emerald-600 font-medium text-sm">Course Preview Coming Soon</p>
            </div>
          </div>
        ) : (
          // Course Image with Preview Button for Young Storytellers Academy
          <div className="relative w-full h-full">
            <div className={`w-full h-full bg-gray-200 ${!imageLoaded ? 'animate-pulse' : ''}`}>
              <img 
                src={course.image} 
                alt={course.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageLoaded(true);
                  setImageError(true);
                }}
              />
            </div>
          </div>
        )}
        
        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {course.isPopular && (
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              Most Popular
            </span>
          )}
          {course.isNew && (
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              New Course
            </span>
          )}
          {course.hasPublishingOpportunity && (
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              Publishing Opportunity
            </span>
          )}
        </div>

        {/* Availability Status */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold shadow-lg ${
            getAvailabilityStatus() === 'Available' 
              ? 'bg-green-500 text-white'
              : getAvailabilityStatus() === 'Coming Soon'
              ? 'bg-amber-500 text-white'
              : 'bg-red-500 text-white'
          }`}>
            {getAvailabilityStatus()}
          </span>
        </div>

        {/* Overlay for unavailable courses */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold">
              {getAvailabilityStatus()}
            </span>
          </div>
        )}
      </div>

      {/* Course Info */}
      <div className="p-6">
        {/* Rating and Level */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex text-yellow-400">
            {[...Array(course.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className="text-sm text-gray-500">{course.level}</span>
        </div>

        {/* Title and Subtitle */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-emerald-600 font-semibold mb-3">{course.subtitle}</p>
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">{course.description}</p>

        {/* Special Publishing Opportunity Notice */}
        {course.hasPublishingOpportunity && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-purple-700 font-medium">
              ✨ Each submission has the chance to win a complimentary publishing package through Bean to Stalk Young Authors Club!
            </p>
          </div>
        )}

        {/* Reorganized Course Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          {/* Left Card: Duration & Lessons (Clock icon) */}
          <div className="bg-gray-50 rounded-lg p-3">
            <Clock className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
            <div className="text-sm font-semibold text-gray-900">{course.duration}</div>
            <div className="text-xs text-gray-500">
              {course.id === 1 ? '6 modules' : `${course.lessons} lessons`}
            </div>
          </div>
          
          {/* Middle Card: Ages with age range (Users icon) */}
          <div className="bg-gray-50 rounded-lg p-3">
            <Users className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
            <div className="text-sm font-semibold text-gray-900">{course.ageGroup}</div>
            <div className="text-xs text-gray-500">age range</div>
          </div>
          
          {/* Right Card: Online with certificate (Award icon) */}
          <div className="bg-gray-50 rounded-lg p-3">
            <Award className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
            <div className="text-sm font-semibold text-gray-900">Online</div>
            <div className="text-xs text-gray-500">certificate</div>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">What You'll Learn:</h4>
          <ul className="space-y-1">
            {course.highlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                {highlight}
              </li>
            ))}
            {course.highlights.length > 3 && (
              <li className="text-sm text-gray-500">
                + More!
              </li>
            )}
          </ul>
        </div>

        {/* Pricing */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <PriceDisplay 
                usdPrice={course.price} 
                className="text-2xl font-bold text-emerald-600"
                size="xl"
              />
              {course.originalPrice && (
                <PriceDisplay 
                  usdPrice={course.originalPrice} 
                  className="text-sm text-gray-500 line-through ml-2"
                  size="sm"
                />
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">per student</div>
              <div className="text-xs text-emerald-600">30-day guarantee</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button 
              onClick={handleEnrollNow}
              disabled={!isAvailable || isEnrolling}
              className={`w-full py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center ${
                !isAvailable
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : isEnrolling
                  ? 'bg-emerald-400 text-white cursor-wait'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 transform hover:scale-105'
              }`}
            >
              {isEnrolling ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enrolling...
                </>
              ) : !isAvailable ? (
                course.isComingSoon ? 'Notify Me When Available' : getAvailabilityStatus()
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Enroll Now
                </>
              )}
            </button>
            
            <button
              onClick={handleViewCurriculum}
              className="w-full border-2 border-emerald-600 text-emerald-600 py-2 rounded-full hover:bg-emerald-600 hover:text-white transition-colors font-semibold flex items-center justify-center"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Full Curriculum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;