import React from 'react';
import { Heart, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-sage-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-primary-500 to-wellness-teal p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold">MindNest</span>
            </div>
            <p className="text-sage-300 mb-4 max-w-md">
              Your sanctuary for mental wellness. Connect with AI support, community,
              and professional therapists in a safe, nurturing environment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-sage-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-sage-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-sage-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sage-300">
              <li><a href="#" className="hover:text-white transition-colors">Self-Help Library</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Crisis Resources</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mental Health Tips</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Meditation Guides</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sage-300">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sage-700 mt-8 pt-8 text-center text-sage-400">
          <p>&copy; 2024 MindNest. All rights reserved. Made with ❤️ for mental wellness.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;