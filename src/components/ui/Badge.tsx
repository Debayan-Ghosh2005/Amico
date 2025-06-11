import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface BadgeProps {
  icon: LucideIcon;
  name: string;
  description: string;
  earned: boolean;
  earnedDate?: Date;
  onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({
  icon: Icon,
  name,
  description,
  earned,
  earnedDate,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative p-4 rounded-xl border-2 cursor-pointer transition-all
        ${earned 
          ? 'bg-gradient-to-br from-primary-500 to-wellness-teal border-primary-400 text-white shadow-lg' 
          : 'bg-sage-50 border-sage-200 text-sage-400'
        }
      `}
      onClick={onClick}
    >
      <div className="text-center">
        <div className={`
          mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2
          ${earned ? 'bg-white/20' : 'bg-sage-200'}
        `}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-semibold text-sm mb-1">{name}</h3>
        <p className={`text-xs ${earned ? 'text-white/80' : 'text-sage-500'}`}>
          {description}
        </p>
        {earned && earnedDate && (
          <p className="text-xs text-white/60 mt-2">
            Earned {earnedDate.toLocaleDateString()}
          </p>
        )}
      </div>
      
      {earned && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-wellness-orange rounded-full flex items-center justify-center"
        >
          <span className="text-white text-xs font-bold">✓</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Badge;