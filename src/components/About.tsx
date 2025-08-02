import React from 'react';
import { Sprout, Users, Award, Heart } from 'lucide-react';

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

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              From Bean to Stalk
              <span className="text-emerald-600 block">Growing Together</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
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
                src="https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1QNss8kKHFdZmauiPw8GXAgBHM73sCJ1lES4Wf" 
                alt="Bean to Stalk Logo" 
                className="max-w-full h-auto w-64"
                onError={(e) => {
                  console.error('About page logo failed to load:', e.currentTarget.src);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;