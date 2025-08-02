import React from 'react';
import { ArrowLeft, Shield, Users, Lock, Eye, Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
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

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="bg-emerald-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Shield className="h-10 w-10 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bean to Stalk Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Last Updated: July 21st, 2025
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="prose prose-lg max-w-none">
              
              {/* We Keep It Simple */}
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-8 rounded-r-lg">
                <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center">
                  <Eye className="h-6 w-6 mr-3" />
                  We Keep It Simple
                </h2>
                <p className="text-emerald-700 leading-relaxed">
                  Just like our privacy policy, we've written these terms in plain English. These terms explain the rules for using Bean to Stalk's products and services. By purchasing from us or using our services, you agree to follow these terms.
                </p>
              </div>

              {/* About Bean to Stalk */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="h-6 w-6 mr-3 text-emerald-600" />
                  About Bean to Stalk
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Bean to Stalk is a children's education business registered in Ontario, Canada. We create and sell educational books, materials, digital content, and online courses designed to support children's learning and development.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Our Contact Information:</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700">Business Name:</span>
                      <span className="ml-2 text-gray-600">Bean to Stalk</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-emerald-600 mr-2" />
                      <span className="font-medium text-gray-700">Email:</span>
                      <a href="mailto:contact@beantostalkclub.com" className="ml-2 text-emerald-600 hover:text-emerald-700">
                        contact@beantostalkclub.com
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* What We Offer */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Physical Products</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Printed books and educational materials</li>
                      <li>Printable digital packages (sent as PDF files)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Digital Products</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Recorded educational courses and lessons</li>
                      <li>Digital learning materials</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Who Can Use Our Services */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Who Can Use Our Services</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Age Requirements</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li><strong>Ages 13 and up:</strong> Can use our services independently</li>
                      <li><strong>Under 13:</strong> Advised to have a parent or guardian guide their learning</li>
                      <li><strong>Parents and Guardians:</strong> Responsible for supervising children's use of our services</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Account Responsibility</h3>
                    <p className="text-gray-700 mb-3">If you're a parent or guardian you are responsible for:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>All purchases made on the account</li>
                      <li>Ensuring your child follows these terms</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Purchasing and Payment */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Purchasing and Payment</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">How We Process Payments</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>All payments are processed securely through Stripe</li>
                      <li>We accept all payment methods supported by Stripe (credit cards, debit cards, digital wallets)</li>
                      <li>Payment plans may be available for select products through Stripe's payment options</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Pricing</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>All prices are displayed in your local currency when possible</li>
                      <li>Prices may change at any time, but changes won't affect orders already placed</li>
                      <li>Applicable taxes will be added at checkout</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Order Confirmation</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>You'll receive an email confirmation after each successful purchase</li>
                      <li>Digital products will be delivered via email</li>
                      <li>Physical products will be shipped to your provided address</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Shipping and Delivery */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping and Delivery</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Physical Products</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>We ship throughout Canada and internationally (shipping costs apply)</li>
                      <li>Delivery times vary by location and shipping method chosen</li>
                      <li>You are responsible for providing accurate shipping information</li>
                      <li>We are not responsible for packages lost due to incorrect addresses</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Digital Products</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Delivered immediately after payment confirmation</li>
                      <li>Check your email and spam folder for delivery</li>
                      <li>Contact us if you don't receive your digital products within 24 hours</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Returns and Refunds */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Returns and Refunds</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Digital Products</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>No refunds once you've accessed or downloaded digital content</li>
                      <li>This includes recorded courses, digital materials, and printable packages</li>
                      <li><strong>Exception:</strong> Technical issues that prevent access (we'll work to resolve these)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Physical Products</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Returns accepted if items are unopened and in original condition</li>
                      <li>You pay return shipping costs</li>
                      <li>Contact us within 30 days of delivery to arrange a return</li>
                      <li>Refunds processed within 10 business days of receiving returned items</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Defective or Damaged Items</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>We will replace items extensively damaged during shipping at no cost to you</li>
                      <li>Report damage within 7 days of delivery with photo proof of damage and a written letter describing the extent of damage you can identify</li>
                      <li>Our printing and distribution partners handle replacements for manufacturing defects</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mt-6">
                  <h3 className="text-xl font-bold text-emerald-800 mb-3">Our Commitment to You</h3>
                  <p className="text-emerald-700">
                    While our policy is clear, we genuinely care about your experience. If you have a serious issue with a product, contact us directly. We'll work with you to find a fair solution.
                  </p>
                </div>
              </section>

              {/* Digital Content and Course Access */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Digital Content and Course Access</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">What You Get</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Lifetime access to purchased digital content and courses</li>
                      <li>Right to download and save materials for personal use</li>
                      <li>If you would like access to updates and improvements to purchased content within 1 year of purchase date, please contact us at contact@beantostalkclub.com</li>
                      <li>If you are an educator who would like to use content and courses in a classroom setting, please contact us via email. We would love to work with you on teacher pricing.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">What You Cannot Do</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Share login credentials with others</li>
                      <li>Distribute, sell, or share our content without permission</li>
                      <li>Use our content for commercial purposes without written consent</li>
                      <li>Copy or reproduce our materials for public use</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Intellectual Property */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Intellectual Property</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Our Content</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>All Bean to Stalk content is protected by copyright</li>
                      <li>You may use purchased materials for personal educational purposes</li>
                      <li>You cannot reproduce, distribute, or sell our content without permission</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Your Content</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>If you share content in our community, you keep ownership</li>
                      <li>You give us permission to use your shared content for educational purposes</li>
                      <li>We may remove content that violates our guidelines</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Educational Disclaimers */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Educational Disclaimers</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Learning Outcomes</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Our materials are designed to support learning, but we cannot guarantee specific educational results</li>
                      <li>Every child learns differently and at their own pace</li>
                      <li>Results depend on many factors including individual effort, learning style, and consistent use</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Not a Replacement for Professional Services</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Our content supplements but does not replace professional educational services</li>
                      <li>If your child has specific learning needs, consult with educational professionals</li>
                      <li>We are not licensed educators, therapists, or medical professionals</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Limitation of Liability</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">What We're Responsible For</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Providing the products and services you purchase</li>
                      <li>Maintaining reasonable security for your information</li>
                      <li>Replacing defective products as described in our return policy</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">What We're Not Responsible For</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Educational outcomes or learning results</li>
                      <li>Technical issues with your devices or internet connection</li>
                      <li>Indirect damages or losses</li>
                      <li>Issues caused by misuse of our products</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Maximum Liability</h3>
                    <p className="text-gray-700">
                      Our total liability for any claim will not exceed the amount you paid for the specific product or service in question.
                    </p>
                  </div>
                </div>
              </section>

              {/* Privacy and Data Protection */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Lock className="h-6 w-6 mr-3 text-emerald-600" />
                  Privacy and Data Protection
                </h2>
                <p className="text-gray-700">
                  This Terms of Service works together with our Privacy Policy. Please read both documents to understand how we collect, use, and protect your information.
                </p>
              </section>

              {/* Changes to These Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to These Terms</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">How We Update Terms</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>We may update these terms from time to time</li>
                      <li>Updates will be posted on our website with a new "Last Updated" date</li>
                      <li>Significant changes will be communicated via email</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Your Options</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Continued use of our services means you accept the updated terms</li>
                      <li>If you don't agree with changes, you can stop using our services</li>
                      <li>Existing purchases and access remain valid under the terms in effect when you made the purchase</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Governing Law */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
                <p className="text-gray-700">
                  These terms are governed by the laws of Ontario, Canada. Any disputes will be resolved in Ontario courts.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-emerald-800 mb-4">Contact Information</h2>
                  <p className="text-emerald-700 mb-4">
                    Questions about these terms?
                  </p>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-emerald-600 mr-2" />
                    <span className="font-medium text-emerald-700">Email:</span>
                    <a href="mailto:contact@beantostalkclub.com" className="ml-2 text-emerald-600 hover:text-emerald-700">
                      contact@beantostalkclub.com
                    </a>
                  </div>
                </div>
              </section>

              {/* Summary of Key Points */}
              <section className="mb-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-blue-800 mb-6">Summary of Key Points</h2>
                  <p className="text-blue-700 mb-4">
                    To make this easier to understand, here are the most important points:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start text-blue-700">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      Parents manage learning for children under 13
                    </li>
                    <li className="flex items-start text-blue-700">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      Digital products cannot be refunded once accessed
                    </li>
                    <li className="flex items-start text-blue-700">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      Physical products can be returned in original condition (you pay shipping)
                    </li>
                    <li className="flex items-start text-blue-700">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      We support learning but don't guarantee specific results
                    </li>
                    <li className="flex items-start text-blue-700">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      Your privacy is protected according to our Privacy Policy
                    </li>
                    <li className="flex items-start text-blue-700">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      We're here to help if you have problems with your order
                    </li>
                  </ul>
                  <p className="text-blue-700 mt-4">
                    These terms are designed to be fair to both Bean to Stalk and our customers while keeping children's education and safety as our top priority.
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;