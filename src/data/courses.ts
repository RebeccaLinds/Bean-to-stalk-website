export interface Course {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  ageGroup: string;
  duration: string;
  lessons: number;
  students: number;
  level: string;
  instructor: {
    name: string;
    bio: string;
    image: string;
    credentials: string[];
  };
  features: string[];
  highlights: string[];
  learningObjectives: string[];
  prerequisites: string[];
  courseMaterials: string[];
  curriculum: {
    module: string;
    title: string;
    duration: string;
    lessons: string[];
  }[];
  publishingBadge?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  isComingSoon?: boolean;
  inStock: boolean;
  maxEnrollment?: number;
  currentEnrollment?: number;
  hasPublishingOpportunity?: boolean;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Young Storytellers Academy",
    subtitle: "Master the Art of Creative Writing",
    description: "A comprehensive self-paced course designed to unlock your child's storytelling potential through engaging lessons, creative exercises, and personalized feedback.",
    fullDescription: "Transform your child into a confident young author who can't wait to share their stories! Our Young Storytellers Academy is a carefully crafted self-paced journey that takes children through the complete process of story creation, from initial idea to polished narrative.\n\nA creative adventure that combines proven educational techniques with engaging, age-appropriate activities. Your child will learn the same storytelling principles used by professional authors, but presented in a fun, accessible way that builds confidence and creativity.\n\nEach lesson is designed to be completed independently by older kids, or with the help of a parent or caregiver. With clear video instructions and engaging worksheets, children can progress at their own pace while developing essential writing skills that will benefit them throughout their academic journey and beyond.",
    image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QKj84aIyiOYgGWJN48dnRt3vrMsV6Tek1Zfxu",
    price: "$89",
    originalPrice: "$149",
    rating: 5,
    ageGroup: "Ages 8-12",
    duration: "Self-paced",
    lessons: 16,
    students: 247,
    level: "Beginner to Intermediate",
    instructor: {
      name: "Bean to Stalk Team",
      bio: "Our expert team of children's authors and educators have combined their experience to create this comprehensive storytelling course. With backgrounds in creative writing, child development, and educational design, they understand how to make learning both effective and enjoyable.",
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QNss8kKHFdZmauiPw8GXAgBHM73sCJ1lES4Wf",
      credentials: [
        "Expert Educational Content Team",
        "Published Children's Authors",
        "Child Development Specialists",
        "Creative Writing Instructors"
      ]
    },
    features: [
      "16 interactive video lessons",
      "Weekly writing assignments",
      "Digital workbook and resources",
      "Certificate of completion",
      "Publishing opportunity with Bean to Stalk",
      "Private student community access"
    ],
    highlights: [
      "Character development techniques",
      "Plot structure and story arcs",
      "Dialogue writing mastery",
      "World-building fundamentals",
      "Editing and revision skills"
    ],
    learningObjectives: [
      "Create compelling characters with depth and personality",
      "Structure stories with clear beginning, middle, and end",
      "Write engaging dialogue that sounds natural",
      "Build imaginative worlds and settings",
      "Edit and revise their own work effectively with improvement prompts and suspense checks!",
      "Complete a full short story from start to finish",
      "Develop confidence in sharing their creative work"
    ],
    prerequisites: [
      "Basic reading and writing skills or guided help from a parent or caregiver",
      "Ability to follow video instructions",
      "Access to computer/tablet and printer",
      "Enthusiasm for storytelling and creativity"
    ],
    courseMaterials: [
      "6 video lessons (10-15 minutes each)",
      "Printable worksheets",
      "Story planning templates",
      "Progress tracking sheets",
      "Certificate template"
    ],
    curriculum: [
      {
        module: "Module 1",
        title: "The Magic of Ideas",
        duration: "Week 1",
        lessons: [
          "What Makes a Great Story?",
          "Finding Your Story Ideas",
          "Choosing Your Best Idea",
          "Setting Up Your Writer's Toolkit"
        ]
      },
      {
        module: "Module 2",
        title: "Creating Amazing Characters",
        duration: "Weeks 2-3",
        lessons: [
          "Meet Your Main Character",
          "Character Personality Workshop",
          "Supporting Characters and Friends",
          "Character Relationships and Conflicts"
        ]
      },
      {
        module: "Module 3",
        title: "Building Your Story World",
        duration: "Weeks 3-4",
        lessons: [
          "Setting the Scene",
          "World-Building Basics",
          "Making Your World Feel Real",
          "Connecting Character and Setting"
        ]
      },
      {
        module: "Module 4",
        title: "Plot and Story Structure",
        duration: "Weeks 5-6",
        lessons: [
          "The Story Mountain",
          "Creating Exciting Problems",
          "Building Tension and Suspense",
          "Satisfying Resolutions"
        ]
      },
      {
        module: "Module 5",
        title: "Bringing Characters to Life",
        duration: "Week 7",
        lessons: [
          "Writing Natural Dialogue",
          "Showing vs. Telling",
          "Action and Description",
          "Pacing Your Story"
        ]
      },
      {
        module: "Module 6",
        title: "Finishing and Sharing",
        duration: "Week 8",
        lessons: [
          "Editing Your First Draft",
          "Polishing Your Story",
          "Preparing for Sharing",
          "Celebration and Next Steps"
        ]
      }
    ],
    isPopular: true,
    inStock: true,
    maxEnrollment: 500,
    currentEnrollment: 247,
    hasPublishingOpportunity: true,
    publishingBadge: true
  },
  {
    id: 2,
    title: "Advanced Storytellers Workshop",
    subtitle: "Coming Soon",
    description: "A comprehensive self-paced writing course designed for aspiring young authors ages 10-14, focusing on advanced storytelling techniques and creative writing development.",
    fullDescription: "Take your young writer's skills to the next level with our Advanced Storytellers Workshop! This comprehensive course is designed for children who have already discovered their love of writing and are ready to explore more sophisticated storytelling techniques.\n\nBuilding on fundamental writing skills, this course delves into advanced narrative structures, complex character development, and professional writing techniques used by published authors. Students will learn to craft compelling plots, develop authentic dialogue, and master the art of revision and editing.\n\nPerfect for young writers who want to take their storytelling seriously and potentially pursue publication opportunities. Each lesson combines video instruction with hands-on writing exercises and peer feedback opportunities.",
    image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QKj84aIyiOYgGWJN48dnRt3vrMsV6Tek1Zfxu",
    price: "$129",
    originalPrice: "$179",
    rating: 5,
    ageGroup: "Ages 10-14",
    duration: "Self-paced",
    lessons: 20,
    students: 0,
    level: "Advanced",
    instructor: {
      name: "Bean to Stalk Team",
      bio: "Our advanced writing instructors are published authors and experienced educators who specialize in developing young talent. They bring professional writing experience and a deep understanding of how to nurture advanced writing skills in young people.",
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QNss8kKHFdZmauiPw8GXAgBHM73sCJ1lES4Wf",
      credentials: [
        "Published Authors & Writing Professionals",
        "Advanced Creative Writing Instructors",
        "Young Adult Literature Specialists",
        "Publishing Industry Experience"
      ]
    },
    features: [
      "20 comprehensive video lessons",
      "Advanced writing technique modules",
      "Peer review and feedback system",
      "One-on-one instructor consultations",
      "Professional editing workshops",
      "Publishing pathway guidance",
      "Advanced certificate of completion"
    ],
    highlights: [
      "Advanced plot development",
      "Complex character arcs",
      "Multiple narrative perspectives",
      "Genre-specific writing techniques",
      "Professional editing and revision"
    ],
    learningObjectives: [
      "Master advanced storytelling techniques",
      "Develop complex, multi-dimensional characters",
      "Write in multiple genres and styles",
      "Understand professional editing processes",
      "Create publication-ready manuscripts",
      "Build confidence for sharing work publicly"
    ],
    prerequisites: [
      "Completion of basic writing course or equivalent experience",
      "Strong reading and writing foundation",
      "Ability to work independently on longer projects",
      "Serious interest in developing writing skills"
    ],
    courseMaterials: [
      "20 advanced video lessons (15-25 minutes each)",
      "Professional writing templates",
      "Genre-specific writing guides",
      "Editing and revision checklists",
      "Publishing preparation materials"
    ],
    curriculum: [
      {
        module: "Module 1",
        title: "Advanced Story Structure",
        duration: "Weeks 1-2",
        lessons: [
          "Beyond the Three-Act Structure",
          "Non-Linear Storytelling",
          "Multiple Plot Lines",
          "Advanced Pacing Techniques"
        ]
      },
      {
        module: "Module 2",
        title: "Complex Character Development",
        duration: "Weeks 3-4",
        lessons: [
          "Character Psychology and Motivation",
          "Character Arcs and Growth",
          "Ensemble Cast Management",
          "Authentic Dialogue Mastery"
        ]
      },
      {
        module: "Module 3",
        title: "Genre Mastery",
        duration: "Weeks 5-6",
        lessons: [
          "Fantasy World-Building",
          "Mystery and Suspense",
          "Science Fiction Concepts",
          "Contemporary Realism"
        ]
      },
      {
        module: "Module 4",
        title: "Professional Writing Techniques",
        duration: "Weeks 7-8",
        lessons: [
          "Show Don't Tell Mastery",
          "Point of View Techniques",
          "Voice and Style Development",
          "Advanced Editing Skills"
        ]
      }
    ],
    isNew: true,
    isComingSoon: true,
    inStock: false,
    maxEnrollment: 200,
    currentEnrollment: 0
  }
];

export const getCourseById = (id: number): Course | undefined => {
  return courses.find(course => course.id === id);
};

const getAvailableCourses = (): Course[] => {
  return courses.filter(course => course.inStock || course.isComingSoon);
};

// Filter courses for specific age groups
export const getCoursesByAgeGroup = (ageGroup: string): Course[] => {
  return courses.filter(course => {
    const courseAgeGroup = course.ageGroup.toLowerCase();
    switch (ageGroup) {
      case 'young':
        return courseAgeGroup.includes('6') || courseAgeGroup.includes('7') || courseAgeGroup.includes('8');
      case 'intermediate':
        return courseAgeGroup.includes('9') || courseAgeGroup.includes('10') || courseAgeGroup.includes('11') || courseAgeGroup.includes('12');
      case 'advanced':
        return courseAgeGroup.includes('10') || courseAgeGroup.includes('11') || courseAgeGroup.includes('12') || courseAgeGroup.includes('13') || courseAgeGroup.includes('14');
      default:
        return true;
    }
  });
};