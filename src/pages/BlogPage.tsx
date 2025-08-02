import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NewsletterSignup from '../components/NewsletterSignup';

const BlogPage = () => {
  const navigate = useNavigate();

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
            Back to Home
          </button>
        </div>
      </div>

      {/* Blog Header */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Reading Together: Family Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how the simple act of reading aloud can transform your child's learning experience and strengthen your family connection.
          </p>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Sample Blog Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <article>
              <header className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  The Magic of Reading Aloud: Building Bonds Through Stories
                </h2>
                <div className="flex items-center text-gray-500 text-sm">
                  <span>Published on January 15, 2025</span>
                  <span className="mx-2">•</span>
                  <span>5 min read</span>
                </div>
              </header>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Reading aloud to children is one of the most powerful tools parents have for building connections 
                  and fostering learning. It's a simple act that creates lasting memories while developing crucial 
                  language and literacy skills.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Reading Aloud Matters</h3>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  When you read aloud to your child, you're doing much more than just sharing a story. You're:
                </p>

                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li>Building vocabulary and language comprehension</li>
                  <li>Developing listening skills and attention span</li>
                  <li>Creating positive associations with books and learning</li>
                  <li>Strengthening emotional bonds through shared experiences</li>
                  <li>Introducing complex ideas and concepts in an accessible way</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Making Reading Time Special</h3>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  Transform your reading sessions into cherished family traditions with these simple strategies:
                </p>

                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-6">
                  <h4 className="font-bold text-emerald-800 mb-3">Pro Tip: Create a Reading Ritual</h4>
                  <p className="text-emerald-700">
                    Establish a consistent time and place for reading. Whether it's bedtime stories in a cozy corner 
                    or afternoon adventures on the couch, routine helps children anticipate and value reading time.
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  Remember, the goal isn't perfection—it's connection. Even five minutes of shared reading can 
                  make a significant impact on your child's development and your relationship with them.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;