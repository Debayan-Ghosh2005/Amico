import React from 'react';
import { motion } from 'framer-motion';
import {
  Smile,
  TrendingUp,
  Award,
  MessageCircle,
  Users,
  BookOpen,
  Calendar,
  Coins
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import ProgressTree from '../components/ui/ProgressTree';
import Badge from '../components/ui/Badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  const { userProfile } = useAuthStore();

  // Mock data for charts
  const moodData = [
    { day: 'Mon', mood: 3 },
    { day: 'Tue', mood: 4 },
    { day: 'Wed', mood: 3 },
    { day: 'Thu', mood: 5 },
    { day: 'Fri', mood: 4 },
    { day: 'Sat', mood: 5 },
    { day: 'Sun', mood: 4 }
  ];

  const quickActions = [
    {
      icon: MessageCircle,
      title: 'AI Chat',
      description: 'Continue your conversation',
      href: '/chat',
      color: 'from-wellness-blue to-wellness-purple'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with others',
      href: '/community',
      color: 'from-wellness-teal to-primary-500'
    },
    {
      icon: BookOpen,
      title: 'Resources',
      description: 'Explore self-help content',
      href: '/library',
      color: 'from-wellness-orange to-wellness-pink'
    },
    {
      icon: Calendar,
      title: 'Book Session',
      description: 'Schedule with therapist',
      href: '/book-doctor',
      color: 'from-primary-600 to-wellness-teal'
    }
  ];

  const recentBadges = [
    {
      icon: Award,
      name: 'First Steps',
      description: 'Completed your first chat session',
      earned: true,
      earnedDate: new Date('2024-01-15')
    },
    {
      icon: Users,
      name: 'Community Helper',
      description: 'Made your first community post',
      earned: true,
      earnedDate: new Date('2024-01-16')
    },
    {
      icon: MessageCircle,
      name: 'Regular Chatter',
      description: 'Complete 7 days of AI chat',
      earned: false
    }
  ];

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-sage-900 mb-2">
            Welcome back, {userProfile.displayName}! 🌟
          </h1>
          <p className="text-sage-600 text-lg">
            Here's how your wellness journey is progressing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100"
            >
              <h2 className="text-xl font-semibold text-sage-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <motion.a
                    key={index}
                    href={action.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      p-4 rounded-xl bg-gradient-to-r ${action.color} text-white
                      hover:shadow-lg transition-all duration-200 text-center
                    `}
                  >
                    <action.icon className="h-8 w-8 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">{action.title}</h3>
                    <p className="text-xs opacity-90">{action.description}</p>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Mood Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-sage-800">Mood Tracking</h2>
                <div className="flex items-center space-x-2">
                  <Smile className="h-5 w-5 text-wellness-orange" />
                  <span className="text-sm text-sage-600">This Week</span>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis domain={[1, 5]} stroke="#6b7280" />
                    <Tooltip 
                      formatter={(value) => [`${value}/5`, 'Mood']}
                      labelFormatter={(day) => `${day}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#22c55e" 
                      strokeWidth={3}
                      dot={{ fill: '#22c55e', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100"
            >
              <h2 className="text-xl font-semibold text-sage-800 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: 'Completed AI chat session', time: '2 hours ago', icon: MessageCircle },
                  { action: 'Posted in community', time: '1 day ago', icon: Users },
                  { action: 'Read "Managing Anxiety" chapter', time: '2 days ago', icon: BookOpen }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-sage-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <activity.icon className="h-4 w-4 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sage-800 font-medium">{activity.action}</p>
                      <p className="text-sage-500 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Progress Tree */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100"
            >
              <h2 className="text-xl font-semibold text-sage-800 mb-4 text-center">Your Growth</h2>
              <ProgressTree 
                level={3} 
                progress={65} 
                badges={userProfile.badges}
              />
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100"
            >
              <h2 className="text-xl font-semibold text-sage-800 mb-4">Your Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Coins className="h-5 w-5 text-wellness-orange" />
                    <span className="text-sage-700">MindCoins</span>
                  </div>
                  <span className="font-semibold text-sage-800">{userProfile.coins}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-wellness-purple" />
                    <span className="text-sage-700">Badges</span>
                  </div>
                  <span className="font-semibold text-sage-800">{userProfile.badges.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary-600" />
                    <span className="text-sage-700">Streak</span>
                  </div>
                  <span className="font-semibold text-sage-800">7 days</span>
                </div>
              </div>
            </motion.div>

            {/* Recent Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100"
            >
              <h2 className="text-xl font-semibold text-sage-800 mb-4">Badges</h2>
              <div className="grid grid-cols-2 gap-3">
                {recentBadges.map((badge, index) => (
                  <Badge
                    key={index}
                    icon={badge.icon}
                    name={badge.name}
                    description={badge.description}
                    earned={badge.earned}
                    earnedDate={badge.earnedDate}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;