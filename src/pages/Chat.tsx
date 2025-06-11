import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, addMessage, setLoading } = useChatStore();
  const { user } = useAuthStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    
    // Add user message
    addMessage({
      role: 'user',
      content: userMessage
    });

    setLoading(true);

    try {
      // Simulate AI response (replace with actual OpenAI API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse = generateAIResponse(userMessage);
      
      addMessage({
        role: 'assistant',
        content: aiResponse
      });
    } catch (error) {
      toast.error('Failed to get AI response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    // This is a simple mock response generator.
    // In production, this would be replaced with OpenAI API calls
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
      return "I understand you're feeling anxious. That's a completely valid feeling. When anxiety strikes, try the 5-4-3-2-1 grounding technique: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This can help bring you back to the present moment. Would you like to talk about what's making you feel anxious?";
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed')) {
      return "I hear that you're going through a difficult time. Sadness is a natural human emotion, and it's okay to feel this way. Remember that these feelings are temporary, even though they might feel overwhelming right now. Small steps can make a difference - perhaps try going for a short walk, calling a friend, or doing something creative. What usually helps you feel a little better?";
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
      return "Sleep difficulties can be really challenging. Good sleep hygiene can help: try to maintain a consistent sleep schedule, avoid screens an hour before bed, keep your bedroom cool and dark, and consider relaxation techniques like deep breathing or progressive muscle relaxation. What's your current bedtime routine like?";
    }
    
    if (lowerMessage.includes('stressed') || lowerMessage.includes('stress')) {
      return "Stress can feel overwhelming, but there are effective ways to manage it. Try breaking down what's stressing you into smaller, manageable parts. Deep breathing exercises, even just for a few minutes, can help activate your body's relaxation response. Physical activity, even a short walk, can also help reduce stress hormones. What's the main source of your stress right now?";
    }
    
    // Default supportive response
    return "Thank you for sharing that with me. I'm here to listen and support you through whatever you're experiencing. Everyone's journey is unique, and it takes courage to reach out. Would you like to tell me more about how you're feeling today, or is there something specific you'd like support with?";
  };

  const suggestedPrompts = [
    "I've been feeling anxious lately",
    "How can I improve my sleep?",
    "I'm feeling overwhelmed with work",
    "What are some breathing exercises?",
    "How do I practice self-care?"
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-sage-100 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-wellness-teal p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">MindNest AI Companion</h1>
                <p className="text-white/80">Your empathetic mental health support</p>
              </div>
              <div className="ml-auto">
                <div className="flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-sage-800 mb-2">
                  Welcome to your safe space
                </h3>
                <p className="text-sage-600 mb-6 max-w-md mx-auto">
                  I'm here to listen, support, and help you navigate your mental health journey.
                  Feel free to share anything that's on your mind.
                </p>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-sage-700">Try asking about:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {suggestedPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => setMessage(prompt)}
                        className="text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-full hover:bg-primary-100 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                      ${msg.role === 'user' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gradient-to-r from-wellness-teal to-primary-500 text-white'
                      }
                    `}>
                      {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={`
                      p-4 rounded-2xl
                      ${msg.role === 'user'
                        ? 'bg-primary-600 text-white rounded-br-md'
                        : 'bg-sage-50 text-sage-800 rounded-bl-md'
                      }
                    `}>
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                      <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-white/70' : 'text-sage-500'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex space-x-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-wellness-teal to-primary-500 text-white flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-sage-50 p-4 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-sage-100 p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share what's on your mind..."
                className="flex-1 px-4 py-3 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={isLoading}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!message.trim() || isLoading}
                className="bg-gradient-to-r from-primary-600 to-wellness-teal text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Chat;