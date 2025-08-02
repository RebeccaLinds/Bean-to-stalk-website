import React, { useState } from 'react';
import { Star, Clock, Users, Award, CheckCircle, Gift, Zap, ArrowRight, Heart, BookOpen, PenTool, Sparkles, Timer } from 'lucide-react';
import PriceDisplay from '../components/PriceDisplay';

const YoungStorytellersOffer = () => {
  const [selectedCTA, setSelectedCTA] = useState(1);

  const ctaVariants = [
    {
      id: 1,
      text: "🚀 Start My Writing Adventure Today!",
      subtext: "Limited-time launch price ends soon"
    },
    {
      id: 2,
      text: "✨ Unlock My Child's Storytelling Magic",
      subtext: "Join 247+ young authors already creating amazing stories"
    },
    {
      id: 3,
      text: "📚 Enroll Now & Save $60!",
      subtext: "Full course access at launch week pricing"
    }
  ];

  const valueStackItems = [
    { item: "6 Interactive Story Missions (Video-Based)", value: "$49" },
    { item: "Printable Worksheets & Story Map", value: "$25" },
    { item: "Character Creation Toolkit", value: "$19" },
    { item: "World-Building Guide", value: "$19" },
    { item: "Dialogue Writing Masterclass", value: "$15" },
    { item: "Young Storyteller Certificate", value: "$12" },
    { item: "Private Facebook Community Access", value: "$10" },
    { item: "BONUS: Finish-the-Story Pack", value: "$15" },
    { item: "BONUS: Parent Guide & Tips", value: "$10" }
  ];

  const totalValue = valueStackItems.reduce((sum, item) => sum + parseInt(item.value.replace('$', '')), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Limited Time Badge */}
          <div className="inline-flex items-center bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-6 animate-pulse">
            <Timer className="h-4 w-4 mr-2" />
            LAUNCH WEEK SPECIAL - Limited Time Only!
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Turn Your Child Into a
            <span className="text-emerald-600 block">Confident Young Author</span>
          </h1>

          {/* Supporting Subheadline */}
          <p className="text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            <strong>Ages 8-12:</strong> The complete storytelling course that transforms "I don't know what to write" 
            into "I can't wait to share my story!"
          </p>

          {/* Core Transformation Promise */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border-l-4 border-emerald-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🎯 What Your Child Will Achieve:
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900">Complete Their First Story</h3>
                  <p className="text-gray-600 text-sm">From blank page to finished tale in 6 weeks</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900">Build Writing Confidence</h3>
                  <p className="text-gray-600 text-sm">No more "I don't know what to write"</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900">Master Story Structure</h3>
                  <p className="text-gray-600 text-sm">Learn the secrets professional authors use</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Full Course. Big Imagination. Small Price.
            </h2>
            <p className="text-xl text-gray-600">
              Everything your young writer needs to create their first amazing story
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-8 text-white text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full"></div>
              <div className="absolute top-1/2 right-20 w-12 h-12 bg-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              {/* Strike-through Price */}
              <div className="mb-4">
                <span className="text-2xl line-through opacity-75">Regular Price: $149</span>
              </div>

              {/* Special Price */}
              <div className="mb-6">
                <PriceDisplay 
                  usdPrice="89" 
                  className="text-6xl font-bold"
                  size="xl"
                />
                <span className="text-xl ml-2">one-time payment</span>
              </div>

              {/* Savings Highlight */}
              <div className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full inline-block font-bold text-lg mb-6">
                🎉 You Save <PriceDisplay usdPrice="60" className="inline" /> (40% OFF) - Launch Week Only!
              </div>

              {/* Payment Options */}
              <p className="text-emerald-100 mb-6">
                ✅ Instant access • ✅ 30-day money-back guarantee • ✅ Lifetime access
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parent-Focused Benefits */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              For Parents: Everything You Need to Know
            </h2>
            <p className="text-xl text-gray-600">
              Self-paced learning designed for busy families
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">✨ What Makes This Special:</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">100% Self-Paced</h4>
                    <p className="text-gray-600">Your child learns at their own speed, no pressure or deadlines</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">No Teaching Required</h4>
                    <p className="text-gray-600">Clear video instructions mean kids can learn independently</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Screen Time That Matters</h4>
                    <p className="text-gray-600">Educational content that actually develops real skills</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Builds Academic Confidence</h4>
                    <p className="text-gray-600">Writing skills transfer to all school subjects</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">📦 Complete Course Includes:</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-emerald-500">
                  <h4 className="font-bold text-gray-900">6 Video Missions</h4>
                  <p className="text-gray-600 text-sm">Short, engaging lessons (under 10 minutes each)</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-900">Printable Worksheets</h4>
                  <p className="text-gray-600 text-sm">Story maps, character sheets, and writing prompts</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-purple-500">
                  <h4 className="font-bold text-gray-900">Young Storyteller Certificate</h4>
                  <p className="text-gray-600 text-sm">Official recognition of completion</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-amber-500">
                  <h4 className="font-bold text-gray-900">Parent Guide</h4>
                  <p className="text-gray-600 text-sm">How to support and encourage your young writer</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-pink-500">
                  <h4 className="font-bold text-gray-900">Publishing Opportunity</h4>
                  <p className="text-gray-600 text-sm">Chance to win a Bean to Stalk publishing package!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kid-Focused Section */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              🧒 Hey Kids! Ready for an Amazing Adventure?
            </h2>
            <p className="text-2xl text-purple-100">
              Do you ever make up characters in your head? Maybe a brave cat? A silly robot? A flying banana? 
              <strong className="text-yellow-300"> You're already a storyteller!</strong>
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8">
            <h3 className="text-3xl font-bold text-center mb-8">
              🎯 Your 6 Epic Story Missions:
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/20 rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-3">🧙 Mission 1: The Magic of Ideas</h4>
                <p className="text-purple-100">
                  Let's find out what kind of stories you love and create your first one! 
                  We'll discover your story superpower.
                </p>
              </div>

              <div className="bg-white/20 rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-3">🧑‍🎨 Mission 2: Make Your Main Character</h4>
                <p className="text-purple-100">
                  Will they be a hero? A dragon? A talking donut? You decide! 
                  Learn the secret to making characters feel real.
                </p>
              </div>

              <div className="bg-white/20 rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-3">🌎 Mission 3: Build Their World</h4>
                <p className="text-purple-100">
                  Where does your story happen? A jungle? A spaceship? Under a couch? 
                  Create amazing places for your adventure!
                </p>
              </div>

              <div className="bg-white/20 rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-3">🌀 Mission 4: Oh No! Something Goes Wrong</h4>
                <p className="text-purple-100">
                  Every great story has a twist. What trouble shows up in yours? 
                  This is where the real fun begins!
                </p>
              </div>

              <div className="bg-white/20 rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-3">💬 Mission 5: Talking Time</h4>
                <p className="text-purple-100">
                  Make your characters talk, argue, or giggle! Learn how to write 
                  conversations that sound real and exciting.
                </p>
              </div>

              <div className="bg-white/20 rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-3">🏁 Mission 6: The Big Ending</h4>
                <p className="text-purple-100">
                  Wrap it all up with an amazing finish! Plus get your official 
                  Young Storyteller Certificate!
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-300 mb-4">
              🎉 Best Part: You might become a REAL published author with Bean to Stalk!
            </p>
            <p className="text-lg text-purple-100">
              The best stories from our course get a chance to be turned into actual books that other kids can read!
            </p>
          </div>
        </div>
      </section>

      {/* Value Stack */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🎁 Everything You Get Today
            </h2>
            <p className="text-xl text-gray-600">
              Complete storytelling toolkit worth $174 - yours for just $89
            </p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8">
            <div className="space-y-4 mb-8">
              {valueStackItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                  <span className="text-gray-900 font-medium">{item.item}</span>
                  <span className="text-emerald-600 font-bold">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-emerald-500 pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-gray-900">Total Package Value:</span>
                <span className="text-2xl font-bold text-gray-500 line-through">${totalValue}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-3xl font-bold text-emerald-600">Your Launch Week Price:</span>
                <span className="text-4xl font-bold text-emerald-600">$89</span>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-full inline-block font-bold text-xl">
                  💰 You Save $85 (49% OFF)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Child's Writing Adventure?
          </h2>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {ctaVariants.map((cta) => (
                <button
                  key={cta.id}
                  onClick={() => setSelectedCTA(cta.id)}
                  className={`p-6 rounded-2xl transition-all duration-300 ${
                    selectedCTA === cta.id
                      ? 'bg-white text-emerald-600 shadow-lg transform scale-105'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <div className="text-lg font-bold mb-2">{cta.text}</div>
                  <div className="text-sm opacity-75">{cta.subtext}</div>
                </button>
              ))}
            </div>

            <button className="bg-yellow-400 text-yellow-900 px-12 py-6 rounded-full text-2xl font-bold hover:bg-yellow-300 transition-colors shadow-lg transform hover:scale-105">
              {ctaVariants.find(cta => cta.id === selectedCTA)?.text}
              <ArrowRight className="inline-block ml-3 h-6 w-6" />
            </button>

            <div className="mt-6 text-emerald-100">
              <p className="text-lg font-semibold mb-2">🔒 100% Risk-Free</p>
              <p>30-day money-back guarantee • Instant access • Lifetime course access</p>
            </div>
          </div>

          <div className="bg-red-500 text-white px-6 py-3 rounded-full inline-block font-bold animate-pulse">
            ⏰ Launch Week Pricing Ends Soon - Don't Miss Out!
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Join 247+ Young Authors Already Creating Amazing Stories!
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-emerald-50 rounded-2xl p-6">
              <div className="flex justify-center text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "My daughter went from 'I hate writing' to asking for extra writing time! 
                She's so proud of her first story."
              </p>
              <div className="font-semibold text-gray-900">Sarah M., Parent</div>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-6">
              <div className="flex justify-center text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The missions are so fun! I made a story about a robot who loves pizza 
                and my whole family laughed when I read it to them!"
              </p>
              <div className="font-semibold text-gray-900">Emma, Age 9</div>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-6">
              <div className="flex justify-center text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Perfect for homeschooling! My son works through it independently 
                and his writing has improved dramatically."
              </p>
              <div className="font-semibold text-gray-900">Mike T., Homeschool Dad</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YoungStorytellersOffer;