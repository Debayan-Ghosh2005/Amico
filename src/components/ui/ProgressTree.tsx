import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Star, TreePine } from 'lucide-react';

interface ProgressTreeProps {
  level: number;
  progress: number; // 0-100
  badges: string[];
}

const ProgressTree: React.FC<ProgressTreeProps> = ({ level, progress, badges }) => {
  const treeHeight = Math.min(200 + (level * 20), 400);
  const leafCount = Math.floor(progress / 10);

  return (
    <div className="flex flex-col items-center p-6">
      <div className="relative" style={{ height: treeHeight }}>
        {/* Tree trunk */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: treeHeight * 0.3 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-8 bg-gradient-to-t from-amber-700 to-amber-600 rounded-t-lg mx-auto"
          style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
        />

        {/* Tree canopy */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2"
        >
          <TreePine className="h-24 w-24 text-primary-600" />
        </motion.div>

        {/* Leaves representing progress */}
        {Array.from({ length: leafCount }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: Math.random() * 360 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="absolute"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
            }}
          >
            <Leaf className="h-4 w-4 text-primary-400" />
          </motion.div>
        ))}

        {/* Stars for badges */}
        {badges.slice(0, 5).map((badge, index) => (
          <motion.div
            key={badge}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 + index * 0.2 }}
            className="absolute"
            style={{
              top: `${10 + index * 15}%`,
              right: `-${10 + index * 5}px`,
            }}
          >
            <Star className="h-5 w-5 text-wellness-orange fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-sage-800">Level {level}</h3>
        <div className="w-full bg-sage-200 rounded-full h-2 mt-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, delay: 1 }}
            className="bg-gradient-to-r from-primary-500 to-wellness-teal h-2 rounded-full"
          />
        </div>
        <p className="text-sm text-sage-600 mt-1">{progress}% to next level</p>
      </div>
    </div>
  );
};

export default ProgressTree;