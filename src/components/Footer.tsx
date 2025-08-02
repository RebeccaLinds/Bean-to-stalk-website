import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

// TikTok icon component since it's not in lucide-react
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#edfdf4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img 
              src="https://mftpb9mdar.ufs.sh/f/HwomHDbOIx1Q22ZDG94KuyGpwxk16Y9eoV0QXRs5cPHaMnLZ" 
              alt="Bean to Stalk" 
              className="h-12 w-auto mb-6"
            />
            <p className="text-[#069669] mb-6 leading-relaxed">
              Nurturing young minds through beautiful books and educational resources 
              that inspire curiosity and creativity.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/beantostalk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#069669] hover:text-emerald-700 cursor-pointer transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://instagram.com/beantostalk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#069669] hover:text-emerald-700 cursor-pointer transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com/beantostalk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#069669] hover:text-emerald-700 cursor-pointer transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="https://tiktok.com/@beantostalk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#069669] hover:text-emerald-700 cursor-pointer transition-colors"
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#069669]">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/books" className="text-[#069669] hover:text-emerald-700 transition-colors">All Books</Link></li>
              <li><Link to="/activities" className="text-[#069669] hover:text-emerald-700 transition-colors">Educational Resources</Link></li>
              <li><Link to={{ pathname: '/activities', search: '?type=activity-pack' }} className="text-[#069669] hover:text-emerald-700 transition-colors">Activity Packs</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#069669]">Categories</h3>
            <ul className="space-y-3">
              <li><Link to="/category/story-books" className="text-[#069669] hover:text-emerald-700 transition-colors">Story Books</Link></li>
              <li><Link to="/category/coloring-books" className="text-[#069669] hover:text-emerald-700 transition-colors">Coloring Books</Link></li>
              <li><Link to="/category/young-explorers-guides" className="text-[#069669] hover:text-emerald-700 transition-colors">Adventure Guides</Link></li>
              <li><Link to="/kids-classes" className="text-[#069669] hover:text-emerald-700 transition-colors">Kids Classes</Link></li>
              <li><Link to="/category/activity-books" className="text-[#069669] hover:text-emerald-700 transition-colors">Activity Books</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#069669]">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-[#069669] mr-3" />
                <a 
                  href="mailto:contact@beantostalkclub.com"
                  className="text-[#069669] hover:text-emerald-700 transition-colors"
                >
                  contact@beantostalkclub.com
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-[#069669] mr-3 mt-1" />
                <span className="text-[#069669]">Growing minds everywhere</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#069669] text-sm">
              © 2025 Bean to Stalk. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-[#069669] hover:text-emerald-700 text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-[#069669] hover:text-emerald-700 text-sm transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;