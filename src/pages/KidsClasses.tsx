import React, { useState } from 'react';
import { PenTool, Clock, Users, Award, Star, Play, CheckCircle, BookOpen, Sparkles } from 'lucide-react';
import { courses, getCoursesByAgeGroup } from '../data/courses';
import CourseCard from '../components/CourseCard';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import PriceDisplay from '../components/PriceDisplay';

const KidsClasses = () => {
  const [selectedAge, setSelectedAge] = useState('all');
  const [enrollingCourseId, setEnrollingCourseId] = useState<number | null>(null);
  const { addItem } = useCart();
  const { addToast } = useToast();

  const ageGroups = [
    { id: 'all', name: 'All Ages', range: '' },
    { id: 'young', name: 'Young Writers', range: '6-8 years' },
    { id: 'intermediate', name: 'Intermediate', range: '9-12 years' },
    { id: 'advanced', name: 'Advanced', range: '10-14 years' }
  ];

  // Filter courses based on the updated requirements
  const getFilteredCourses = () => {
    if (selectedAge === 'all') {
      return courses;
    }
    
    // Young Storytellers Academy should appear in both Young Writers and Intermediate
    if (selectedAge === 'young' || selectedAge === 'intermediate') {
      return courses.filter(course => 
        course.id === 1 || // Young Storytellers Academy
        (selectedAge === 'advanced' && course.id === 2) // Advanced Storytellers Workshop only in Advanced
      );
    }
    
    // Advanced category shows Advanced Storytellers Workshop
    if (selectedAge === 'advanced') {
      return courses.filter(course => course.id === 2);
    }
    
    return courses;
  };

  const filteredCourses = getFilteredCourses();

  const handleEnrollCourse = async (course: any) => {
    if (course.isComingSoon) {
      // Handle "Notify Me" for coming soon courses
      addToast({
        type: 'info',
        title: 'Thanks for your interest!',
        message: `We'll notify you when ${course.title} becomes available.`,
        duration: 5000
      });
      return;
    }

    setEnrollingCourseId(course.id);
    
    try {
      // Simulate enrollment process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add course to cart
      const cartItem = {
        id: course.id,
        title: course.title,
        subtitle: course.subtitle,
        image: course.image,
        price: course.price,
        category: 'Course',
        type: 'course' as const,
        maxQuantity: 1
      };
      
      addItem(cartItem, 1);
      
      // Show success toast
      addToast({
        type: 'success',
        title: 'Successfully Enrolled!',
        message: `You've been enrolled in ${course.title}. Check your cart to complete payment.`,
        duration: 5000
      });
      
    } catch (error) {
      // Show error toast
      addToast({
        type: 'error',
        title: 'Enrollment Failed',
        message: 'There was an issue enrolling in the course. Please try again.',
        duration: 5000
      });
    } finally {
      setEnrollingCourseId(null);
    }
  };

  const testimonials = [
    {
      name: "Emma, age 10",
      text: "I wrote my first real story and my teacher said it was amazing! Now I want to be an author when I grow up.",
      course: "Young Storytellers Academy",
      rating: 5
    },
    {
      name: "Marcus, age 8",
      text: "The classes were so fun! I learned how to make my characters talk and feel real.",
      course: "Young Storytellers Academy",
      rating: 5
    },
    {
      name: "Sarah (Parent)",
      text: "My daughter's confidence in writing has skyrocketed. She's constantly creating new stories now!",
      course: "Young Storytellers Academy",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-green-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-teal-200 rounded-full opacity-35 animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Kids Writing Classes
              <span className="text-emerald-600 block">Nurture Young Authors</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Unlock your child's storytelling potential with our expert-led writing courses. 
              From first words to published stories, we guide young writers on their creative journey.
            </p>

            {/* Special Publishing Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300 mb-8">
              <Award className="h-6 w-6 mr-3" />
              Earn a chance to become a published author with Bean to Stalk!
              <Sparkles className="h-6 w-6 ml-3" />
            </div>
          </div>

          {/* Age Group Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {ageGroups.map((group) => {
              const isActive = selectedAge === group.id;
              return (
                <button
                  key={group.id}
                  onClick={() => setSelectedAge(group.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-emerald-600 border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-bold">{group.name}</div>
                    {group.range && <div className="text-xs opacity-75">{group.range}</div>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Grid - Center Aligned */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={handleEnrollCourse}
                  isEnrolling={enrollingCourseId === course.id}
                />
              ))}
            </div>
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600">Courses for this age group are coming soon!</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Young Authors Say</h2>
            <p className="text-xl text-gray-600">
              Hear from students and parents about their writing journey with Bean to Stalk
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-emerald-50 rounded-2xl p-6 text-center">
                <div className="flex justify-center text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-emerald-600">{testimonial.course}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publishing Opportunity CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12">
            <Award className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Become a Published Author!
            </h2>
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              Outstanding students from our courses have the opportunity to be featured 
              in Bean to Stalk's Young Authors Collection. Your child's story could be 
              the next one inspiring readers around the world!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-emerald-50 transition-colors">
                Learn About Publishing
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
                View Published Stories
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KidsClasses;