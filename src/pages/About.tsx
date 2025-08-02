import React from 'react';
import { Sprout, Users, Award, Heart, BookOpen, Target, Lightbulb } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Sprout,
      title: "Growth Mindset",
      description: "We believe every child has unlimited potential to learn and grow."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building connections between families, educators, and young learners."
    },
    {
      icon: Award,
      title: "Quality",
      description: "Carefully curated content that meets the highest educational standards."
    },
    {
      icon: Heart,
      title: "Love of Learning",
      description: "Fostering curiosity and joy in the learning process."
    }
  ];

  const team = [
    {
      name: "Rebecca Pierce",
      role: "Founder & Creative Director",
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QvkqYqTnbpfQGmwYu9Z1X03saREqIJ8Po2SrB",
      bio: "Author and writer with 15 years in the publishing industry and publishing tech, homeschooling mother of 2."
    },
    {
      name: "Global Expert Network",
      role: "Educational Content Specialist",
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QnkOCYaZkbzfRgLaWFodKm502ZpQGq7vAT9e1",
      bio: "Our worldwide collective of educational experts brings diverse, specialized knowledge to every project, ensuring comprehensive and culturally-informed educational solutions."
    },
    {
      name: "Murilo Santetti",
      role: "Illustrator & Designer",
      image: "https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QeRnETxISbfAzrXKtGi8aMmLoP6wQyTYunlWv",
      bio: "Children's book illustrator with a passion for creating engaging visual stories."
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Young Explorers Guides in Production",
      description: "Began development of our comprehensive educational guide series focusing on outdoor skills and mindfulness."
    },
    {
      year: "2024",
      title: "Creative Partnership with our Amazing Illustrator",
      description: "Formed a creative partnership with talented illustrator Murilo Santetti to bring our stories to life."
    },
    {
      year: "2025",
      title: "Bean to Stalk Founded",
      description: "Officially launched Bean to Stalk with a mission to create better educational resources for children."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                From Bean to Stalk
                <span className="text-emerald-600 block">Growing Together</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Just like a tiny bean grows into a mighty stalk reaching for the sky, 
                we believe in nurturing the seeds of curiosity in every child. Our carefully 
                crafted books and educational resources are designed to support young minds 
                as they explore, discover, and flourish.
              </p>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Founded with a passion for childhood education and development, Bean to Stalk 
                creates engaging, beautiful, and meaningful content that makes learning an adventure.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className="bg-emerald-100 p-3 rounded-xl mr-4 flex-shrink-0">
                        <Icon className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{value.title}</h4>
                        <p className="text-gray-600 text-sm">{value.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right content - Bean to Stalk Circle Logo */}
            <div className="text-center lg:text-right">
              <div className="inline-block bg-gradient-to-br from-emerald-50 to-green-100 p-12 rounded-3xl">
                <img 
                  src="https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1Q22ZDG94KuyGpwxk16Y9eoV0QXRs5cPHaMnLZ" 
                  alt="Bean to Stalk Logo" 
                  className="max-w-full h-auto w-64"
                  loading="lazy"
                  onError={(e) => {
                    console.error('About page logo failed to load:', e.currentTarget.src);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To inspire and empower young minds through thoughtfully designed educational 
              resources that make learning joyful, accessible, and meaningful.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Educational Excellence</h3>
              <p className="text-gray-600">
                Every resource is carefully researched and designed to align with developmental 
                milestones and educational best practices.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-100 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Target className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Age-Appropriate Design</h3>
              <p className="text-gray-600">
                Our content is specifically tailored to different age groups, ensuring 
                optimal engagement and learning outcomes for every child.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-100 p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Lightbulb className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Creative Innovation</h3>
              <p className="text-gray-600">
                We constantly explore new ways to make learning engaging, from interactive 
                activities to immersive storytelling experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate educators, creators, and child development experts working together 
              to bring you the best educational resources.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(`Failed to load team member image for ${member.name}:`, e.currentTarget.src);
                      // Create a placeholder with initials
                      const target = e.currentTarget;
                      const container = target.parentElement;
                      if (container) {
                        container.innerHTML = `
                          <div class="w-full h-full bg-emerald-100 flex items-center justify-center">
                            <div class="text-center">
                              <div class="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span class="text-white text-2xl font-bold">${member.name.split(' ').map(n => n[0]).join('')}</span>
                              </div>
                              <p class="text-emerald-600 font-medium text-sm">Photo Coming Soon</p>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-emerald-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a simple idea to a growing community of learners, here's how Bean to Stalk has evolved.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-200"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                      <div className="text-2xl font-bold text-emerald-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative z-10">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Join Our Growing Community
            </h2>
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              Be part of a community that believes in the power of education to transform lives. 
              Together, we're nurturing the next generation of curious, creative, and confident learners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-emerald-50 transition-colors">
                Explore Our Books
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;