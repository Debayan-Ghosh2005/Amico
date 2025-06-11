import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  Users,
  BookOpen,
  Calendar,
  Sparkles,
  ArrowRight,
  Heart,
  Shield,
  Zap
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI Mental Health Support',
      description: 'Chat with our empathetic AI companion trained in mental health support.',
      color: 'from-wellness-blue to-wellness-purple'
    },
    {
      icon: Users,
      title: 'Supportive Community',
      description: 'Connect with others on similar journeys in a safe, moderated space.',
      color: 'from-wellness-teal to-primary-500'
    },
    {
      icon: BookOpen,
      title: 'Self-Help Library',
      description: 'Access evidence-based resources, guides, and therapeutic exercises.',
      color: 'from-wellness-orange to-wellness-pink'
    },
    {
      icon: Calendar,
      title: 'Book with Therapists',
      description: 'Schedule sessions with licensed mental health professionals.',
      color: 'from-primary-600 to-wellness-teal'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Lives Supported' },
    { number: '95%', label: 'Positive Feedback' },
    { number: '24/7', label: 'AI Support Available' },
    { number: '500+', label: 'Licensed Therapists' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-wellness-teal/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4 text-primary-600" />
                <span className="text-primary-700 font-medium">Your Mental Wellness Journey Starts Here</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-display font-bold text-sage-900 mb-6">
                Find Peace in Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-wellness-teal">
                  {' '}MindNest
                </span>
              </h1>
              
              <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
                A comprehensive mental health platform combining AI support, community connection,
                and professional therapy - all in one safe, nurturing space designed for your wellbeing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link
                to="/signup"
                className="bg-gradient-to-r from-primary-600 to-wellness-teal text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/chat"
                className="bg-white text-sage-700 px-8 py-4 rounded-xl font-semibold border-2 border-sage-200 hover:border-primary-300 hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Try AI Chat</span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
                  <div className="text-sage-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sage-900 mb-4">
              Everything You Need for Mental Wellness
            </h2>
            <p className="text-xl text-sage-600 max-w-2xl mx-auto">
              Comprehensive tools and support systems designed to help you thrive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-sage-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sage-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-r from-sage-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sage-900 mb-4">
              Built with Care, Security & Privacy
            </h2>
            <p className="text-xl text-sage-600 max-w-2xl mx-auto">
              Your mental health journey deserves the highest standards of protection and care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Privacy First',
                description: 'End-to-end encryption and HIPAA compliance ensure your conversations stay private.'
              },
              {
                icon: Heart,
                title: 'Evidence-Based Care',
                description: 'All our resources and AI responses are based on proven therapeutic methods.'
              },
              {
                icon: Zap,
                title: 'Always Available',
                description: '24/7 AI support means help is always there when you need it most.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-wellness-teal flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sage-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-wellness-teal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Begin Your Wellness Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands who have found support, community, and healing through MindNest.
              Your journey to better mental health starts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="bg-white/10 text-white px-8 py-4 rounded-xl font-semibold border-2 border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;