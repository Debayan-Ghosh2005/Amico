import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, User, LogOut, Bell, Coins } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { logOut } from '../../lib/firebase/auth';
import toast from 'react-hot-toast';

const Header: React.FC = () => {
  const { user, userProfile, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
      signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-md border-b border-sage-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary-500 to-wellness-teal p-2 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-sage-800">
              MindNest
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className="text-sage-600 hover:text-primary-600 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/chat"
              className="text-sage-600 hover:text-primary-600 font-medium transition-colors"
            >
              AI Chat
            </Link>
            <Link
              to="/community"
              className="text-sage-600 hover:text-primary-600 font-medium transition-colors"
            >
              Community
            </Link>
            <Link
              to="/library"
              className="text-sage-600 hover:text-primary-600 font-medium transition-colors"
            >
              Library
            </Link>
            <Link
              to="/book-doctor"
              className="text-sage-600 hover:text-primary-600 font-medium transition-colors"
            >
              Book Doctor
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {userProfile && (
                  <div className="flex items-center space-x-2 bg-primary-50 px-3 py-1 rounded-full">
                    <Coins className="h-4 w-4 text-wellness-orange" />
                    <span className="text-sm font-medium text-sage-700">
                      {userProfile.coins}
                    </span>
                  </div>
                )}
                
                <button className="p-2 text-sage-600 hover:text-primary-600 transition-colors">
                  <Bell className="h-5 w-5" />
                </button>

                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-sage-50 transition-colors">
                    <User className="h-5 w-5 text-sage-600" />
                    <span className="text-sm font-medium text-sage-700">
                      {userProfile?.displayName || user.displayName}
                    </span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-sage-700 hover:bg-sage-50"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/rewards"
                      className="block px-4 py-2 text-sm text-sage-700 hover:bg-sage-50"
                    >
                      Rewards
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sage-600 hover:text-primary-600 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;