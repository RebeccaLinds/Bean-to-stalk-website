import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Users, Award, Play, CheckCircle, BookOpen, Target, User, Download, Pause, Volume2, VolumeX, Square } from 'lucide-react';
import { getCourseById } from '../data/courses';
import PriceDisplay from '../components/PriceDisplay';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showVideo, setShowVideo] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Video URL for Young Storytellers Academy
  const VIDEO_URL = 'https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QUotPibdUx2HNFVwhIvgPBDLM6ecoGRsCj7zp';

  const course = getCourseById(Number(courseId));

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
          <button
            onClick={() => navigate('/kids-classes')}
            className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // Handle video preview play
  const handlePlayPreview = () => {
    if (course.id === 1) { // Only for Young Storytellers Academy
      setShowVideo(true);
      setVideoPlaying(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 100);
    }
  };

  // Handle video play/pause
  const handleVideoPlayPause = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoPlaying(!videoPlaying);
    }
  };

  // Handle video stop
  const handleVideoStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setVideoPlaying(false);
    setShowVideo(false);
  };

  // Handle volume change
  const handleVideoVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  // Handle mute toggle
  const handleVideoToggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      videoRef.current.muted = newMutedState;
      
      if (!newMutedState && volume === 0) {
        setVolume(0.5);
        videoRef.current.volume = 0.5;
      }
    }
  };

  // Handle video ended
  const handleVideoEnded = () => {
    setVideoPlaying(false);
    setShowVideo(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Sync video state with actual video events
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setVideoPlaying(true);
    const handlePause = () => setVideoPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [showVideo]);

  const handleEnrollNow = async () => {
    setIsEnrolling(true);
    
    // Simulate enrollment process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add to cart logic here
    console.log(`Enrolled in ${course.title}`);
    
    setIsEnrolling(false);
    
    // Show success notification
    alert(`Successfully enrolled in ${course.title}!`);
  };

  const isAvailable = course.inStock && !course.isComingSoon && 
    (!course.maxEnrollment || !course.currentEnrollment || course.currentEnrollment < course.maxEnrollment);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BookOpen },
    { id: 'curriculum', name: 'Curriculum', icon: Target },
    { id: 'instructor', name: 'Instructor', icon: User }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/kids-classes')}
            className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Courses
          </button>
        </div>
      </div>

      {/* Course Hero */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Course Image */}
            <div className="text-center">
              <div className="relative inline-block">
                {course.id === 1 && showVideo ? (
                  // Video Player for Young Storytellers Academy
                  <div 
                    className="relative w-full max-w-md mx-auto bg-black rounded-xl shadow-2xl overflow-hidden"
                    onMouseEnter={() => setShowControls(true)}
                    onMouseLeave={() => setShowControls(false)}
                  >
                    <video
                      ref={videoRef}
                      src={VIDEO_URL}
                      className="w-full h-auto object-cover"
                      preload="auto"
                      playsInline
                      onEnded={handleVideoEnded}
                      aria-label="Young Storytellers Academy course preview video"
                    />
                    
                    {/* Video Controls Overlay */}
                    <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
                      showControls ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="flex items-center justify-between">
                        {/* Left Controls */}
                        <div className="flex items-center space-x-3">
                          {/* Play/Pause Button */}
                          <button
                            onClick={handleVideoPlayPause}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-colors"
                            aria-label={videoPlaying ? "Pause video" : "Play video"}
                          >
                            {videoPlaying ? (
                              <Pause className="h-5 w-5 text-white" />
                            ) : (
                              <Play className="h-5 w-5 text-white" />
                            )}
                          </button>
                          
                          {/* Stop Button */}
                          <button
                            onClick={handleVideoStop}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-colors"
                            aria-label="Stop video and return to course image"
                          >
                            <Square className="h-5 w-5 text-white" />
                          </button>
                        </div>
                        
                        {/* Right Controls - Volume */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handleVideoToggleMute}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-colors"
                            aria-label={isMuted ? "Unmute video" : "Mute video"}
                          >
                            {isMuted || volume === 0 ? (
                              <VolumeX className="h-4 w-4 text-white" />
                            ) : (
                              <Volume2 className="h-4 w-4 text-white" />
                            )}
                          </button>
                          
                          {/* Volume Slider */}
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={isMuted ? 0 : volume}
                            onChange={handleVideoVolumeChange}
                            className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                            aria-label="Volume control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Course Image with Play Button Overlay
                  <div className="relative">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full max-w-md rounded-xl shadow-2xl"
                    />
                    
                    {/* Play Button Overlay for Young Storytellers Academy */}
                    {course.id === 1 && (
                      <button
                        onClick={handlePlayPreview}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors opacity-0 hover:opacity-100 group"
                        aria-label="Play course preview video"
                      >
                        <div className="bg-white/90 hover:bg-white backdrop-blur-sm p-6 rounded-full shadow-lg transform group-hover:scale-110 transition-all duration-300">
                          <Play className="h-12 w-12 text-emerald-600" />
                        </div>
                      </button>
                    )}
                  </div>
                )}
                
                {/* Status Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {course.isPopular && (
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-4">
                  {[...Array(course.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">{course.rating}.0 rating</span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-xl text-emerald-600 font-semibold mb-4">{course.subtitle}</p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{course.description}</p>

              {/* Reorganized Course Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Left Card: Duration & Lessons (Clock icon) */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-emerald-600 mr-2" />
                    <div>
                      <div className="font-semibold text-gray-900">{course.duration}</div>
                      <div className="text-sm text-gray-500">
                        {course.id === 1 ? '6 modules' : `${course.lessons} lessons`}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Middle Card: Ages with age range (Users icon) */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-emerald-600 mr-2" />
                    <div>
                      <div className="font-semibold text-gray-900">{course.ageGroup}</div>
                      <div className="text-sm text-gray-500">age range</div>
                    </div>
                  </div>
                </div>
                
                {/* Right Card: Online with certificate (Award icon) */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-emerald-600 mr-2" />
                    <div>
                      <div className="font-semibold text-gray-900">Online</div>
                      <div className="text-sm text-gray-500">certificate</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing and Enrollment */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <PriceDisplay 
                      usdPrice={course.price} 
                      className="text-3xl font-bold text-emerald-600"
                      size="xl"
                      showOriginal={true}
                    />
                    {course.originalPrice && (
                      <PriceDisplay 
                        usdPrice={course.originalPrice} 
                        className="text-lg text-gray-500 line-through ml-3"
                        size="lg"
                      />
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">per student</div>
                    <div className="text-xs text-emerald-600">30-day guarantee</div>
                  </div>
                </div>

                <button
                  onClick={handleEnrollNow}
                  disabled={!isAvailable || isEnrolling}
                  className={`w-full py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center mb-4 ${
                    !isAvailable
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : isEnrolling
                      ? 'bg-emerald-400 text-white cursor-wait'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 transform hover:scale-105'
                  }`}
                >
                  {isEnrolling ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Enrolling...
                    </>
                  ) : !isAvailable ? (
                    'Currently Unavailable'
                  ) : (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      Enroll Now
                    </>
                  )}
                </button>

                <p className="text-center text-gray-500 text-sm">
                  Instant access • Self-paced learning • Certificate included
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details Tabs */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-full p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-emerald-600'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Full Description */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Course</h2>
                  <div className="prose prose-lg max-w-none">
                    {course.fullDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-600 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Learning Objectives */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Learning Objectives</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {course.learningObjectives.map((objective, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Prerequisites</h3>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Course Materials */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {course.courseMaterials.map((material, index) => (
                      <div key={index} className="flex items-start">
                        <Download className="h-5 w-5 text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{material}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                <div className="space-y-6">
                  {course.curriculum.map((module, index) => (
                    <div key={index} className="bg-gray-50 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          {module.module}: {module.title}
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="flex items-center">
                            <Play className="h-4 w-4 text-emerald-500 mr-3" />
                            <span className="text-gray-600">{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'instructor' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Your Instructor</h2>
                <div className="bg-gray-50 rounded-2xl p-8">
                  <div className="flex items-start space-x-6">
                    <img 
                      src={course.instructor.image} 
                      alt={course.instructor.name}
                      className="w-32 h-32 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=300';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.instructor.name}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{course.instructor.bio}</p>
                      
                      <h4 className="font-semibold text-gray-900 mb-2">Credentials:</h4>
                      <ul className="space-y-1">
                        {course.instructor.credentials.map((credential, index) => (
                          <li key={index} className="flex items-center">
                            <Award className="h-4 w-4 text-emerald-500 mr-2" />
                            <span className="text-gray-600">{credential}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Custom Styles for Video Controls */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-webkit-slider-track {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          height: 4px;
        }
        
        .slider::-moz-range-track {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          height: 4px;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default CourseDetail;