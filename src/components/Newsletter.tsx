import React, { useState } from 'react';
import { Mail, Gift } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-green-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <Gift className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">
            Join Our Growing Community
          </h2>
          
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Get exclusive access to new releases, educational tips, and special offers. 
            Plus, receive a free activity pack when you sign up!
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-full border-0 focus:ring-4 focus:ring-white/30 text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-emerald-50 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </form>

          <p className="text-emerald-100 text-sm mt-4">
            No spam, just educational goodness. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;