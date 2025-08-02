import React from 'react';
import { ArrowLeft, Shield, Users, Lock, Eye, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
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
              Bean to Stalk Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last Updated: July 6th, 2025
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="prose prose-lg max-w-none">
              
              {/* We Write This Policy in Plain English */}
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-8 rounded-r-lg">
                <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center">
                  <Eye className="h-6 w-6 mr-3" />
                  We Write This Policy in Plain English
                </h2>
                <p className="text-emerald-700 leading-relaxed">
                  At Bean to Stalk, we believe privacy policies should be easy to understand. That's why we've written this policy in clear, simple language instead of confusing legal jargon. If you have any questions after reading this, please don't hesitate to contact us.
                </p>
              </div>

              {/* Who We Are */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="h-6 w-6 mr-3 text-emerald-600" />
                  Who We Are
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Bean to Stalk is a children's publishing and education brand. We create books, educational materials, and online content specifically designed for children and families.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Our Contact Information:</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700">Company:</span>
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

              {/* Children's Privacy */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-emerald-600" />
                  Children's Privacy Is Our Top Priority
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We take children's privacy very seriously. This policy explains how we protect children under 13 years old, in accordance with the Children's Online Privacy Protection Act (COPPA).
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 font-medium">
                    <strong>Important Note for Parents:</strong> If your child is under 13, we need your permission before we can collect any personal information from them. We will always ask for your consent first.
                  </p>
                </div>
              </section>

              {/* What Information We Collect */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What Information We Collect</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Information We Collect from Children Under 13</h3>
                    <p className="text-gray-700 mb-3">We only collect information from children under 13 with parental consent. This may include:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>First name (for personalization)</li>
                      <li>Email address (for account creation and communication)</li>
                      <li>Age or grade level (to provide age-appropriate content)</li>
                      <li>Reading preferences and progress (to improve our educational materials)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Information We Collect from Parents and Adults</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Name and contact information</li>
                      <li>Payment information (processed securely by our payment provider)</li>
                      <li>Communication preferences</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Information Collected Automatically</h3>
                    <p className="text-gray-700 mb-3">When you visit our website or use our services, we may automatically collect:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Device information (type of device, operating system)</li>
                      <li>Usage information (pages visited, time spent)</li>
                      <li>Location information (general location, not precise)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use This Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use This Information</h2>
                <p className="text-gray-700 mb-3">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Provide our educational content and services</li>
                  <li>Personalize the learning experience for each child</li>
                  <li>Communicate with parents about their child's progress</li>
                  <li>Improve our products and services</li>
                  <li>Send important updates about our services (with your permission)</li>
                  <li>Ensure the safety and security of our platform</li>
                </ul>
              </section>

              {/* How We Protect Your Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Lock className="h-6 w-6 mr-3 text-emerald-600" />
                  How We Protect Your Information
                </h2>
                <p className="text-gray-700 mb-3">We use industry-standard security measures to protect all personal information, including:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Secure servers and encryption</li>
                  <li>Limited access to personal information (only authorized staff)</li>
                  <li>Regular security updates and monitoring</li>
                  <li>Secure payment processing through trusted third-party providers</li>
                </ul>
              </section>

              {/* Sharing Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sharing Information</h2>
                <p className="text-gray-700 mb-4">
                  We do not sell, rent, or trade personal information about children or adults. We may share information only in these limited circumstances:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">With Your Permission</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>When you specifically ask us to share information</li>
                      <li>With educational partners (only with explicit parental consent)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">For Legal Reasons</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>To comply with laws or legal requests</li>
                      <li>To protect the safety of our users</li>
                      <li>To protect our rights and property</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">With Service Providers</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>With trusted companies that help us provide our services (like payment processors)</li>
                      <li>These companies are required to protect your information and can only use it for the specific services they provide to us</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Parental Rights */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Parental Rights and Controls</h2>
                <p className="text-gray-700 mb-3">Parents have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Review any personal information we have collected about their child</li>
                  <li>Delete their child's personal information from our records</li>
                  <li>Stop any further collection of their child's information</li>
                  <li>Update or correct their child's information</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  To exercise these rights, contact us at <a href="mailto:contact@beantostalkclub.com" className="text-emerald-600 hover:text-emerald-700">contact@beantostalkclub.com</a>.
                </p>
              </section>

              {/* Additional Sections */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
                <p className="text-gray-700">
                  We keep personal information only as long as necessary to provide our services or as required by law. When we no longer need the information, we securely delete it.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">International Users</h2>
                <p className="text-gray-700">
                  Our services are primarily intended for users in the United States. If you are located outside the United States, please be aware that your information may be transferred to and processed in the United States.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
                <p className="text-gray-700 mb-3">We may update this privacy policy from time to time. When we do:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>We will post the updated policy on our website</li>
                  <li>We will update the "Last Updated" date at the top</li>
                  <li>If changes significantly affect how we handle children's information, we will notify parents directly</li>
                </ul>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-emerald-800 mb-4">Contact Us</h2>
                  <p className="text-emerald-700 mb-4">
                    If you have any questions about this privacy policy or our privacy practices, please contact us:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-emerald-600 mr-2" />
                      <span className="font-medium text-emerald-700">Email:</span>
                      <a href="mailto:contact@beantostalkclub.com" className="ml-2 text-emerald-600 hover:text-emerald-700">
                        contact@beantostalkclub.com
                      </a>
                    </div>
                  </div>
                  <p className="text-emerald-700 mt-4 text-sm">
                    For urgent privacy concerns or to exercise your parental rights, please email us directly.
                  </p>
                </div>
              </section>

              {/* Additional Information for Parents */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information for Parents</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">How to Give Consent</h3>
                    <p className="text-gray-700 mb-3">Before we collect any personal information from your child, we will:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Send you a clear explanation of what information we want to collect</li>
                      <li>Explain how we will use that information</li>
                      <li>Ask for your consent through a secure verification process</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">How to Withdraw Consent</h3>
                    <p className="text-gray-700 mb-3">You can withdraw your consent at any time by:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Emailing us at <a href="mailto:contact@beantostalkclub.com" className="text-emerald-600 hover:text-emerald-700">contact@beantostalkclub.com</a></li>
                      <li>Writing to us at our business address</li>
                    </ul>
                    <p className="text-gray-700 mt-3">
                      When you withdraw consent, we will stop collecting information from your child and delete any information we have already collected.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Educational Benefits</h3>
                    <p className="text-gray-700 mb-3">Our collection of limited personal information helps us:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Provide age-appropriate content</li>
                      <li>Track learning progress</li>
                      <li>Personalize the educational experience</li>
                      <li>Ensure a safe online environment for children</li>
                    </ul>
                    <p className="text-gray-700 mt-3">
                      We are committed to collecting only the minimum information necessary to provide these educational benefits.
                    </p>
                  </div>
                </div>
              </section>

              {/* Compliance Statement */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <p className="text-gray-700 font-medium">
                  This privacy policy complies with the Children's Online Privacy Protection Act (COPPA) and other applicable privacy laws. We are committed to protecting the privacy of children and families who use our services.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;